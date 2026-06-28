import { useState, useEffect } from "react";
import { MessageCircle, Send, User } from "lucide-react";

interface Comment {
  id: number;
  name: string | null;
  content: string;
  created_at: string;
  is_member: boolean;
}

interface Props {
  slug: string;
  currentUserName?: string | null;
  isLoggedIn?: boolean;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 2) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function Comments({ slug, currentUserName, isLoggedIn }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/comments/${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(data => { setComments(data.comments || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content: content.trim(), name: name.trim() || null, email: email.trim() || null }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments(prev => [...prev, data.comment]);
        setContent("");
        setName("");
        setEmail("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(data.error || "Failed to post comment");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 pt-10 border-t border-gray-100">
      <h3 className="font-serif text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-rose-600" />
        Comments {comments.length > 0 && <span className="text-gray-400 font-normal text-base">({comments.length})</span>}
      </h3>

      {/* Comment form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoggedIn && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name or kunya (optional)"
                maxLength={60}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-400 bg-gray-50"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email (optional, not shown)"
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-400 bg-gray-50"
              />
            </div>
          )}
          {isLoggedIn && currentUserName && (
            <p className="text-sm text-gray-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rose-500" />
              Commenting as <span className="font-semibold text-gray-800">{currentUserName}</span>
            </p>
          )}
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share your thoughts, experience, or question..."
            rows={4}
            maxLength={1000}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-400 bg-gray-50 resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{content.length}/1000</span>
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-50 transition-all"
              style={{ background: "linear-gradient(135deg, #7C1D2E, #B8965A)" }}
            >
              {submitting ? "Posting..." : <><Send className="w-3.5 h-3.5" /> Post Comment</>}
            </button>
          </div>
          {submitted && <p className="text-emerald-600 text-sm">✓ Comment posted. JazakAllah khair.</p>}
          {error && <p className="text-rose-500 text-sm">{error}</p>}
        </form>
      </div>

      {/* Comments list */}
      {loading ? (
        <p className="text-gray-400 text-sm text-center py-4">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white rounded-2xl border border-gray-100 p-5"
              style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: comment.is_member ? "linear-gradient(135deg, #7C1D2E, #B8965A)" : "#D1D5DB" }}>
                  {(comment.name || "A")[0].toUpperCase()}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    {comment.name || "Anonymous"}
                  </span>
                  {comment.is_member && (
                    <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-medium">Member</span>
                  )}
                </div>
                <span className="text-xs text-gray-400 ml-auto">{timeAgo(comment.created_at)}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
