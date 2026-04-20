import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PhotoUploader } from "@/components/PhotoUploader";
import { CircumstancesBadge, CIRCUMSTANCES_CONFIG } from "@/components/CircumstancesBadge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { CheckCircle, Save } from "lucide-react";
import { useState, useEffect } from "react";
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

const MARITAL_OPTIONS: { value: MaritalStatus; label: string }[] = [
  { value: "never_married", label: "Never Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "married_seeking_second", label: "Married (Seeking Second Wife)" },
];

const COUNTRIES = [
  "United Kingdom", "United States", "Canada", "Australia", "Germany",
  "France", "Netherlands", "Sweden", "Norway", "UAE", "Saudi Arabia",
  "Pakistan", "Bangladesh", "India", "Egypt", "Morocco", "Turkey", "Other",
];

export default function ProfileEdit() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();

  const { data: profile, isLoading } = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | null>(null);
  const [occupation, setOccupation] = useState("");
  const [circumstances, setCircumstances] = useState<Circumstances | null>(null);
  const [intention, setIntention] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoKey, setPhotoKey] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) window.location.href = getLoginUrl();
    if (!loading && !isLoading && !profile) navigate("/profile/create");
  }, [isAuthenticated, loading, profile, isLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName ?? "");
      setBio(profile.bio ?? "");
      setLocation(profile.location ?? "");
      setCountry(profile.country ?? "United Kingdom");
      setMaritalStatus((profile.maritalStatus as MaritalStatus) ?? null);
      setOccupation(profile.occupation ?? "");
      setCircumstances((profile.currentCircumstances as Circumstances) ?? null);
      setIntention(profile.misyarIntention ?? "");
      setPhotoUrl(profile.photoUrl ?? "");
      setPhotoKey(profile.photoKey ?? "");
      setIsVisible(profile.isProfileVisible ?? true);
    }
  }, [profile]);

  const updateProfile = trpc.profile.update.useMutation({
    onSuccess: () => {
      utils.profile.get.invalidate();
      toast.success("Profile updated successfully");
      navigate(`/profile/${profile?.userId}`);
    },
    onError: (err) => toast.error(err.message ?? "Update failed"),
  });

  const handleSave = () => {
    updateProfile.mutate({
      displayName: displayName || undefined,
      bio: bio || undefined,
      location: location || undefined,
      country: country || undefined,
      maritalStatus: maritalStatus || undefined,
      occupation: occupation || undefined,
      currentCircumstances: circumstances || undefined,
      misyarIntention: intention || undefined,
      photoUrl: photoUrl || undefined,
      photoKey: photoKey || undefined,
      isProfileVisible: isVisible,
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-rose-600 font-medium">Loading your profile...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title="Edit Profile — MisyarMatch" description="Edit your MisyarMatch profile" noIndex={true} canonical="/profile/edit" />

      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-serif text-2xl font-bold text-gray-900">Edit Profile</h1>
            <Button
              onClick={handleSave}
              disabled={updateProfile.isPending}
              className="gradient-rose text-white border-0"
            >
              <Save className="w-4 h-4 mr-2" />
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-6 space-y-6">

            {/* Photo */}
            <div className="flex flex-col items-center pb-6 border-b border-gray-100">
              <PhotoUploader
                currentPhotoUrl={photoUrl || null}
                onUpload={(url, key) => { setPhotoUrl(url); setPhotoKey(key); }}
                onRemove={() => { setPhotoUrl(""); setPhotoKey(""); }}
              />
            </div>

            {/* Circumstances */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Current Circumstances</label>
              <div className="space-y-2">
                {(Object.entries(CIRCUMSTANCES_CONFIG) as [Circumstances, typeof CIRCUMSTANCES_CONFIG[Circumstances]][]).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setCircumstances(key)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      circumstances === key ? "border-rose-600 bg-rose-50" : "border-gray-200 hover:border-rose-300"
                    }`}
                  >
                    <span className="text-xl">{config.emoji}</span>
                    <span className="font-medium text-gray-900 text-sm">{config.label}</span>
                    {circumstances === key && <CheckCircle className="w-4 h-4 text-rose-600 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Intention */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Misyar Intention</label>
              <textarea
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                rows={4}
                maxLength={2000}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
              />
              <div className="text-right text-xs text-gray-400">{intention.length}/2000</div>
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={100}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">About Me</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Marital + Occupation */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status</label>
                <select
                  value={maritalStatus ?? ""}
                  onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus || null)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="">Select...</option>
                  {MARITAL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            {/* Visibility */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <div className="font-semibold text-gray-900 text-sm">Profile Visibility</div>
                <div className="text-gray-500 text-xs">Hidden profiles won't appear in Browse</div>
              </div>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className={`relative w-12 h-6 rounded-full transition-colors ${isVisible ? "bg-rose-600" : "bg-gray-300"}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${isVisible ? "translate-x-7" : "translate-x-1"}`} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
