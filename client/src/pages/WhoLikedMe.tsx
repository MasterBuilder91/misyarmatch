import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { CircumstancesBadge } from "@/components/CircumstancesBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Lock, Star, Eye, MapPin } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhoLikedMe() {
  const { isAuthenticated, loading } = useAuth();
  const { t, isRTL } = useLanguage();

  const { data, isLoading } = trpc.profile.whoLikedMe.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  const expressInterest = trpc.interests.express.useMutation({
    onSuccess: () => {
      utils.profile.whoLikedMe.invalidate();
    },
  });
  const utils = trpc.useUtils();

  if (loading || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please sign in to see who liked you.</p>
            <Link href="/auth">
              <Button className="bg-rose-700 hover:bg-rose-800 text-white">Sign In</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const tier = data?.tier ?? "free";
  const results = data?.results ?? [];
  const isLimited = data?.isLimited ?? true;

  return (
    <Layout>
      <SEOHead
        title="Who Liked Me — MisyarMatch"
        description="See which members have expressed interest in your profile on MisyarMatch."
        canonical="/who-liked-me"
      />

      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-cream-50 py-12" dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-rose-100 rounded-full mb-4">
              <Heart className="w-7 h-7 text-rose-600 fill-rose-600" />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-rose-900 mb-2">Who Liked You</h1>
            <p className="text-gray-600 max-w-md mx-auto">
              These members have expressed sincere interest in your profile.
            </p>
          </div>

          {/* Tier gate banner */}
          {tier === "free" && (
            <div className="bg-gradient-to-r from-rose-700 to-rose-900 text-white rounded-2xl p-6 mb-8 text-center">
              <Star className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <h2 className="font-playfair text-xl font-bold mb-2">Upgrade to See All</h2>
              <p className="text-rose-100 text-sm mb-4">
                Free members see up to 3 recent likes. Premium members see 10. VIP members see all 50.
              </p>
              <Link href="/pricing">
                <Button className="bg-white text-rose-800 hover:bg-rose-50 font-semibold">
                  Upgrade Now
                </Button>
              </Link>
            </div>
          )}

          {/* Results grid */}
          {results.length === 0 ? (
            <div className="text-center py-20">
              <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-playfair text-xl text-gray-500 mb-2">No likes yet</h3>
              <p className="text-gray-400 text-sm">
                Complete your profile and browse to attract interest from potential matches.
              </p>
              <Link href="/browse">
                <Button variant="outline" className="mt-4 border-rose-300 text-rose-700">
                  Browse Profiles
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(({ interest, profile }, index) => {
                const isBlurred = tier === "free" && index >= 1;
                return (
                  <Card
                    key={interest.id}
                    className={`border-rose-100 shadow-sm overflow-hidden transition-all hover:shadow-md ${isBlurred ? "relative" : ""}`}
                  >
                    {isBlurred && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
                        <Lock className="w-8 h-8 text-rose-400 mb-2" />
                        <p className="text-sm text-rose-700 font-medium text-center px-4">
                          Upgrade to Premium to see this profile
                        </p>
                        <Link href="/pricing">
                          <Button size="sm" className="mt-3 bg-rose-700 hover:bg-rose-800 text-white text-xs">
                            Unlock
                          </Button>
                        </Link>
                      </div>
                    )}

                    <CardContent className="p-5">
                      {/* Avatar */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-playfair font-bold text-lg">
                          {profile.displayName?.charAt(0) ?? "?"}
                        </div>
                        <div>
                          <p className="font-semibold text-rose-900">
                            {profile.displayName ?? "Anonymous"}
                          </p>
                          {profile.location && (
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {profile.location}
                            </p>
                          )}
                        </div>
                        {profile.isVerified && (
                          <Badge className="ml-auto bg-blue-100 text-blue-700 text-xs border-0">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>

                      {/* Circumstances badge */}
                      {profile.currentCircumstances && (
                        <div className="mb-3">
                          <CircumstancesBadge circumstances={profile.currentCircumstances} />
                        </div>
                      )}

                      {/* Bio snippet */}
                      {profile.bio && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{profile.bio}</p>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link href={`/profile/${profile.userId}`} className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-rose-200 text-rose-700 hover:bg-rose-50"
                          >
                            View Profile
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="bg-rose-700 hover:bg-rose-800 text-white"
                          onClick={() =>
                            expressInterest.mutate({ toUserId: profile.userId })
                          }
                          disabled={expressInterest.isPending}
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Upgrade CTA at bottom for premium */}
          {tier === "premium" && results.length >= 10 && (
            <div className="text-center mt-10">
              <p className="text-gray-500 text-sm mb-3">
                You're seeing 10 likes. Upgrade to VIP to see all 50.
              </p>
              <Link href="/pricing">
                <Button className="bg-rose-700 hover:bg-rose-800 text-white">
                  Upgrade to VIP
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
