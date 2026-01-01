'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to newsletter API
    setSubscribed(true);
  };

  return (
    <footer className="text-white">
      {/* Level 1: Newsletter - lightest dark */}
      <div className="bg-[#1f1f1f]">
        <div className="container mx-auto px-6 lg:px-16 py-16">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-4">
              Field Notes
            </p>
            <h3 className="font-serif text-2xl mb-4">
              Stories delivered
            </h3>
            <p className="text-sm text-white/50 mb-6">
              Occasional dispatches from the archive. No spam, unsubscribe anytime.
            </p>
            {subscribed ? (
              <p className="text-sm text-white/70">Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50"
                />
                <button
                  type="submit"
                  className="text-xs tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Level 2: Links - darker */}
      <div className="bg-[#161616]">
        <div className="container mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-xl tracking-[0.2em] uppercase text-white/90 hover:text-white transition-colors">
              The Red Cardamom
            </Link>
            <p className="text-xs text-white/40 mt-4 leading-relaxed">
              Food as history, chemistry, diplomacy, and hospitality. From Namibia to China.
            </p>
          </div>

          {/* Categories */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">
              Territory
            </p>
            <ul className="space-y-2">
              {['Origins', 'Routes', 'Chemistry', 'Wars', 'Rituals', 'Hospitality'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/stories?category=${cat}`}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">
              About
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-sm text-white/50 hover:text-white transition-colors">
                  All Stories
                </Link>
              </li>
              <li>
                <a 
                  href="https://dancingwithlions.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  Dancing with Lions
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">
              Legal
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/info/privacy" className="text-sm text-white/50 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/info/terms" className="text-sm text-white/50 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/info/disclaimer" className="text-sm text-white/50 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/info/intellectual-property" className="text-sm text-white/50 hover:text-white transition-colors">
                  Intellectual Property
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Level 3: Legal - darkest (near black) */}
      <div className="bg-[#0e0e0e]">
        <div className="container mx-auto px-6 lg:px-16 py-6">
          {/* Legal links row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4">
            <Link href="/info/privacy" className="text-xs text-white/50 hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/info/terms" className="text-xs text-white/50 hover:text-white/80 transition-colors">
              Terms of Service
            </Link>
            <Link href="/info/disclaimer" className="text-xs text-white/50 hover:text-white/80 transition-colors">
              Disclaimer
            </Link>
            <Link href="/info/intellectual-property" className="text-xs text-white/50 hover:text-white/80 transition-colors">
              Intellectual Property
            </Link>
            
            {/* Separator */}
            <span className="text-white/20">|</span>
            
            {/* Language selector */}
            <button className="text-xs text-white/50 hover:text-white/80 transition-colors flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="6.5" />
                <line x1="1.5" y1="8" x2="14.5" y2="8" />
                <path d="M8 1.5C6 4 6 12 8 14.5" />
                <path d="M8 1.5C10 4 10 12 8 14.5" />
              </svg>
              English
            </button>
          </div>
          
          {/* Copyright */}
          <p className="text-center text-xs text-white/40">
            © {new Date().getFullYear()} The Red Cardamom. All rights reserved.
          </p>
          
          {/* Parent brand */}
          <p className="text-center text-xs text-white/30 mt-2">
            A{' '}
            <a 
              href="https://dancingwithlions.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              Dancing with Lions
            </a>
            {' '}publication
          </p>
        </div>
      </div>
    </footer>
  );
}
