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
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Full-bleed Hero Image */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end">
        {story.heroImage ? (
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#0a0a0a] to-[#0a0505]" />
        )}
        
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}} />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        
        {/* Title over image */}
        <div className="relative z-10 w-full pb-16 md:pb-24">
          <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-xs tracking-[0.2em] uppercase">
              {story.category && (
                <Link 
                  href={`/stories?category=${encodeURIComponent(story.category)}`}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {story.category}
                </Link>
              )}
              {story.readTime && (
                <>
                  <span className="text-white/30">·</span>
                  <span className="text-white/30">{story.readTime} min</span>
                </>
              )}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
              {story.title}
            </h1>
            {story.subtitle && (
              <p className="text-xl md:text-2xl text-white/60 font-serif italic max-w-2xl">
                {story.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          {/* Body with The Facts */}
          <div className="prose">
            <StoryBody content={story.body} theFacts={story.the_facts} />
          </div>

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <>
              <hr className="border-white/10 my-16" />
              <Gallery images={galleryImages} />
            </>
          )}

          {/* Classification Tags */}
          {(regions.length > 0 || countries.length > 0 || themes.length > 0) && (
            <>
              <hr className="border-white/10 my-16" />
              <div className="space-y-5">
                {regions.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-white/30 mr-2">Region</span>
                    {regions.map((region) => (
                      <Link
                        key={region}
                        href={`/stories?region=${encodeURIComponent(region.trim())}`}
                        className="text-xs px-3 py-1.5 border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-colors"
                      >
                        {region.trim()}
                      </Link>
                    ))}
                  </div>
                )}
                {countries.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-white/30 mr-2">Country</span>
                    {countries.map((country) => (
                      <Link
                        key={country}
                        href={`/stories?country=${encodeURIComponent(country.trim())}`}
                        className="text-xs px-3 py-1.5 border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-colors"
                      >
                        {country.trim()}
                      </Link>
                    ))}
                  </div>
                )}
                {themes.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-white/30 mr-2">Themes</span>
                    {themes.map((theme) => (
                      <Link
                        key={theme}
                        href={`/stories?theme=${encodeURIComponent(theme.trim())}`}
                        className="text-xs px-3 py-1.5 border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-colors"
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
              <hr className="border-white/10 my-16" />
              <div className="text-sm">
                <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6">Sources</h3>
                <ul className="space-y-3">
                  {sources.map((source, index) => (
                    <li key={index} className="font-serif text-white/50">{source}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Attribution Footer */}
          <hr className="border-white/10 my-16" />
          <footer className="text-sm text-white/40 flex flex-wrap gap-x-6 gap-y-1">
            {story.textBy && <span>Text — {story.textBy}</span>}
            {story.imagesBy && <span>Images — {story.imagesBy}</span>}
            {story.year && <span>{story.year}</span>}
          </footer>

          {/* Back Link */}
          <div className="mt-16">
            <Link
              href="/stories"
              className="inline-flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors"
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
