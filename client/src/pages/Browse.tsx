import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { CircumstancesBadge, CIRCUMSTANCES_CONFIG } from "@/components/CircumstancesBadge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import {
  Filter, Heart, MapPin, Briefcase, Crown, Eye, ChevronDown, X, Search
} from "lucide-react";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

type Circumstances =
  | "ready_now"
  | "currently_studying"
  | "going_through_divorce"
  | "already_married_seeking_second"
  | "working_abroad"
  | "financial_constraints";

type MaritalStatus = "never_married" | "divorced" | "widowed" | "married_seeking_second";

const MARITAL_LABELS: Record<MaritalStatus, string> = {
  never_married: "Never Married",
  divorced: "Divorced",
  widowed: "Widowed",
  married_seeking_second: "Married (Seeking Second)",
};

const COUNTRIES = [
  "United Kingdom", "United States", "Canada", "Australia", "Germany",
  "France", "Netherlands", "Sweden", "Norway", "UAE", "Saudi Arabia",
  "Pakistan", "Bangladesh", "India", "Egypt", "Morocco", "Turkey", "Other",
];

interface Profile {
  id: number;
  userId: number;
  displayName: string | null;
  photoUrl: string | null;
  location: string | null;
  country: string | null;
  currentCircumstances: string | null;
  maritalStatus: string | null;
  occupation: string | null;
  dateOfBirth: string | null;
  subscriptionTier: string | null;
  bio: string | null;
}

