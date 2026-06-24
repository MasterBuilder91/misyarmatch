import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PhotoUploader } from "@/components/PhotoUploader";
import { CircumstancesBadge, CIRCUMSTANCES_CONFIG } from "@/components/CircumstancesBadge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

type Gender = "brother" | "sister";
type Circumstances =
  | "ready_now"
  | "currently_studying"
  | "going_through_divorce"
  | "already_married_seeking_second"
  | "working_abroad"
  | "financial_constraints";
type MaritalStatus = "never_married" | "divorced" | "widowed" | "married_seeking_second";
type FaithBackground = "muslim" | "christian" | "jewish" | "prefer_not_to_say";

const FAITH_OPTIONS: { value: FaithBackground; label: string; desc: string }[] = [
  { value: "muslim", label: "Muslim", desc: "I am Muslim" },
  { value: "christian", label: "Christian", desc: "I am Christian — open to Islamic marriage framework" },
  { value: "jewish", label: "Jewish", desc: "I am Jewish — open to Islamic marriage framework" },
  { value: "prefer_not_to_say", label: "Prefer not to say", desc: "I prefer to keep this private" },
];

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

export default function ProfileCreate() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);

  // Form state
  const [gender, setGender] = useState<Gender | null>(null);
  const [dob, setDob] = useState("");
  const [circumstances, setCircumstances] = useState<Circumstances | null>(null);
  const [intention, setIntention] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("United States");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | null>(null);
  const [occupation, setOccupation] = useState("");
  const [faithBackground, setFaithBackground] = useState<FaithBackground>("muslim");
  const [openToInterfaith, setOpenToInterfaith] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoKey, setPhotoKey] = useState("");

  const createProfile = trpc.profile.create.useMutation();
  const { data: existingProfile } = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
    if (!loading && existingProfile) {
      navigate("/browse");
    }
  }, [isAuthenticated, loading, existingProfile, navigate]);

  const validateAge = () => {
    if (!dob) return false;
    const age = Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 3600 * 1000));
    return age >= 18;
  };

  const handleNext = () => {
    if (step === 1 && !gender) { toast.error("Please select your gender"); return; }
    if (step === 2) {
      if (!dob) { toast.error("Please enter your date of birth"); return; }
      if (!validateAge()) { toast.error("You must be 18 or older to join MisyarMatch"); return; }
    }
    if (step === 3 && !circumstances) { toast.error("Please select your circumstances"); return; }
    if (step === 4 && intention.trim().length < 50) {
      toast.error("Please write at least 50 characters about your misyar intention");
      return;
    }
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!gender || !dob || !circumstances || !intention) return;
    try {
      await createProfile.mutateAsync({
        gender,
        dateOfBirth: dob,
        currentCircumstances: circumstances,
        misyarIntention: intention,
        displayName: displayName || undefined,
        bio: bio || undefined,
        location: location || undefined,
        country: country || undefined,
        maritalStatus: maritalStatus || undefined,
        occupation: occupation || undefined,
        faithBackground: faithBackground,
        openToInterfaith: openToInterfaith,
        photoUrl: photoUrl || undefined,
        photoKey: photoKey || undefined,
      });
      toast.success("Profile created! Welcome to MisyarMatch.");
      navigate("/browse");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to create profile");
    }
  };

  const STEPS = [
    { label: "Gender", num: 1 },
    { label: "Age", num: 2 },
    { label: "Circumstances", num: 3 },
    { label: "Intention", num: 4 },
  ];

  return (
    <Layout>
      <SEOHead title="Create Your Profile — MisyarMatch" description="Create your MisyarMatch profile" noIndex={true} canonical="/profile/create" />

      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {STEPS.map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step > s.num ? "gradient-rose text-white" :
                    step === s.num ? "bg-rose-700 text-white" :
                    "bg-gray-200 text-gray-500"
                  }`}>
                    {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 w-12 sm:w-20 mx-1 transition-all ${step > s.num ? "bg-rose-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-1">
              {STEPS.map((s) => <span key={s.num} className={step === s.num ? "text-rose-700 font-medium" : ""}>{s.label}</span>)}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-6 md:p-8">

            {/* Step 1: Gender */}
            {step === 1 && (
              <div>
                <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Are you a Brother or Sister?</h1>
                <p className="text-gray-500 mb-6 text-sm">This determines who you see on the platform. Brothers see sisters; sisters see brothers.</p>
                <div className="grid grid-cols-2 gap-4">
                  {(["brother", "sister"] as Gender[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`p-6 rounded-2xl border-2 text-center transition-all ${
                        gender === g
                          ? "border-rose-600 bg-rose-50"
                          : "border-gray-200 hover:border-rose-300"
                      }`}
                    >
                      <div className="text-3xl mb-2">{g === "brother" ? "🤲" : "🌸"}</div>
                      <div className="font-semibold text-gray-900 capitalize">{g}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Age */}
            {step === 2 && (
              <div>
                <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Date of Birth</h1>
                <p className="text-gray-500 mb-6 text-sm">You must be 18 or older. Your exact age is shown on your profile (not your date of birth).</p>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  max={new Date(Date.now() - 18 * 365.25 * 24 * 3600 * 1000).toISOString().split("T")[0]}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                {dob && !validateAge() && (
                  <p className="text-red-500 text-sm mt-2">You must be 18 or older to join MisyarMatch.</p>
                )}
              </div>
            )}

            {/* Step 3: Circumstances */}
            {step === 3 && (
              <div>
                <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Your Current Circumstances</h1>
                <p className="text-gray-500 mb-6 text-sm">This badge is shown on your profile and in Speed Chat before any conversation. Be honest — it is the foundation of everything here.</p>
                <div className="space-y-3">
                  {(Object.entries(CIRCUMSTANCES_CONFIG) as [Circumstances, typeof CIRCUMSTANCES_CONFIG[Circumstances]][]).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setCircumstances(key)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        circumstances === key
                          ? "border-rose-600 bg-rose-50"
                          : "border-gray-200 hover:border-rose-300"
                      }`}
                    >
                      <span className="text-2xl">{config.emoji}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{config.label}</div>
                      </div>
                      {circumstances === key && <CheckCircle className="w-5 h-5 text-rose-600 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Intention + Details */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Your Misyar Intention</h1>
                  <p className="text-gray-500 mb-4 text-sm">Be honest and direct. What are you looking for? What are your expectations? What can you offer? Min 50 characters.</p>
                  <textarea
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    placeholder="I am looking for a sincere misyar partner who understands that..."
                    rows={5}
                    maxLength={2000}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                  />
                  <div className="text-right text-xs text-gray-400">{intention.length}/2000</div>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <h2 className="font-semibold text-gray-900 mb-4">Profile Details (Optional but recommended)</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Ahmad, Fatima"
                        maxLength={100}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="A brief introduction..."
                        rows={3}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. London"
                          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        >
                          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <input
                          type="text"
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                          placeholder="e.g. Engineer"
                          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Faith Background</label>
                      <p className="text-xs text-gray-400 mb-3">MisyarMatch welcomes Muslim, Christian, and Jewish members. Under Islamic law, Muslim men may marry women of the book. All members agree to our faith-respectful framework.</p>
                      <div className="space-y-2">
                        {FAITH_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setFaithBackground(opt.value)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                              faithBackground === opt.value
                                ? "border-rose-600 bg-rose-50"
                                : "border-gray-200 hover:border-rose-300"
                            }`}
                          >
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">{opt.label}</div>
                              <div className="text-xs text-gray-500">{opt.desc}</div>
                            </div>
                            {faithBackground === opt.value && <CheckCircle className="w-5 h-5 text-rose-600 ml-auto" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200">
                      <input
                        type="checkbox"
                        id="openToInterfaith"
                        checked={openToInterfaith}
                        onChange={(e) => setOpenToInterfaith(e.target.checked)}
                        className="w-4 h-4 accent-rose-600"
                      />
                      <label htmlFor="openToInterfaith" className="text-sm text-gray-700 cursor-pointer">
                        I am open to interfaith matches (within Islamic guidelines)
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Profile Photo</label>
                      <PhotoUploader
                        currentPhotoUrl={photoUrl || null}
                        onUpload={(url, key) => { setPhotoUrl(url); setPhotoKey(key); }}
                        onRemove={() => { setPhotoUrl(""); setPhotoKey(""); }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              )}
              {step < 4 ? (
                <Button onClick={handleNext} className="flex-1 gradient-rose text-white border-0">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={createProfile.isPending}
                  className="flex-1 gradient-rose text-white border-0"
                >
                  {createProfile.isPending ? "Creating..." : "Create My Profile"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
