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
    <main className="min-h-screen bg-[var(--background)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 max-w-3xl">
            The stories behind what we eat
          </h1>
          <p className="text-xl text-[var(--muted)] font-serif italic max-w-2xl">
            Food history, chemistry, and hospitality from Namibia to China
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose">
            <p>
              Food is never just food. It is compressed history, encoded chemistry, portable wealth, 
              and sometimes — a weapon.
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

            <h2>What This Is</h2>

            <p>
              <strong>The Red Cardamom</strong> documents the history, chemistry, and hospitality 
              of food across the Salt Road and Spice Road territories — from Namibia to China, 
              following the routes of traders, conquerors, and cooks.
            </p>

            <p>
              We tell stories about:
            </p>

            <ul>
              <li><strong>Origins</strong> — Where things came from, and who discovered them</li>
              <li><strong>Routes</strong> — How food moved: by camel, by ship, by theft</li>
              <li><strong>Chemistry</strong> — Why things work: fermentation, Maillard, capsaicin</li>
              <li><strong>Wars</strong> — What people killed for: nutmeg, tea, salt, sugar</li>
              <li><strong>Rituals</strong> — How food is eaten: ceremony, timing, meaning</li>
              <li><strong>Lies</strong> — The stories traders told to protect their sources</li>
              <li><strong>Hospitality</strong> — The laws of the table: guest rights, salt covenants</li>
            </ul>

            <h2>What This Is Not</h2>

            <p>
              This is not a recipe blog. Recipes appear occasionally as punctuation — a flourish 
              at the end of a story, not the point of it.
            </p>

            <p>
              This is not travel writing. We don't tell you where to eat. We tell you why what 
              you're eating exists at all.
            </p>

            <p>
              This is not a listicle. No "10 Spices That Changed History." We go deep on single 
              subjects: one story, one ingredient, one war, one covenant at a time.
            </p>

            <h2>The Territory</h2>

            <p>
              Our geography follows the ancient trade routes:
            </p>

            <ul>
              <li>The Salt Road — from the Sahara through Timbuktu to the Mediterranean</li>
              <li>The Spice Road — from the Moluccas through India to Venice</li>
              <li>The Silk Road — from China through Central Asia to Constantinople</li>
              <li>The Coffee Route — from Ethiopia through Yemen to the world</li>
            </ul>

            <p>
              This means stories from Iran, Uzbekistan, Afghanistan, Pakistan, Yemen, Ethiopia, 
              Morocco, India, Indonesia, China — wherever the stories lead.
            </p>

            <h2>A Dancing with Lions Publication</h2>

            <p>
              The Red Cardamom is part of the <a href="https://dancingwithlions.com">Dancing with Lions</a> ecosystem — 
              cultural intelligence publications documenting traditional knowledge systems across 
              Africa, the Middle East, and Asia.
            </p>

            <p>
              Written and edited in Marrakech.
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="10,3 5,8 10,13" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
