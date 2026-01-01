import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getStories, getStoryBySlug, getStoryImages, getRecipesByStory } from '@/lib/sheets';
import StoryBody from '@/components/StoryBody';
import Gallery from '@/components/Gallery';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const story = await getStoryBySlug(params.slug);
  if (!story) return { title: 'Story Not Found' };
  
  const title = `${story.title} | The Red Cardamom`;
  const description = story.excerpt || story.subtitle || story.title;
  
  return {
    title: story.title,
    description,
    openGraph: {
      title,
      description,
      images: story.heroImage ? [{ url: story.heroImage }] : undefined,
    },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const story = await getStoryBySlug(params.slug);
  
  if (!story) {
    notFound();
  }

  const [galleryImages, recipes] = await Promise.all([
    getStoryImages(params.slug),
    getRecipesByStory(params.slug),
  ]);

  // Parse sources (separated by ;;)
  const sources = story.sources
    ? story.sources.split(';;').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Category & Read Time - CNN style */}
      <div className="pt-8 pb-4">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm">
            {story.category && (
              <Link 
                href={`/stories?category=${encodeURIComponent(story.category)}`}
                className="text-[#8b4d3b] font-medium hover:underline"
              >
                {story.category}
              </Link>
            )}
            {story.readTime && (
              <>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{story.readTime} min read</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Title - CNN style: big, bold, black */}
      <header className="pb-6">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-black mb-4">
            {story.title}
          </h1>
          {story.subtitle && (
            <p className="text-xl text-gray-700 leading-relaxed">
              {story.subtitle}
            </p>
          )}
        </div>
      </header>

      {/* Author & Date - CNN style */}
      <div className="pb-6">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-sm text-gray-600">
            {story.textBy && <span>By <span className="font-medium text-black">{story.textBy}</span></span>}
            {story.year && <span className="ml-4">{story.year}</span>}
          </div>
        </div>
      </div>

      {/* Hero Image - Full width like CNN */}
      {story.heroImage && (
        <figure className="mb-8">
          <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto">
            <Image
              src={story.heroImage}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {story.heroCaption && (
            <figcaption className="max-w-3xl mx-auto px-6 mt-3 text-sm text-gray-600">
              {story.heroCaption}
              {story.imagesBy && <span className="text-gray-400"> — {story.imagesBy}</span>}
            </figcaption>
          )}
        </figure>
      )}

      {/* Article Body - CNN style: clean, readable */}
      <article className="pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose">
            <StoryBody content={story.body} theFacts={story.the_facts} />
          </div>
        </div>
      </article>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-8 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-6">
            <Gallery images={galleryImages} />
          </div>
        </section>
      )}

      {/* Sources - Simple list */}
      {sources.length > 0 && (
        <section className="py-8 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-black mb-4">Sources</h3>
            <ul className="space-y-2">
              {sources.map((source, index) => (
                <li key={index} className="text-sm text-gray-700">{source}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Back Link */}
      <div className="py-8 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#8b4d3b] hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="10,3 5,8 10,13" />
            </svg>
            All Stories
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
