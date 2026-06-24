import { useAuth } from "@/_core/hooks/useAuth";
import { SEOHead } from "@/components/SEOHead";
import { getLoginUrl } from "@/const";
import { Heart, Shield, CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Auth() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/browse");
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <>
      <SEOHead
        title="Sign In — MisyarMatch"
        description="Sign in to MisyarMatch with Google. Find your halal misyar marriage partner with full transparency about circumstances."
        canonical="/auth"
        noIndex={true}
      />
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-rose-lg p-8 text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full gradient-rose flex items-center justify-center shadow-rose-lg">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
            </div>

            <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">
              Welcome to MisyarMatch
            </h1>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              The world's first dedicated misyar marriage platform. Sign in to find your halal misyar partner.
            </p>

            {/* Sign in button */}
            <a
              href={getLoginUrl()}
              className="flex items-center justify-center gap-3 w-full bg-white border-2 border-gray-200 hover:border-rose-300 rounded-xl py-3.5 px-6 font-medium text-gray-700 hover:text-rose-700 transition-all shadow-sm hover:shadow-rose group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </a>

            <div className="mt-6 space-y-3">
              {[
                { icon: Shield, text: "Sisters join free forever — no exceptions" },
                { icon: CheckCircle, text: "Circumstances shown upfront — no hidden agendas" },
                { icon: Heart, text: "Mutual interest required before any contact" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-left">
                  <item.icon className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-gray-400">
              By signing in, you confirm you are 18+ and a Muslim adult seeking halal misyar nikah.
            </p>
          </div>

          <p className="text-center text-rose-200 text-sm mt-4">
            <a href="/" className="hover:text-white transition-colors">← Back to MisyarMatch</a>
          </p>
        </div>
      </div>
    </>
  );
}
