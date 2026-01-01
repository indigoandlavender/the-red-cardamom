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
    <main className="min-h-screen bg-white">
      {/* CINEMATIC FULL-BLEED HERO */}
      <div className="relative">
        <Header />
        
        {/* Full viewport cinematic hero - widescreen */}
        <section className="relative h-[75vh] md:h-[85vh] lg:h-[90vh] w-full overflow-hidden">
          {story.heroImage ? (
            <Image
              src={story.heroImage}
              alt={story.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-black" />
          )}
          
          {/* Cinematic gradient overlay - darker at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Title positioned at bottom - cinematic style */}
          <div className="absolute bottom-0 left-0 right-0 z-10 text-white">
            <div className="container mx-auto px-6 lg:px-16 pb-16 md:pb-20 lg:pb-24">
              {/* Category + Read time */}
              <div className="flex flex-wrap items-center gap-3 mb-6 text-xs tracking-[0.25em] uppercase">
                {story.category && (
                  <Link 
                    href={`/stories?category=${encodeURIComponent(story.category)}`}
                    className="text-white/70 hover:text-white transition-colors font-medium"
                  >
                    {story.category}
                  </Link>
                )}
                {story.readTime && (
                  <>
                    <span className="text-white/30">—</span>
                    <span className="text-white/50">{story.readTime} min read</span>
                  </>
                )}
              </div>
              
              {/* Title - Playfair Display, cinematic large */}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6 max-w-5xl">
                {story.title}
              </h1>
              
              {/* Subtitle */}
              {story.subtitle && (
                <p className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-2xl font-light tracking-wide">
                  {story.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Article Body */}
      <article className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Body with The Facts */}
          <div className="prose">
            <StoryBody content={story.body} theFacts={story.the_facts} />
          </div>

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <hr className="border-black my-16" />
              <Gallery images={galleryImages} />
            </div>
          )}

          {/* Classification Tags */}
          {(regions.length > 0 || countries.length > 0 || themes.length > 0) && (
            <div className="max-w-3xl mx-auto">
              <hr className="border-black my-16" />
              <div className="space-y-4">
                {regions.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase font-semibold text-black mr-2">Region</span>
                    {regions.map((region) => (
                      <Link
                        key={region}
                        href={`/stories?region=${encodeURIComponent(region.trim())}`}
                        className="text-xs px-3 py-1.5 border border-black text-black hover:bg-black hover:text-white transition-colors"
                      >
                        {region.trim()}
                      </Link>
                    ))}
                  </div>
                )}
                {countries.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase font-semibold text-black mr-2">Country</span>
                    {countries.map((country) => (
                      <Link
                        key={country}
                        href={`/stories?country=${encodeURIComponent(country.trim())}`}
                        className="text-xs px-3 py-1.5 border border-black text-black hover:bg-black hover:text-white transition-colors"
                      >
                        {country.trim()}
                      </Link>
                    ))}
                  </div>
                )}
                {themes.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase font-semibold text-black mr-2">Themes</span>
                    {themes.map((theme) => (
                      <Link
                        key={theme}
                        href={`/stories?theme=${encodeURIComponent(theme.trim())}`}
                        className="text-xs px-3 py-1.5 border border-black text-black hover:bg-black hover:text-white transition-colors"
                      >
                        {theme.trim()}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sources */}
          {sources.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <hr className="border-black my-16" />
              <div className="text-sm">
                <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-black mb-5">Sources</h3>
                <ul className="space-y-2">
                  {sources.map((source, index) => (
                    <li key={index} className="text-black">{source}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Attribution Footer */}
          <div className="max-w-3xl mx-auto">
            <hr className="border-black my-16" />
            <footer className="text-sm text-black flex flex-wrap gap-x-6 gap-y-1">
              {story.textBy && <span>Text — {story.textBy}</span>}
              {story.imagesBy && <span>Images — {story.imagesBy}</span>}
              {story.year && <span>{story.year}</span>}
            </footer>

            {/* Back Link */}
            <div className="mt-16">
              <Link
                href="/stories"
                className="inline-flex items-center gap-3 text-xs tracking-[0.15em] uppercase font-semibold text-black hover:opacity-60 transition-opacity"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="10,3 5,8 10,13" />
                </svg>
                All Stories
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
