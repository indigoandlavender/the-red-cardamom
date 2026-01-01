import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intellectual Property',
  description: 'Intellectual property information for The Red Cardamom',
};

export default function IntellectualPropertyPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Intellectual Property</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-black/70 mb-6">Last updated: January 2026</p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Ownership</h2>
          <p className="text-black/80 mb-4">
            All original content on The Red Cardamom, including text, design, and commissioned imagery, is the property of Dancing with Lions and is protected by copyright law.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Permitted Use</h2>
          <p className="text-black/80 mb-4">
            You may share links to our stories and quote brief excerpts with proper attribution. Please credit "The Red Cardamom" and include a link to the original story.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Prohibited Use</h2>
          <p className="text-black/80 mb-4">
            You may not reproduce, distribute, or republish our content in full without written permission. You may not use our content for commercial purposes or in any way that misrepresents the source.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Images</h2>
          <p className="text-black/80 mb-4">
            Images on this site may not be downloaded, copied, or used without permission. Some images are AI-generated; others are commissioned photography. Contact us for licensing inquiries.
          </p>
          
          <h2 className="font-serif text-2xl mt-10 mb-4">Contact</h2>
          <p className="text-black/80 mb-4">
            For permissions, licensing, or intellectual property inquiries, please contact us through Dancing with Lions.
          </p>
        </div>
      </div>
    </main>
  );
}
