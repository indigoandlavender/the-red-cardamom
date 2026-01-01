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
    <main className="min-h-screen bg-[#f7f5f0] text-[#1a1a1a]">
      {/* Hero with dark background */}
      <div className="bg-[#1a1a1a] text-white">
        <Header />
        <section className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="container mx-auto px-6 lg:px-16 text-center max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">
              The Red Cardamom
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-8">
              The stories behind what we eat shape the stories of who we are
            </h1>
            <p className="text-lg text-white/50 font-serif italic">
              Food history, chemistry, and hospitality from Namibia to China
            </p>
          </div>
        </section>
      </div>

      {/* The Thesis */}
      <section className="py-20 md:py-28 border-b border-black/10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 max-w-5xl mx-auto">
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.25em] uppercase text-[#6b7c63] mb-3">
                The Thesis
              </p>
              <h2 className="font-serif text-2xl md:text-3xl leading-tight">
                Food is never just food.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5 text-[#555] leading-relaxed">
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
      <section className="py-16 md:py-24 bg-[#efeee8]">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center">
          <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-[#444] italic">
            "Every meal is a negotiation with the dead — the ancestors who selected these seeds, 
            who walked these trade routes, who decided what was sacred."
          </p>
        </div>
      </section>

      {/* What This Is */}
      <section className="py-20 md:py-28 border-b border-black/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <p className="text-xs tracking-[0.25em] uppercase text-[#6b7c63] mb-12 text-center">
            What This Is
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="font-serif text-lg mb-2">Origins</h3>
              <p className="text-[#666] text-sm">Where things came from, and who discovered them</p>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-2">Routes</h3>
              <p className="text-[#666] text-sm">How food moved: by camel, by ship, by theft</p>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-2">Chemistry</h3>
              <p className="text-[#666] text-sm">Why things work: fermentation, Maillard, capsaicin</p>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-2">Wars</h3>
              <p className="text-[#666] text-sm">What people killed for: nutmeg, tea, salt, sugar</p>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-2">Rituals</h3>
              <p className="text-[#666] text-sm">How food is eaten: ceremony, timing, meaning</p>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-2">Hospitality</h3>
              <p className="text-[#666] text-sm">The laws of the table: guest rights, salt covenants</p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Is Not */}
      <section className="py-20 md:py-28 bg-[#efeee8]">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#6b7c63] mb-4">
                What This Is Not
              </p>
              <h2 className="font-serif text-2xl md:text-3xl leading-tight">
                Not a recipe blog. Not a listicle. Not travel writing.
              </h2>
            </div>
            <div className="space-y-5 text-[#555] leading-relaxed">
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
      </section>

      {/* The Territory */}
      <section className="py-20 md:py-28 border-b border-black/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <p className="text-xs tracking-[0.25em] uppercase text-[#6b7c63] mb-6">
            The Territory
          </p>
          <h2 className="font-serif text-2xl md:text-3xl mb-10">
            Our geography follows the ancient trade routes
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-5">
              <span className="text-[#6b7c63] font-serif text-2xl">→</span>
              <div>
                <h3 className="font-serif text-lg mb-1">The Salt Road</h3>
                <p className="text-[#666] text-sm">From the Sahara through Timbuktu to the Mediterranean</p>
              </div>
            </div>
            <div className="flex gap-5">
              <span className="text-[#6b7c63] font-serif text-2xl">→</span>
              <div>
                <h3 className="font-serif text-lg mb-1">The Spice Road</h3>
                <p className="text-[#666] text-sm">From the Moluccas through India to Venice</p>
              </div>
            </div>
            <div className="flex gap-5">
              <span className="text-[#6b7c63] font-serif text-2xl">→</span>
              <div>
                <h3 className="font-serif text-lg mb-1">The Silk Road</h3>
                <p className="text-[#666] text-sm">From China through Central Asia to Constantinople</p>
              </div>
            </div>
            <div className="flex gap-5">
              <span className="text-[#6b7c63] font-serif text-2xl">→</span>
              <div>
                <h3 className="font-serif text-lg mb-1">The Coffee Route</h3>
                <p className="text-[#666] text-sm">From Ethiopia through Yemen to the world</p>
              </div>
            </div>
          </div>

          <p className="text-[#666] mt-10 leading-relaxed">
            This means stories from Iran, Uzbekistan, Afghanistan, Pakistan, Yemen, Ethiopia, 
            Morocco, India, Indonesia, China — wherever the stories lead.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#6b7c63] mb-6">
            A Dancing with Lions Publication
          </p>
          <p className="text-[#666] leading-relaxed mb-10">
            The Red Cardamom is part of the{' '}
            <a href="https://dancingwithlions.com" className="text-[#6b7c63] hover:text-[#1a1a1a] transition-colors underline underline-offset-4">
              Dancing with Lions
            </a>{' '}
            ecosystem — cultural intelligence publications documenting traditional knowledge systems 
            across Africa, the Middle East, and Asia.
          </p>
          <p className="text-[#888] text-sm mb-12">
            Written and edited in Marrakech.
          </p>
          <Link
            href="/stories"
            className="inline-block border border-[#1a1a1a] px-10 py-4 text-xs tracking-[0.15em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-colors"
          >
            Enter the Archive
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
