import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for The Red Cardamom',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-black/70 mb-6">Last updated: January 2026</p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Information We Collect</h2>
          <p className="text-black/80 mb-4">
            When you subscribe to our newsletter, we collect your email address. We use cookies and similar technologies to understand how you use our site and to improve your experience.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">How We Use Your Information</h2>
          <p className="text-black/80 mb-4">
            We use the information we collect to send you our newsletter, respond to your inquiries, and improve our content and services.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Data Sharing</h2>
          <p className="text-black/80 mb-4">
            We do not sell your personal information. We may share your information with service providers who help us operate our website and send newsletters.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Your Rights</h2>
          <p className="text-black/80 mb-4">
            You can unsubscribe from our newsletter at any time by clicking the unsubscribe link in any email. You may also contact us to request access to, correction of, or deletion of your personal information.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Contact</h2>
          <p className="text-black/80 mb-4">
            For privacy-related inquiries, please contact us through Dancing with Lions.
          </p>
        </div>
      </div>
    </main>
  );
}
