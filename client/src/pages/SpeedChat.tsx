import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { CircumstancesBadge } from "@/components/CircumstancesBadge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Clock, Heart, Send, SkipForward, Zap, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

const SESSION_DURATION = 5 * 60; // 5 minutes in seconds

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SpeedChat() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();

  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [connectChoice, setConnectChoice] = useState<"connect" | "skip" | null>(null);
  const [sessionDetails, setSessionDetails] = useState<{ partnerCircumstances: string | null } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Poll for queue/session status every 3 seconds
  const { data: statusData, refetch: refetchStatus } = trpc.speedChat.getStatus.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
    refetchInterval: 3000,
  });

  const session = statusData?.activeSession;

  // When we get a session, fetch its details (including partner circumstances)
  const { data: sessionInfo } = trpc.speedChat.getSession.useQuery(
    { sessionId: session?.id ?? 0 },
    {
      enabled: !!session?.id,
      retry: false,
    }
  );

  // Fetch messages for active session
  const { data: messagesData } = trpc.speedChat.getMessages.useQuery(
    { sessionId: session?.id ?? 0 },
    {
      enabled: !!session?.id && !sessionEnded,
      refetchInterval: 2000,
      retry: false,
    }
  );

  const joinQueue = trpc.speedChat.join.useMutation({
    onSuccess: () => refetchStatus(),
    onError: (err) => toast.error(err.message ?? "Failed to join queue"),
  });

  const leaveQueue = trpc.speedChat.leave.useMutation({
    onSuccess: () => refetchStatus(),
  });

  const sendMsg = trpc.speedChat.sendMessage.useMutation({
    onSuccess: () => {
      if (session?.id) utils.speedChat.getMessages.invalidate({ sessionId: session.id });
      setMessage("");
    },
    onError: (err) => toast.error(err.message ?? "Failed to send"),
  });

  const endSession = trpc.speedChat.endSession.useMutation({
    onSuccess: () => {
      setSessionEnded(true);
      if (timerRef.current) clearInterval(timerRef.current);
      refetchStatus();
    },
  });

  const requestConnect = trpc.speedChat.requestConnect.useMutation({
    onSuccess: (result) => {
      if (result.bothConnected) {
        toast.success("It's a match! 💕 You can now message each other.");
        setTimeout(() => navigate("/matches"), 2000);
      } else {
        toast.info("Your connect request was sent. Waiting for their response...");
      }
    },
  });

  const messages = Array.isArray(messagesData) ? messagesData : [];

  // Timer countdown
  useEffect(() => {
    if (!session || sessionEnded) return;
    const sessionStart = new Date(session.startedAt).getTime();
    const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
    const remaining = Math.max(0, SESSION_DURATION - elapsed);
    setTimeLeft(remaining);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setSessionEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [session?.id, sessionEnded]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isAuthenticated && !loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-cream flex items-center justify-center px-4">
          <div className="text-center">
            <Zap className="w-12 h-12 text-rose-300 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Sign in to use Speed Chat</h2>
            <p className="text-gray-500 text-sm mb-6">
              Meet potential misyar partners in anonymous 5-minute sessions.
            </p>
            <Button asChild className="gradient-rose text-white border-0 mt-4">
              <a href={getLoginUrl()}>Sign In</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !session) return;
    sendMsg.mutate({ sessionId: session.id, content: message.trim() });
  };

  const handleEndEarly = () => {
    if (!session) return;
    const elapsed = SESSION_DURATION - timeLeft;
    endSession.mutate({ sessionId: session.id, durationSeconds: elapsed });
  };

  const handleConnect = () => {
    if (!session) return;
    setConnectChoice("connect");
    requestConnect.mutate({ sessionId: session.id });
  };

  const handleSkip = () => {
    if (!session) return;
    setConnectChoice("skip");
    endSession.mutate({ sessionId: session.id, durationSeconds: SESSION_DURATION });
    setTimeout(() => {
      setSessionEnded(false);
      setConnectChoice(null);
      refetchStatus();
    }, 1500);
  };

  const partnerCircumstances = sessionInfo?.partnerCircumstances ?? null;

  return (
    <Layout>
      <SEOHead
        title="Speed Chat — MisyarMatch"
        description="Anonymous 5-minute Speed Chat sessions on MisyarMatch. Meet potential misyar partners honestly, with circumstances shown before the first word."
        keywords="misyar speed chat, anonymous Muslim chat, halal speed dating"
        canonical="/speed-chat"
      />

      <div className="min-h-screen bg-cream">
        {/* Hero */}
        <div className="gradient-hero text-white py-8">
          <div className="container max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6" />
              <h1 className="font-serif text-3xl font-bold">Speed Chat</h1>
            </div>
            <p className="text-rose-200 text-sm">
              Anonymous 5-minute sessions. Circumstances shown before the first word. Connect or skip at the end.
            </p>
          </div>
        </div>

        <div className="container max-w-2xl mx-auto py-6 px-4">

          {/* ── LOBBY ── */}
          {!session && !statusData?.inQueue && (
            <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-8 text-center">
              <div className="w-16 h-16 gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Ready to chat?</h2>
              <p className="text-gray-500 mb-6 text-sm max-w-sm mx-auto">
                You'll be matched with a random opposite-gender member. Their circumstances badge is shown before you start. 5 minutes. Text only. No photos.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8 text-center">
                {[
                  { icon: Clock, label: "5 minutes", sub: "per session" },
                  { icon: AlertCircle, label: "Anonymous", sub: "no names shown" },
                  { icon: Heart, label: "Connect", sub: "if both agree" },
                ].map((item) => (
                  <div key={item.label} className="bg-rose-50 rounded-xl p-3 border border-rose-100">
                    <item.icon className="w-5 h-5 text-rose-600 mx-auto mb-1" />
                    <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                    <div className="text-gray-500 text-xs">{item.sub}</div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => joinQueue.mutate()}
                disabled={joinQueue.isPending}
                size="lg"
                className="gradient-rose text-white border-0 shadow-rose px-8"
              >
                {joinQueue.isPending ? "Joining..." : "Join Queue"}
              </Button>
            </div>
          )}

          {/* ── IN QUEUE ── */}
          {statusData?.inQueue && !session && (
            <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Finding a match...</h2>
              <p className="text-gray-500 mb-6 text-sm">
                Looking for an available opposite-gender member. This usually takes under a minute.
              </p>
              <Button
                variant="outline"
                onClick={() => leaveQueue.mutate()}
                disabled={leaveQueue.isPending}
                className="border-gray-300 text-gray-600"
              >
                Leave Queue
              </Button>
            </div>
          )}

          {/* ── ACTIVE SESSION ── */}
          {session && !sessionEnded && (
            <div className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden">
              {/* Session header */}
              <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium">Live Session</span>
                  {partnerCircumstances && (
                    <CircumstancesBadge circumstances={partnerCircumstances} size="sm" />
                  )}
                </div>
                <div className={`flex items-center gap-1.5 font-mono text-sm font-bold ${timeLeft < 60 ? "text-red-400" : "text-emerald-400"}`}>
                  <Clock className="w-4 h-4" />
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">Session started. Say hello! 👋</p>
                    {partnerCircumstances && (
                      <div className="mt-3 flex justify-center">
                        <CircumstancesBadge circumstances={partnerCircumstances} size="md" />
                      </div>
                    )}
                  </div>
                ) : (
                  messages.map((msg: any) => {
                    const isOwn = msg.senderUserId === user?.id;
                    return (
                      <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                          isOwn
                            ? "gradient-rose text-white rounded-br-sm"
                            : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-3 border-t border-gray-200 flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  maxLength={500}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <Button type="submit" disabled={!message.trim()} className="gradient-rose text-white border-0 px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              {/* End early */}
              <div className="p-3 border-t border-gray-100 flex justify-center">
                <button
                  onClick={handleEndEarly}
                  disabled={endSession.isPending}
                  className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                >
                  <SkipForward className="w-3.5 h-3.5" /> End session early
                </button>
              </div>
            </div>
          )}

          {/* ── SESSION ENDED — CONNECT/SKIP CHOICE ── */}
          {sessionEnded && !connectChoice && (
            <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-8 text-center">
              <div className="text-4xl mb-3">⏰</div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Time's up!</h2>
              <p className="text-gray-500 mb-4 text-sm">
                Would you like to connect with this person?
              </p>
              {partnerCircumstances && (
                <div className="flex justify-center mb-6">
                  <CircumstancesBadge circumstances={partnerCircumstances} size="lg" />
                </div>
              )}
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handleConnect}
                  disabled={requestConnect.isPending}
                  className="gradient-rose text-white border-0 px-8"
                  size="lg"
                >
                  <Heart className="w-4 h-4 mr-2" /> Connect
                </Button>
                <Button
                  onClick={handleSkip}
                  disabled={endSession.isPending}
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-600 px-8"
                >
                  <SkipForward className="w-4 h-4 mr-2" /> Skip
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                If you both choose Connect, you'll match and can message privately.
              </p>
            </div>
          )}

          {/* ── WAITING FOR PARTNER RESPONSE ── */}
          {connectChoice === "connect" && requestConnect.isPending && (
            <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-8 text-center">
              <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Waiting for their response...</p>
              <p className="text-gray-400 text-sm mt-1">This may take a moment.</p>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
