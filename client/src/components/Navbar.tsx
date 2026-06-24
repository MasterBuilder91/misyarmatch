import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Bell, Heart, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";

export function Navbar() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { t, isRTL } = useLanguage();

  const { data: unreadData } = trpc.notifications.unreadCount.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
    refetchInterval: 30_000,
  });

  const { data: profile } = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  const unreadCount = unreadData?.count ?? 0;

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/browse", label: t("nav.browse") },
    { href: "/what-is-misyar", label: t("nav.whatIsMisyar") },
    { href: "/pricing", label: t("nav.pricing") },
  ];

  const authLinks = isAuthenticated
    ? [
        { href: "/matches", label: t("nav.matches"), icon: Heart },
        { href: "/messages", label: t("nav.messages"), icon: MessageCircle },
        { href: "/who-liked-me", label: "Who Liked Me", icon: Heart },
      ]
    : [];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full gradient-rose flex items-center justify-center shadow-rose">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-serif font-bold text-xl text-rose-900 group-hover:text-rose-700 transition-colors">
              MisyarMatch
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-rose-700 bg-rose-50"
                    : "text-gray-600 hover:text-rose-700 hover:bg-rose-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  location === link.href
                    ? "text-rose-700 bg-rose-50"
                    : "text-gray-600 hover:text-rose-700 hover:bg-rose-50"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <LanguageToggle />

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Link href="/notifications" className="relative p-2 rounded-lg text-gray-600 hover:text-rose-700 hover:bg-rose-50 transition-colors">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Link>

                {/* Profile avatar */}
                <Link href={profile ? `/profile/${user?.id}` : "/profile/create"}>
                  <div className="w-8 h-8 rounded-full bg-rose-100 border-2 border-rose-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-rose-400 transition-colors">
                    {profile?.photoUrl ? (
                      <img
                        src={profile.photoUrl}
                        alt={profile.displayName ?? "Profile"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-rose-700 font-bold text-sm">
                        {(user?.name ?? "?")[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { logout(); }}
                  className="hidden md:flex text-gray-500 hover:text-rose-700"
                >
                  {t("nav.signOut")}
                </Button>
              </>
            ) : (
              <Button
                asChild
                size="sm"
                className="gradient-rose text-white border-0 shadow-rose hover:opacity-90"
              >
                <a href={getLoginUrl()}>{t("nav.signIn")}</a>
              </Button>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-rose-700 hover:bg-rose-50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-rose-100 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-rose-700 bg-rose-50"
                    : "text-gray-700 hover:text-rose-700 hover:bg-rose-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-rose-700 bg-rose-50"
                    : "text-gray-700 hover:text-rose-700 hover:bg-rose-50"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); }}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-rose-700 hover:bg-rose-50"
              >
                {t("nav.signOut")}
              </button>
            ) : (
              <div className="px-4 pt-2">
                <Button asChild className="w-full gradient-rose text-white border-0">
                  <a href={getLoginUrl()}>{t("nav.signIn")}</a>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
