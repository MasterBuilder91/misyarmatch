import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Bell, Heart, MessageCircle, Zap, Info, CheckCheck } from "lucide-react";
import { useLocation } from "wouter";
import { formatDistanceToNow } from "date-fns";

const NOTIFICATION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  new_match: Heart,
  new_message: MessageCircle,
  new_interest: Zap,
  system: Info,
};

export default function Notifications() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.notifications.list.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  const markRead = trpc.notifications.markAllRead.useMutation({
    onSuccess: () => utils.notifications.list.invalidate(),
  });

  if (!isAuthenticated && !loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <Bell className="w-12 h-12 text-rose-300 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Sign in to see notifications</h2>
            <Button asChild className="gradient-rose text-white border-0 mt-4">
              <a href={getLoginUrl()}>Sign In</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const notifications = Array.isArray(data) ? data : [];
  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  return (
    <Layout>
      <SEOHead title="Notifications — MisyarMatch" description="Your MisyarMatch notifications" noIndex={true} canonical="/notifications" />

      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-rose-600 text-sm">{unreadCount} unread</p>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => markRead.mutate()}
                disabled={markRead.isPending}
                className="border-rose-200 text-rose-700 hover:bg-rose-50 text-xs"
              >
                <CheckCheck className="w-3.5 h-3.5 mr-1.5" />
                Mark all read
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-12 h-12 text-rose-200 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">No notifications yet</h3>
              <p className="text-gray-500 text-sm">When someone expresses interest or you match, you'll see it here.</p>
              <Button
                onClick={() => navigate("/browse")}
                className="mt-6 gradient-rose text-white border-0"
              >
                Browse Members
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notif: any) => {
                const Icon = NOTIFICATION_ICONS[notif.type] ?? Bell;
                return (
                  <div
                    key={notif.id}
                    className={`bg-white rounded-xl p-4 border transition-all cursor-pointer hover:shadow-sm ${
                      !notif.isRead ? "border-rose-200 bg-rose-50/30" : "border-gray-100"
                    }`}
                    onClick={() => {
                      if (notif.type === "new_match" || notif.type === "new_message") {
                        navigate("/messages");
                      } else if (notif.type === "new_interest") {
                        navigate("/browse");
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        !notif.isRead ? "gradient-rose" : "bg-gray-100"
                      }`}>
                        <Icon className={`w-5 h-5 ${!notif.isRead ? "text-white" : "text-gray-500"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notif.isRead ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                          {notif.content}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      {!notif.isRead && (
                        <div className="w-2 h-2 rounded-full bg-rose-600 flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
