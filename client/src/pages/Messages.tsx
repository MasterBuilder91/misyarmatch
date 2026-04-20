import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Heart, MessageCircle, Send, ArrowLeft } from "lucide-react";
import { useLocation, useSearch } from "wouter";
import { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

function ChatWindow({ matchId, currentUserId }: { matchId: number; currentUserId: number }) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const utils = trpc.useUtils();

  const { data: matchData } = trpc.matches.getById.useQuery({ matchId }, { retry: false });
  const { data: messagesData, isLoading } = trpc.messages.list.useQuery(
    { matchId },
    { refetchInterval: 5000, retry: false }
  );

  const sendMessage = trpc.messages.send.useMutation({
    onSuccess: () => {
      utils.messages.list.invalidate({ matchId });
      setMessage("");
    },
    onError: (err) => toast.error(err.message ?? "Failed to send"),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData]);

  const partner = matchData?.otherProfile?.profile;
  const messages = Array.isArray(messagesData) ? messagesData : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage.mutate({ matchId, content: message.trim() });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-blush flex items-center justify-center overflow-hidden">
          {partner?.photoUrl ? (
            <img src={partner.photoUrl} alt={partner.displayName ?? "Match"} className="w-full h-full object-cover" />
          ) : (
            <span className="font-serif text-lg text-rose-400">
              {(partner?.displayName ?? "?")[0]?.toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{partner?.displayName ?? "Match"}</div>
          <div className="text-xs text-gray-500">{partner?.location ?? ""}</div>
        </div>
        <div className="ml-auto">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">No read receipts</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {isLoading ? (
          <div className="text-center text-gray-400 text-sm py-8">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="w-8 h-8 text-rose-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">
              You've matched! Send the first message. Take your time — there are no read receipts.
            </p>
          </div>
        ) : (
          messages.map((msg: any) => {
            const isOwn = msg.senderUserId === currentUserId;
            return (
              <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                    isOwn
                      ? "gradient-rose text-white rounded-br-sm"
                      : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1 ${isOwn ? "text-rose-200" : "text-gray-400"}`}>
                    {formatDistanceToNow(new Date(msg.sentAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="bg-white border-t border-gray-200 p-3 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          maxLength={2000}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
        <Button
          type="submit"
          disabled={!message.trim() || sendMessage.isPending}
          className="gradient-rose text-white border-0 px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}

export default function Messages() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const matchIdParam = params.get("matchId");
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(
    matchIdParam ? parseInt(matchIdParam) : null
  );

  const { data: matchesData, isLoading } = trpc.matches.list.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  const matches = Array.isArray(matchesData) ? matchesData : [];

  useEffect(() => {
    if (matches.length > 0 && !selectedMatchId) {
      setSelectedMatchId(matches[0].match.id);
    }
  }, [matches, selectedMatchId]);

  if (!isAuthenticated && !loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-rose-300 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Sign in to access messages</h2>
            <Button asChild className="gradient-rose text-white border-0 mt-4">
              <a href={getLoginUrl()}>Sign In</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title="Messages — MisyarMatch" description="Your private messages on MisyarMatch" noIndex={true} canonical="/messages" />

      <div className="h-[calc(100vh-64px)] flex bg-white">
        {/* Sidebar — match list */}
        <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${selectedMatchId ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-serif text-lg font-bold text-gray-900">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-gray-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                      <div className="h-3 bg-gray-100 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : matches.length === 0 ? (
              <div className="text-center py-12 px-4">
                <Heart className="w-8 h-8 text-rose-200 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No matches yet.</p>
                <Button
                  size="sm"
                  onClick={() => navigate("/browse")}
                  className="mt-3 gradient-rose text-white border-0 text-xs"
                >
                  Browse Members
                </Button>
              </div>
            ) : (
              matches.map((item: any) => {
                const match = item.match;
                const partner = item.otherProfile?.profile;
                const isSelected = selectedMatchId === match.id;
                return (
                  <button
                    key={match.id}
                    onClick={() => setSelectedMatchId(match.id)}
                    className={`w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                      isSelected ? "bg-rose-50 border-l-2 border-l-rose-600" : ""
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-100 to-blush flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {partner?.photoUrl ? (
                        <img src={partner.photoUrl} alt={partner.displayName ?? "Match"} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-serif text-lg text-rose-400">
                          {(partner?.displayName ?? "?")[0]?.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">
                        {partner?.displayName ?? "Match"}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {partner?.location ?? ""}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex flex-col ${!selectedMatchId ? "hidden md:flex" : "flex"}`}>
          {selectedMatchId ? (
            <>
              <div className="md:hidden p-2 border-b border-gray-200">
                <button
                  onClick={() => setSelectedMatchId(null)}
                  className="flex items-center gap-1 text-sm text-gray-600"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChatWindow matchId={selectedMatchId} currentUserId={user?.id ?? 0} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-rose-200 mx-auto mb-3" />
                <p className="text-gray-500">Select a match to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
