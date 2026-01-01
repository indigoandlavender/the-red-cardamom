import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for The Red Cardamom',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-black/70 mb-6">Last updated: January 2026</p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Acceptance of Terms</h2>
          <p className="text-black/80 mb-4">
            By accessing and using The Red Cardamom, you accept and agree to be bound by these Terms of Service.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Use of Content</h2>
          <p className="text-black/80 mb-4">
            All content on this site is for informational purposes only. You may read, share, and link to our content for personal, non-commercial use. Commercial use requires written permission.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Accuracy of Information</h2>
          <p className="text-black/80 mb-4">
            We strive to ensure the accuracy of historical and cultural information presented. However, we cannot guarantee that all information is complete or current. Stories often draw from multiple sources and interpretations.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">External Links</h2>
          <p className="text-black/80 mb-4">
            Our site may contain links to external websites. We are not responsible for the content or practices of linked sites.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Changes to Terms</h2>
          <p className="text-black/80 mb-4">
            We may update these terms from time to time. Continued use of the site constitutes acceptance of any changes.
          </p>
        </div>
      </div>
    </main>
  );
}
