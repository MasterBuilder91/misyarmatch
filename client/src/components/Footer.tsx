import { Heart } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer style={{background:"#0D0B14"}} className="text-gray-400 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full gradient-rose flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="font-serif font-bold text-lg text-white">MisyarMatch</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The world's first dedicated misyar marriage platform. No games. No pretending. Just halal.
            </p>
            <p className="text-xs text-gray-500 mt-3">
              <a href="mailto:president@misyarmatch.net" className="hover:text-[#B8965A] transition-colors">
                president@misyarmatch.net
              </a>
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/browse" className="hover:text-[#B8965A] transition-colors">Browse Members</Link></li>
              <li><Link href="/auth" className="hover:text-[#B8965A] transition-colors">Sign In</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-[#B8965A] transition-colors">Blog & Articles</Link></li>
              <li><Link href="/what-is-misyar" className="hover:text-[#B8965A] transition-colors">What Is Misyar?</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#B8965A] transition-colors">How It Works</Link></li>
              <li><Link href="/why-misyar-works" className="hover:text-[#B8965A] transition-colors">Why Misyar Works</Link></li>
              <li><Link href="/you-do-misyar-already" className="hover:text-[#B8965A] transition-colors">You Already Practice Misyar</Link></li>
              <li><Link href="/faq" className="hover:text-[#B8965A] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Trust & Safety</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/safety" className="hover:text-[#B8965A] transition-colors">Safety Centre</Link></li>
              <li>
                <a href="mailto:president@misyarmatch.net" className="hover:text-[#B8965A] transition-colors">
                  Report a Concern
                </a>
              </li>
              <li>
                <a href="mailto:president@misyarmatch.net" className="hover:text-[#B8965A] transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} MisyarMatch · misyarmatch.net · All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center">
            This platform is for serious adult Muslims seeking halal misyar nikah.
            Sisters join free, always.
          </p>
        </div>
      </div>
    </footer>
  );
}
