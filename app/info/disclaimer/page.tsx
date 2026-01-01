import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for The Red Cardamom',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Disclaimer</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-black/70 mb-6">Last updated: January 2026</p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Editorial Content</h2>
          <p className="text-black/80 mb-4">
            The Red Cardamom is an independent publication exploring food history, chemistry, and cultural significance. Our stories are editorial in nature and reflect research and interpretation by our writers.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Historical Information</h2>
          <p className="text-black/80 mb-4">
            Historical accounts often vary across sources. We draw from multiple references and scholarly work, but acknowledge that historical truth can be complex and contested.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Not Professional Advice</h2>
          <p className="text-black/80 mb-4">
            Content on this site is not intended as professional advice regarding cooking, health, nutrition, or travel. Always consult appropriate professionals for specific guidance.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Photography</h2>
          <p className="text-black/80 mb-4">
            Some images on this site are AI-generated for illustrative purposes. These images are intended to evoke atmosphere and context, not to document specific people or places.
          </p>
        </div>
      </div>
    </main>
  );
}