function ProfileCard({
  profile,
  isMutual,
  hasExpressed,
  onInterest,
  loading,
}: {
  profile: Profile;
  isMutual: boolean;
  hasExpressed: boolean;
  onInterest: () => void;
  loading: boolean;
}) {
  const [, navigate] = useLocation();
  const age = profile.dateOfBirth
    ? Math.floor((Date.now() - new Date(profile.dateOfBirth).getTime()) / (365.25 * 24 * 3600 * 1000))
    : null;

  return (
    <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      {/* Photo */}
      <div
        className="relative h-48 bg-gradient-to-br from-rose-100 to-blush cursor-pointer"
        onClick={() => navigate(`/profile/${profile.userId}`)}
      >
        {profile.photoUrl ? (
          isMutual ? (
            <img
              src={profile.photoUrl}
              alt={profile.displayName ?? "Member"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full relative">
              <img
                src={profile.photoUrl}
                alt=""
                className="w-full h-full object-cover blur-xl scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                <Eye className="w-6 h-6 text-white mb-1" />
                <span className="text-white text-xs font-medium">Mutual interest reveals photo</span>
              </div>
            </div>
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-5xl text-rose-300">
              {(profile.displayName ?? "?")[0]?.toUpperCase()}
            </span>
          </div>
        )}

        {profile.subscriptionTier === "premium" && (
          <div className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Crown className="w-3 h-3" /> Premium
          </div>
        )}

        {isMutual && (
          <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            💕 Matched
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3
              className="font-serif font-bold text-gray-900 cursor-pointer hover:text-rose-700"
              onClick={() => navigate(`/profile/${profile.userId}`)}
            >
              {profile.displayName ?? "Member"}
              {age && <span className="text-gray-400 font-normal text-sm ml-1">{age}</span>}
            </h3>
            {(profile.location || profile.country) && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <MapPin className="w-3 h-3" />
                {[profile.location, profile.country].filter(Boolean).join(", ")}
              </div>
            )}
          </div>
        </div>

        {profile.currentCircumstances && (
          <div className="mb-3">
            <CircumstancesBadge circumstances={profile.currentCircumstances} size="sm" />
          </div>
        )}

        {profile.occupation && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <Briefcase className="w-3 h-3" />
            {profile.occupation}
          </div>
        )}

        {profile.maritalStatus && (
          <div className="text-xs text-gray-500 mb-3">
            {MARITAL_LABELS[profile.maritalStatus as MaritalStatus] ?? profile.maritalStatus.replace(/_/g, " ")}
          </div>
        )}

        <Button
          onClick={onInterest}
          disabled={loading || hasExpressed || isMutual}
          size="sm"
          className={`w-full text-xs ${
            isMutual
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
              : hasExpressed
              ? "bg-gray-50 text-gray-500 border border-gray-200"
              : "gradient-rose text-white border-0"
          }`}
          variant={isMutual || hasExpressed ? "outline" : "default"}
        >
          <Heart className="w-3.5 h-3.5 mr-1.5" />
          {isMutual ? "Matched!" : hasExpressed ? "Interest Sent" : "Express Interest"}
        </Button>
      </div>
    </div>
  );
}

export default function Browse() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filterCountry, setFilterCountry] = useState("");
  const [filterMarital, setFilterMarital] = useState<MaritalStatus | "">("");
  const [filterCircumstances, setFilterCircumstances] = useState<Circumstances | "">("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = trpc.browse.list.useQuery(
    {
      country: filterCountry || undefined,
      maritalStatus: filterMarital || undefined,
      circumstances: filterCircumstances || undefined,
    },
    { enabled: isAuthenticated && !loading, retry: false }
  );

  const expressInterest = trpc.interests.express.useMutation({
    onSuccess: (result, variables) => {
      utils.browse.list.invalidate();
      if (result.matched) {
        toast.success("It's a match! 💕 You can now message each other.");
      } else if (!result.alreadyExpressed) {
        toast.success("Interest expressed!");
      }
    },
    onError: (err) => toast.error(err.message ?? "Failed"),
  });

  const filteredProfiles = useMemo(() => {
    if (!data?.profiles) return [];
    if (!searchQuery) return data.profiles;
    const q = searchQuery.toLowerCase();
    return data.profiles.filter(
      (p: Profile) =>
        p.displayName?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.occupation?.toLowerCase().includes(q)
    );
  }, [data?.profiles, searchQuery]);

  const activeFilterCount = [filterCountry, filterMarital, filterCircumstances].filter(Boolean).length;

  return (
    <Layout>
      <SEOHead
        title="Browse Members — MisyarMatch"
        description="Browse sincere Muslim members looking for misyar marriage. Filter by location, circumstances, and marital status. Photos revealed on mutual interest."
        keywords="browse misyar marriage profiles, Muslim singles misyar, halal matchmaking browse"
        canonical="/browse"
      />

      <div className="min-h-screen bg-cream">
        {/* Header */}
        <div className="gradient-hero text-white py-8">
          <div className="container">
            <h1 className="font-serif text-3xl font-bold mb-1">Browse Members</h1>
            <p className="text-rose-200 text-sm">
              {data?.total ?? 0} members · Photos revealed on mutual interest
            </p>
          </div>
        </div>

        <div className="container py-6">
          {!isAuthenticated && !loading ? (
            <div className="text-center py-16">
              <Heart className="w-12 h-12 text-rose-300 mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Sign in to Browse</h2>
              <p className="text-gray-500 mb-6">Create a free account to see all members.</p>
              <Button asChild className="gradient-rose text-white border-0">
                <a href={getLoginUrl()}>Sign In with Google</a>
              </Button>
            </div>
          ) : (
            <>
              {/* Search + Filter bar */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, city, occupation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                    showFilters || activeFilterCount > 0
                      ? "bg-rose-600 text-white border-rose-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-rose-400"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-white text-rose-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Filter panel */}
              {showFilters && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Country</label>
                    <select
                      value={filterCountry}
                      onChange={(e) => setFilterCountry(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      <option value="">All Countries</option>
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Marital Status</label>
                    <select
                      value={filterMarital}
                      onChange={(e) => setFilterMarital(e.target.value as MaritalStatus | "")}
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      <option value="">All Statuses</option>
                      {Object.entries(MARITAL_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Circumstances</label>
                    <select
                      value={filterCircumstances}
                      onChange={(e) => setFilterCircumstances(e.target.value as Circumstances | "")}
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      <option value="">All Circumstances</option>
                      {(Object.entries(CIRCUMSTANCES_CONFIG) as [Circumstances, typeof CIRCUMSTANCES_CONFIG[Circumstances]][]).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </div>
                  {activeFilterCount > 0 && (
                    <div className="sm:col-span-3 flex justify-end">
                      <button
                        onClick={() => { setFilterCountry(""); setFilterMarital(""); setFilterCircumstances(""); }}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500"
                      >
                        <X className="w-3.5 h-3.5" /> Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Grid */}
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                      <div className="h-48 bg-gray-100" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                        <div className="h-8 bg-gray-100 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProfiles.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-12 h-12 text-rose-200 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">No members found</h3>
                  <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or check back later.</p>
                  {activeFilterCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => { setFilterCountry(""); setFilterMarital(""); setFilterCircumstances(""); }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProfiles.map((profile: Profile) => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      isMutual={data?.mutualInterests?.includes(profile.userId) ?? false}
                      hasExpressed={data?.expressedInterests?.includes(profile.userId) ?? false}
                      onInterest={() => expressInterest.mutate({ toUserId: profile.userId })}
                      loading={expressInterest.isPending}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
