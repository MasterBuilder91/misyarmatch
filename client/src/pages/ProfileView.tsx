import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { CircumstancesBadge } from "@/components/CircumstancesBadge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Edit, Heart, MapPin, Briefcase, Crown } from "lucide-react";
import { useParams, useLocation } from "wouter";
import { toast } from "sonner";

export default function ProfileView() {
  const { userId } = useParams<{ userId: string }>();
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();

  const targetUserId = parseInt(userId ?? "0");
  const isOwnProfile = user?.id === targetUserId;

  const { data, isLoading } = trpc.profile.getByUserId.useQuery(
    { userId: targetUserId },
    { enabled: !!targetUserId, retry: false }
  );

  const { data: interestData } = trpc.interests.check.useQuery(
    { toUserId: targetUserId },
    { enabled: isAuthenticated && !loading && !isOwnProfile && !!targetUserId, retry: false }
  );

  const expressInterest = trpc.interests.express.useMutation({
    onSuccess: (result) => {
      utils.interests.check.invalidate({ toUserId: targetUserId });
      if (result.matched) {
        toast.success("It's a match! 💕 You can now message each other.");
      } else if (result.alreadyExpressed) {
        toast.info("You've already expressed interest in this profile.");
      } else {
        toast.success("Interest expressed! If they're interested too, you'll match.");
      }
    },
    onError: (err) => toast.error(err.message ?? "Failed to express interest"),
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-rose-600 font-medium">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 mb-4">Profile not found</div>
            <Button onClick={() => navigate("/browse")} variant="outline">Back to Browse</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const { profile } = data;
  const showPhoto = isOwnProfile || interestData?.mutual;
  const age = profile.dateOfBirth
    ? Math.floor((Date.now() - new Date(profile.dateOfBirth).getTime()) / (365.25 * 24 * 3600 * 1000))
    : null;

  return (
    <Layout>
      <SEOHead
        title={`${profile.displayName ?? "Member"} — MisyarMatch`}
        description={`View this member's profile on MisyarMatch. ${profile.currentCircumstances?.replace(/_/g, " ") ?? ""}`}
        noIndex={true}
        canonical={`/profile/${targetUserId}`}
      />

      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Profile card */}
          <div className="bg-white rounded-3xl shadow-sm border border-rose-100 overflow-hidden">

            {/* Photo header */}
            <div className="relative h-80 bg-gradient-to-br from-rose-100 to-blush flex items-center justify-center">
              {profile.photoUrl ? (
                showPhoto ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.displayName ?? "Profile"}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/50 backdrop-blur-xl flex items-center justify-center mb-2">
                      <Heart className="w-10 h-10 text-rose-400" />
                    </div>
                    <p className="text-rose-600 text-sm font-medium">Photo revealed on mutual interest</p>
                  </div>
                )
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/50 flex items-center justify-center">
                  <span className="text-4xl font-serif text-rose-400">
                    {(profile.displayName ?? "?")[0]?.toUpperCase()}
                  </span>
                </div>
              )}

              {/* Premium badge */}
              {profile.subscriptionTier === "premium" && (
                <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3" /> Premium
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-gray-900">
                    {profile.displayName ?? "Member"}
                    {age && <span className="text-gray-500 font-normal text-lg ml-2">{age}</span>}
                  </h1>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    {profile.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {profile.location}{profile.country ? `, ${profile.country}` : ""}
                      </span>
                    )}
                    {profile.occupation && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        {profile.occupation}
                      </span>
                    )}
                  </div>
                </div>
                {isOwnProfile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/profile/edit")}
                    className="border-rose-200 text-rose-700 hover:bg-rose-50"
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                )}
              </div>

              {/* Circumstances badge */}
              {profile.currentCircumstances && (
                <div className="mb-4">
                  <CircumstancesBadge circumstances={profile.currentCircumstances} size="lg" />
                </div>
              )}

              {/* Marital status */}
              {profile.maritalStatus && (
                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Marital Status: </span>
                  <span className="text-gray-700 text-sm capitalize">{profile.maritalStatus.replace(/_/g, " ")}</span>
                </div>
              )}

              {/* Bio */}
              {profile.bio && (
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">About</h3>
                  <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                </div>
              )}

              {/* Intention */}
              {profile.misyarIntention && (
                <div className="mb-6 bg-rose-50 rounded-xl p-4 border border-rose-100">
                  <h3 className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-2">Misyar Intention</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{profile.misyarIntention}</p>
                </div>
              )}

              {/* Action */}
              {!isOwnProfile && (
                <div className="border-t border-gray-100 pt-4">
                  {!isAuthenticated ? (
                    <Button asChild className="w-full gradient-rose text-white border-0">
                      <a href={getLoginUrl()}>Sign in to Express Interest</a>
                    </Button>
                  ) : interestData?.mutual ? (
                    <div className="text-center">
                      <div className="text-emerald-600 font-semibold mb-2">💕 You're matched!</div>
                      <Button onClick={() => navigate("/messages")} className="gradient-rose text-white border-0">
                        Send a Message
                      </Button>
                    </div>
                  ) : interestData?.expressed ? (
                    <div className="text-center text-gray-500 text-sm">
                      You've expressed interest. Waiting for them to respond...
                    </div>
                  ) : (
                    <Button
                      onClick={() => expressInterest.mutate({ toUserId: targetUserId })}
                      disabled={expressInterest.isPending}
                      className="w-full gradient-rose text-white border-0"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {expressInterest.isPending ? "..." : "Express Interest"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
