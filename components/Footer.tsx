import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
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
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50"
              />
              <button
                type="submit"
                className="text-xs tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand - Instrument Serif masthead */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-xl tracking-[0.12em] text-white/90 hover:text-white transition-colors">
              The Red Cardamom
            </Link>
            <p className="text-xs text-white/40 mt-4 leading-relaxed">
              Food history, chemistry, and hospitality from Namibia to China.
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
                  Stories
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
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/info/terms" className="text-sm text-white/50 hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>© {new Date().getFullYear()} The Red Cardamom</p>
            <p>
              A{' '}
              <a 
                href="https://dancingwithlions.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/60 transition-colors"
              >
                Dancing with Lions
              </a>
              {' '}publication
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
