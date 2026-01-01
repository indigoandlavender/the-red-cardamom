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

  // Parse classification tags
  const countries = story.country ? story.country.split(' / ') : [];
  const regions = story.region ? story.region.split(' / ') : [];
  const themes = story.theme ? story.theme.split(', ') : [];

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#1a1a1a]">
      {/* Hero with image */}
      <div className="relative">
        <Header />
        
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end">
          {story.heroImage ? (
            <Image
              src={story.heroImage}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#6b7c63] via-[#8a9a82] to-[#a8b8a0]" />
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/30 to-transparent" />
          
          {/* Title over image */}
          <div className="relative z-10 w-full pb-12 md:pb-16 text-white">
            <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs tracking-[0.2em] uppercase">
                {story.category && (
                  <Link 
                    href={`/stories?category=${encodeURIComponent(story.category)}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {story.category}
                  </Link>
                )}
                {story.readTime && (
                  <>
                    <span className="text-white/30">·</span>
                    <span className="text-white/40">{story.readTime} min</span>
                  </>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-4">
                {story.title}
              </h1>
              {story.subtitle && (
                <p className="text-lg md:text-xl text-white/70 font-serif italic max-w-2xl">
                  {story.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Article Body */}
      <article className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          {/* Body with The Facts */}
          <div className="prose">
            <StoryBody content={story.body} theFacts={story.the_facts} />
          </div>

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <>
              <hr className="border-black/10 my-16" />
              <Gallery images={galleryImages} />
            </>
          )}

          {/* Classification Tags */}
          {(regions.length > 0 || countries.length > 0 || themes.length > 0) && (
            <>
              <hr className="border-black/10 my-16" />
              <div className="space-y-4">
                {regions.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-[#888] mr-2">Region</span>
                    {regions.map((region) => (
                      <Link
                        key={region}
                        href={`/stories?region=${encodeURIComponent(region.trim())}`}
                        className="text-xs px-3 py-1.5 border border-black/10 text-[#666] hover:border-[#6b7c63] hover:text-[#6b7c63] transition-colors"
                      >
                        {region.trim()}
                      </Link>
                    ))}
                  </div>
                )}
                {countries.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-[#888] mr-2">Country</span>
                    {countries.map((country) => (
                      <Link
                        key={country}
                        href={`/stories?country=${encodeURIComponent(country.trim())}`}
                        className="text-xs px-3 py-1.5 border border-black/10 text-[#666] hover:border-[#6b7c63] hover:text-[#6b7c63] transition-colors"
                      >
                        {country.trim()}
                      </Link>
                    ))}
                  </div>
                )}
                {themes.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-[#888] mr-2">Themes</span>
                    {themes.map((theme) => (
                      <Link
                        key={theme}
                        href={`/stories?theme=${encodeURIComponent(theme.trim())}`}
                        className="text-xs px-3 py-1.5 border border-black/10 text-[#666] hover:border-[#6b7c63] hover:text-[#6b7c63] transition-colors"
                      >
                        {theme.trim()}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Sources */}
          {sources.length > 0 && (
            <>
              <hr className="border-black/10 my-16" />
              <div className="text-sm">
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#888] mb-5">Sources</h3>
                <ul className="space-y-2">
                  {sources.map((source, index) => (
                    <li key={index} className="font-serif text-[#666]">{source}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Attribution Footer */}
          <hr className="border-black/10 my-16" />
          <footer className="text-sm text-[#888] flex flex-wrap gap-x-6 gap-y-1">
            {story.textBy && <span>Text — {story.textBy}</span>}
            {story.imagesBy && <span>Images — {story.imagesBy}</span>}
            {story.year && <span>{story.year}</span>}
          </footer>

          {/* Back Link */}
          <div className="mt-16">
            <Link
              href="/stories"
              className="inline-flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-[#6b7c63] hover:text-[#1a1a1a] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="10,3 5,8 10,13" />
              </svg>
              All Stories
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
