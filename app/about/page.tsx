import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About',
  description: 'The Red Cardamom documents food history, chemistry, and hospitality from Namibia to China.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Hero - Full viewport */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}} />
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-12">
            The Red Cardamom
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-12">
            The stories behind what we eat shape the stories of who we are
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-serif italic max-w-2xl mx-auto">
            Food history, chemistry, and hospitality from Namibia to China
          </p>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
        </div>
      </section>

      {/* The Thesis - Two column */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto">
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                The Thesis
              </p>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight text-white/90">
                Food is never just food.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-white/60 leading-relaxed text-lg">
              <p>
                It is compressed history, encoded chemistry, portable wealth, and sometimes — a weapon.
              </p>
              <p>
                The nutmeg that flavors your eggnog was once worth more than gold. Men killed for it. 
                Nations traded entire islands for it. Manhattan was swapped for a nutmeg plantation 
                in 1667, and the Dutch thought they got the better deal.
              </p>
              <p>
                The coffee you drink each morning exists because Ethiopian goats wouldn't sleep. 
                The tea in your cupboard sparked two wars and addicted a nation. The salt on your 
                table once sealed contracts more binding than any signature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="py-20 md:py-28 bg-[#0d0d0d]">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl text-center">
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-white/70 italic">
            "Every meal is a negotiation with the dead — the ancestors who selected these seeds, 
            who walked these trade routes, who decided what was sacred."
          </p>
        </div>
      </section>

      {/* What This Is - Categories */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-16 text-center">
            What This Is
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            <div>
              <h3 className="font-serif text-xl text-white/90 mb-3">Origins</h3>
              <p className="text-white/50">Where things came from, and who discovered them</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-white/90 mb-3">Routes</h3>
              <p className="text-white/50">How food moved: by camel, by ship, by theft</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-white/90 mb-3">Chemistry</h3>
              <p className="text-white/50">Why things work: fermentation, Maillard, capsaicin</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-white/90 mb-3">Wars</h3>
              <p className="text-white/50">What people killed for: nutmeg, tea, salt, sugar</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-white/90 mb-3">Rituals</h3>
              <p className="text-white/50">How food is eaten: ceremony, timing, meaning</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-white/90 mb-3">Hospitality</h3>
              <p className="text-white/50">The laws of the table: guest rights, salt covenants</p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Is Not */}
      <section className="py-24 md:py-32 bg-[#0d0d0d]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
                  What This Is Not
                </p>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight text-white/90">
                  Not a recipe blog. Not a listicle. Not travel writing.
                </h2>
              </div>
              <div className="space-y-6 text-white/50 leading-relaxed">
                <p>
                  Recipes appear occasionally as punctuation — a flourish at the end of a story, 
                  not the point of it.
                </p>
                <p>
                  We don't tell you where to eat. We tell you why what you're eating exists at all.
                </p>
                <p>
                  No "10 Spices That Changed History." We go deep on single subjects: one story, 
                  one ingredient, one war, one covenant at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Territory */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">
            The Territory
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white/90 mb-12">
            Our geography follows the ancient trade routes
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <span className="text-white/20 font-serif text-4xl">→</span>
              <div>
                <h3 className="font-serif text-xl text-white/80 mb-1">The Salt Road</h3>
                <p className="text-white/50">From the Sahara through Timbuktu to the Mediterranean</p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="text-white/20 font-serif text-4xl">→</span>
              <div>
                <h3 className="font-serif text-xl text-white/80 mb-1">The Spice Road</h3>
                <p className="text-white/50">From the Moluccas through India to Venice</p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="text-white/20 font-serif text-4xl">→</span>
              <div>
                <h3 className="font-serif text-xl text-white/80 mb-1">The Silk Road</h3>
                <p className="text-white/50">From China through Central Asia to Constantinople</p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="text-white/20 font-serif text-4xl">→</span>
              <div>
                <h3 className="font-serif text-xl text-white/80 mb-1">The Coffee Route</h3>
                <p className="text-white/50">From Ethiopia through Yemen to the world</p>
              </div>
            </div>
          </div>

          <p className="text-white/50 mt-12 leading-relaxed">
            This means stories from Iran, Uzbekistan, Afghanistan, Pakistan, Yemen, Ethiopia, 
            Morocco, India, Indonesia, China — wherever the stories lead.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-40 bg-[#0d0d0d] border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">
            A Dancing with Lions Publication
          </p>
          <p className="text-white/50 leading-relaxed text-lg mb-12">
            The Red Cardamom is part of the{' '}
            <a href="https://dancingwithlions.com" className="text-white/70 hover:text-white transition-colors underline underline-offset-4">
              Dancing with Lions
            </a>{' '}
            ecosystem — cultural intelligence publications documenting traditional knowledge systems 
            across Africa, the Middle East, and Asia.
          </p>
          <p className="text-white/30 text-sm mb-16">
            Written and edited in Marrakech.
          </p>
          <Link
            href="/stories"
            className="inline-block border border-white/20 px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors"
          >
            Enter the Archive
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
