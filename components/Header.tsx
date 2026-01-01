'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-lg font-bold text-black hover:text-[#8b4d3b] transition-colors"
          >
            The Red Cardamom
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/stories" 
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              Stories
            </Link>
            <Link 
              href="/map" 
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              Map
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-black"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </>
              ) : (
                <>
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-100 mt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/stories" 
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Stories
              </Link>
              <Link 
                href="/map" 
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Map
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
