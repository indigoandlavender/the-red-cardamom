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
    { label: 'Rituals', href: '/stories?category=Rituals' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="border-b border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Main header */}
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {/* Cardamom pod icon */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="14" cy="14" rx="6" ry="10" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
              <line x1="14" y1="4" x2="14" y2="24" stroke="var(--accent)" strokeWidth="1"/>
              <ellipse cx="14" cy="8" rx="2" ry="1" fill="var(--accent)"/>
              <ellipse cx="14" cy="14" rx="2" ry="1" fill="var(--accent)"/>
              <ellipse cx="14" cy="20" rx="2" ry="1" fill="var(--accent)"/>
            </svg>
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight">
              The Red Cardamom
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
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
          <nav className="md:hidden border-t border-[var(--border)] py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
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
