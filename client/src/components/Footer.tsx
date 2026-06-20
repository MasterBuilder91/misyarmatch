import { Heart } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
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
              The UK's most honest Islamic marriage platform. No games. No pretending. Just halal.
            </p>
            <p className="text-xs text-gray-500 mt-3">
              <a href="mailto:support@misyarmatch.net" className="hover:text-rose-400 transition-colors">
                support@misyarmatch.net
              </a>
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/browse" className="hover:text-rose-400 transition-colors">Browse Members</Link></li>
              <li><Link href="/speed-chat" className="hover:text-rose-400 transition-colors">Speed Chat</Link></li>
              <li><Link href="/pricing" className="hover:text-rose-400 transition-colors">Pricing</Link></li>
              <li><Link href="/auth" className="hover:text-rose-400 transition-colors">Sign In</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/what-is-misyar" className="hover:text-rose-400 transition-colors">What Is Misyar?</Link></li>
              <li><Link href="/how-it-works" className="hover:text-rose-400 transition-colors">How It Works</Link></li>
              <li><Link href="/why-misyar-works" className="hover:text-rose-400 transition-colors">Why Misyar Works</Link></li>
              <li><Link href="/you-do-misyar-already" className="hover:text-rose-400 transition-colors">You Already Practice Misyar</Link></li>
              <li><Link href="/faq" className="hover:text-rose-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Trust & Safety</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/safety" className="hover:text-rose-400 transition-colors">Safety Centre</Link></li>
              <li>
                <a href="mailto:safety@misyarmatch.net" className="hover:text-rose-400 transition-colors">
                  Report a Concern
                </a>
              </li>
              <li>
                <a href="mailto:support@misyarmatch.net" className="hover:text-rose-400 transition-colors">
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
