import { useState } from "react";
import { ArrowRight, Mail, Check } from "lucide-react";

interface Props {
  variant?: "inline" | "banner";
}

export function EmailCapture({ variant = "inline" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 rounded-2xl px-6 py-4 border border-emerald-100">
        <Check className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">You're in. New articles delivered to your inbox.</p>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="rounded-2xl p-8 text-center border border-rose-100 bg-rose-50">
        <Mail className="w-8 h-8 text-rose-600 mx-auto mb-3" />
        <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
          New articles every week
        </h3>
        <p className="text-gray-500 text-sm mb-5 max-w-xs mx-auto">
          Honest Islamic writing on marriage, nikah, and halal life. No spam. Unsubscribe anytime.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-400"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-1.5 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #7C1D2E, #B8965A)" }}
          >
            {status === "loading" ? "..." : <><span>Subscribe</span><ArrowRight className="w-3.5 h-3.5" /></>}
          </button>
        </form>
        {status === "error" && <p className="text-rose-500 text-xs mt-2">Something went wrong. Try again.</p>}
      </div>
    );
  }

  // Inline variant — compact, for inside article content
  return (
    <div className="my-8 p-6 rounded-2xl border-l-4 bg-amber-50 border-amber-400">
      <p className="font-semibold text-gray-900 text-sm mb-1">
        📬 Get new articles like this in your inbox
      </p>
      <p className="text-gray-500 text-xs mb-4">Honest Islamic writing. No spam.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-rose-400"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
          style={{ background: "#7C1D2E" }}
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && <p className="text-rose-500 text-xs mt-2">Try again.</p>}
    </div>
  );
}
