'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Stories', href: '/stories' },
    { label: 'Origins', href: '/stories?category=Origins' },
    { label: 'Routes', href: '/stories?category=Routes' },
    { label: 'Wars', href: '/stories?category=Wars' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Main header */}
        <div className="flex items-center justify-between py-6 md:py-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Cardamom pod icon */}
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="14" cy="14" rx="6" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-white/60 group-hover:text-white transition-colors"/>
              <line x1="14" y1="4" x2="14" y2="24" stroke="currentColor" strokeWidth="1" className="text-white/60 group-hover:text-white transition-colors"/>
              <ellipse cx="14" cy="8" rx="2" ry="1" fill="currentColor" className="text-white/60 group-hover:text-white transition-colors"/>
              <ellipse cx="14" cy="14" rx="2" ry="1" fill="currentColor" className="text-white/60 group-hover:text-white transition-colors"/>
              <ellipse cx="14" cy="20" rx="2" ry="1" fill="currentColor" className="text-white/60 group-hover:text-white transition-colors"/>
            </svg>
            <span className="text-xs tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors">
              The Red Cardamom
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs tracking-[0.1em] uppercase text-white/50 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10 py-4 -mx-6 px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-white/60 hover:text-white transition-colors text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
