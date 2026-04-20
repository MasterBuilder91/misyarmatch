import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { CircumstancesBadge } from "@/components/CircumstancesBadge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Heart, MessageCircle, MapPin } from "lucide-react";
import { CompatibilityInsight } from "@/components/CompatibilityInsight";
import { useLocation } from "wouter";
import { formatDistanceToNow } from "date-fns";

export default function Matches() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();

  const { data, isLoading } = trpc.matches.list.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  if (!isAuthenticated && !loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <Heart className="w-12 h-12 text-rose-300 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Sign in to see your matches</h2>
            <Button asChild className="gradient-rose text-white border-0 mt-4">
              <a href={getLoginUrl()}>Sign In</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const matches = Array.isArray(data) ? data : [];

  return (
    <Layout>
      <SEOHead title="Your Matches — MisyarMatch" description="Your mutual matches on MisyarMatch" noIndex={true} canonical="/matches" />

      <div className="min-h-screen bg-cream">
        <div className="gradient-hero text-white py-8">
          <div className="container">
            <h1 className="font-serif text-3xl font-bold mb-1">Your Matches</h1>
            <p className="text-rose-200 text-sm">
              {matches.length} mutual {matches.length === 1 ? "match" : "matches"}
            </p>
          </div>
        </div>

        <div className="container py-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                      <div className="h-3 bg-gray-100 rounded w-1/3" />
                      <div className="h-8 bg-gray-100 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-12 h-12 text-rose-200 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">No matches yet</h3>
              <p className="text-gray-500 text-sm mb-6">
                Express interest in members you like. When they express interest back, you'll match.
              </p>
              <Button onClick={() => navigate("/browse")} className="gradient-rose text-white border-0">
                Browse Members
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((item: any) => {
                const match = item.match;
                const partner = item.otherProfile?.profile;
                const age = partner?.dateOfBirth
                  ? Math.floor((Date.now() - new Date(partner.dateOfBirth).getTime()) / (365.25 * 24 * 3600 * 1000))
                  : null;

                return (
                  <div key={match.id} className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-blush flex items-center justify-center flex-shrink-0 cursor-pointer overflow-hidden"
                          onClick={() => navigate(`/profile/${partner?.userId}`)}
                        >
                          {partner?.photoUrl ? (
                            <img src={partner.photoUrl} alt={partner.displayName ?? "Match"} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-serif text-2xl text-rose-400">
                              {(partner?.displayName ?? "?")[0]?.toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3
                                className="font-serif font-bold text-gray-900 cursor-pointer hover:text-rose-700"
                                onClick={() => navigate(`/profile/${partner?.userId}`)}
                              >
                                {partner?.displayName ?? "Member"}
                                {age && <span className="text-gray-400 font-normal text-sm ml-1">{age}</span>}
                              </h3>
                              {partner?.location && (
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                  <MapPin className="w-3 h-3" />
                                  {partner.location}
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">
                              {formatDistanceToNow(new Date(match.matchedAt), { addSuffix: true })}
                            </span>
                          </div>

                          {partner?.currentCircumstances && (
                            <div className="mt-2">
                              <CircumstancesBadge circumstances={partner.currentCircumstances} size="sm" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* AI Islamic Compatibility Insight */}
                      <div className="mt-3">
                        <CompatibilityInsight matchId={match.id} />
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/messages?matchId=${match.id}`)}
                          className="flex-1 gradient-rose text-white border-0 text-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                          Message
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/profile/${partner?.userId}`)}
                          className="border-rose-200 text-rose-700 hover:bg-rose-50 text-xs"
                        >
                          View Profile
                        </Button>
                      </div>
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
