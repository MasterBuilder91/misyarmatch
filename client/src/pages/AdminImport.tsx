import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Upload, CheckCircle, AlertTriangle } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface ParsedProfile {
  gender: "brother" | "sister";
  displayName: string;
  age?: number;
  location?: string;
  country?: string;
  maritalStatus?: string;
  currentCircumstances?: string;
  bio?: string;
  occupation?: string;
  misyarIntention?: string;
}

function parseCSV(text: string): ParsedProfile[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ""; });
    return {
      gender: (row.gender?.toLowerCase() === "sister" ? "sister" : "brother") as "brother" | "sister",
      displayName: row.display_name || row.name || "Member",
      age: row.age ? parseInt(row.age) : undefined,
      location: row.location || row.city || undefined,
      country: row.country || "United States",
      maritalStatus: row.marital_status || undefined,
      currentCircumstances: row.current_circumstances || row.circumstances || "ready_now",
      bio: row.bio || undefined,
      occupation: row.occupation || undefined,
      misyarIntention: row.misyar_intention || row.intention || "Looking for a sincere misyar partner.",
    };
  });
}

export default function AdminImport() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [profiles, setProfiles] = useState<ParsedProfile[]>([]);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const importMutation = trpc.admin.importProfiles.useMutation();

  const { data: stats } = trpc.admin.getStats.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  if (!loading && isAuthenticated && user?.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseCSV(text);
      setProfiles(parsed);
      toast.success(`Parsed ${parsed.length} profiles from CSV`);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!profiles.length) return;
    try {
      const result = await importMutation.mutateAsync({ profiles });
      toast.success(`Imported ${result.imported} of ${result.total} profiles`);
      setProfiles([]);
      setFileName("");
    } catch (err: any) {
      toast.error(err.message ?? "Import failed");
    }
  };

  return (
    <Layout>
      <SEOHead title="Admin — Import Profiles" description="Admin tool" noIndex={true} canonical="/admin/import" />

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Admin: Import Profiles</h1>
          <p className="text-gray-600 mb-8">Upload a CSV of profiles from the old platform to seed the database.</p>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Users", value: stats.users },
                { label: "Total Profiles", value: stats.profiles },
                { label: "Total Matches", value: stats.matches },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                  <div className="font-serif text-3xl font-bold text-rose-700">{s.value}</div>
                  <div className="text-gray-500 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* CSV format guide */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
            <h2 className="font-semibold text-gray-900 mb-3">Expected CSV Format</h2>
            <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono text-green-400 overflow-x-auto">
              <div>gender,display_name,age,location,country,marital_status,current_circumstances,bio,occupation,misyar_intention</div>
              <div>brother,Ahmad,35,Houston,United States,divorced,ready_now,"Sincere brother seeking halal connection",Engineer,"Looking for a pious sister for misyar nikah"</div>
              <div>sister,Fatima,28,Toronto,Canada,never_married,currently_studying,"Studying medicine","Medical Student","Open to misyar while I complete my studies"</div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              <strong>circumstances options:</strong> ready_now, currently_studying, going_through_divorce, already_married_seeking_second, working_abroad, financial_constraints
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <strong>marital_status options:</strong> never_married, divorced, widowed, married_seeking_second
            </div>
          </div>

          {/* Upload */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Upload CSV</h2>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-rose-400 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">{fileName || "Click to upload CSV file"}</p>
              <p className="text-gray-400 text-sm mt-1">Supports .csv files</p>
              <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
            </div>
          </div>

          {/* Preview */}
          {profiles.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Preview ({profiles.length} profiles)</h2>
                <Button
                  onClick={handleImport}
                  disabled={importMutation.isPending}
                  className="gradient-rose text-white border-0"
                >
                  {importMutation.isPending ? "Importing..." : `Import ${profiles.length} Profiles`}
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {["Gender", "Name", "Age", "Location", "Circumstances", "Marital Status"].map((h) => (
                        <th key={h} className="text-left py-2 px-3 text-gray-500 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.slice(0, 20).map((p, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-3 capitalize">{p.gender}</td>
                        <td className="py-2 px-3 font-medium">{p.displayName}</td>
                        <td className="py-2 px-3">{p.age ?? "—"}</td>
                        <td className="py-2 px-3">{p.location ?? "—"}</td>
                        <td className="py-2 px-3 text-xs">{p.currentCircumstances?.replace(/_/g, " ")}</td>
                        <td className="py-2 px-3 text-xs">{p.maritalStatus?.replace(/_/g, " ") ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {profiles.length > 20 && (
                  <p className="text-gray-500 text-sm mt-2 text-center">... and {profiles.length - 20} more</p>
                )}
              </div>
            </div>
          )}

          {importMutation.isSuccess && (
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-800 font-medium">
                Import complete: {importMutation.data.imported} profiles added.
              </span>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
