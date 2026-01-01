'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 lg:px-16 py-6">
        <div className="flex items-center justify-between">
          {/* Logo - Instrument Serif, wide tracking, breathable */}
          <Link 
            href="/" 
            className="font-serif text-lg md:text-xl tracking-[0.35em] uppercase text-white hover:opacity-70 transition-opacity"
          >
            The Red Cardamom
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link 
              href="/stories" 
              className="text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
            >
              Stories
            </Link>
            <Link 
              href="/about" 
              className="text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button - Kinfolk style hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="22" y2="22" />
                  <line x1="22" y1="6" x2="6" y2="22" />
                </>
              ) : (
                <>
                  <line x1="4" y1="9" x2="24" y2="9" />
                  <line x1="4" y1="19" x2="24" y2="19" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col gap-6">
                <Link 
                  href="/stories" 
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors"
                >
                  Stories
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
