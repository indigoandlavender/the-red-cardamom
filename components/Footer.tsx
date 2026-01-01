import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white">
      {/* Newsletter Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
              Field Notes
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Stories delivered
            </h2>
            <p className="text-white/50 mb-8">
              New essays on food history, chemistry, and hospitality. 
              No recipes. No spam. Just the stories.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-b border-white/20 py-3 px-0 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 border border-white/20 text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 py-16">
          <div className="grid md:grid-cols-12 gap-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <Link href="/" className="inline-flex items-center gap-3 mb-6">
                {/* Cardamom pod icon */}
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="14" cy="14" rx="6" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-white/40"/>
                  <line x1="14" y1="4" x2="14" y2="24" stroke="currentColor" strokeWidth="1" className="text-white/40"/>
                  <ellipse cx="14" cy="8" rx="2" ry="1" fill="currentColor" className="text-white/40"/>
                  <ellipse cx="14" cy="14" rx="2" ry="1" fill="currentColor" className="text-white/40"/>
                  <ellipse cx="14" cy="20" rx="2" ry="1" fill="currentColor" className="text-white/40"/>
                </svg>
                <span className="text-xs tracking-[0.2em] uppercase text-white/70">
                  The Red Cardamom
                </span>
              </Link>
              <p className="text-sm text-white/40 max-w-sm leading-relaxed">
                Food history, chemistry, and hospitality from Namibia to China. 
                Where ingredients came from, who fought for them, why they matter.
              </p>
            </div>

            {/* Categories */}
            <div className="md:col-span-3">
              <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
                Territory
              </h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/stories?category=Origins" className="text-white/50 hover:text-white transition-colors">Origins</Link></li>
                <li><Link href="/stories?category=Routes" className="text-white/50 hover:text-white transition-colors">Routes</Link></li>
                <li><Link href="/stories?category=Chemistry" className="text-white/50 hover:text-white transition-colors">Chemistry</Link></li>
                <li><Link href="/stories?category=Wars" className="text-white/50 hover:text-white transition-colors">Wars</Link></li>
                <li><Link href="/stories?category=Rituals" className="text-white/50 hover:text-white transition-colors">Rituals</Link></li>
                <li><Link href="/stories?category=Hospitality" className="text-white/50 hover:text-white transition-colors">Hospitality</Link></li>
              </ul>
            </div>

            {/* About */}
            <div className="md:col-span-2">
              <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
                About
              </h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-white/50 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-white/50 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="md:col-span-2">
              <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
                Legal
              </h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="text-white/50 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-white/50 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/intellectual-property" className="text-white/50 hover:text-white transition-colors">IP</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {currentYear} The Red Cardamom
          </p>
          <p className="text-xs text-white/30">
            A <Link href="https://dancingwithlions.com" className="hover:text-white/50 transition-colors">Dancing with Lions</Link> publication · Marrakech
          </p>
        </div>
      </div>
    </footer>
  );
}
