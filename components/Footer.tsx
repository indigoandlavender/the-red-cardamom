import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1614] text-white/80">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              {/* Cardamom pod icon */}
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="14" cy="14" rx="6" ry="10" stroke="#c4632d" strokeWidth="1.5" fill="none"/>
                <line x1="14" y1="4" x2="14" y2="24" stroke="#c4632d" strokeWidth="1"/>
                <ellipse cx="14" cy="8" rx="2" ry="1" fill="#c4632d"/>
                <ellipse cx="14" cy="14" rx="2" ry="1" fill="#c4632d"/>
                <ellipse cx="14" cy="20" rx="2" ry="1" fill="#c4632d"/>
              </svg>
              <span className="font-serif text-lg font-bold text-white">
                The Red Cardamom
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              Food history, chemistry, and hospitality from Namibia to China. 
              The stories behind what we eat — where it came from, who fought for it, 
              why it matters.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-white/40 mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/stories?category=Origins" className="hover:text-white transition-colors">Origins</Link></li>
              <li><Link href="/stories?category=Routes" className="hover:text-white transition-colors">Routes</Link></li>
              <li><Link href="/stories?category=Chemistry" className="hover:text-white transition-colors">Chemistry</Link></li>
              <li><Link href="/stories?category=Wars" className="hover:text-white transition-colors">Wars</Link></li>
              <li><Link href="/stories?category=Rituals" className="hover:text-white transition-colors">Rituals</Link></li>
              <li><Link href="/stories?category=Hospitality" className="hover:text-white transition-colors">Hospitality</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-white/40 mb-4">
              About
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} The Red Cardamom. A Dancing with Lions publication.
          </p>
          <p className="text-xs text-white/40">
            Marrakech
          </p>
        </div>
      </div>
    </footer>
  );
}
