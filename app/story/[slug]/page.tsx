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
    <main className="min-h-screen bg-[var(--background)]">
      <Header />

      {/* Hero Image */}
      {story.heroImage && (
        <section className="relative w-full h-[50vh] md:h-[60vh]">
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
          {story.heroCaption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-white/80 text-sm max-w-4xl mx-auto">
                {story.heroCaption}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* Meta line */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-xs uppercase tracking-[0.15em]">
          {story.category && (
            <Link 
              href={`/stories?category=${encodeURIComponent(story.category)}`}
              className="text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors"
            >
              {story.category}
            </Link>
          )}
          {story.readTime && (
            <>
              <span className="text-[var(--muted)]">·</span>
              <span className="text-[var(--muted)]">{story.readTime} min</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-4">
          {story.title}
        </h1>

        {/* Subtitle */}
        {story.subtitle && (
          <p className="text-xl text-[var(--muted)] font-serif italic mb-8">
            {story.subtitle}
          </p>
        )}

        <hr className="border-[var(--border)] mb-12" />

        {/* Body with The Facts */}
        <StoryBody content={story.body} theFacts={story.the_facts} />

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <>
            <hr className="border-[var(--border)] my-12" />
            <Gallery images={galleryImages} />
          </>
        )}

        {/* Classification Tags */}
        {(regions.length > 0 || countries.length > 0 || themes.length > 0) && (
          <>
            <hr className="border-[var(--border)] my-12" />
            <div className="space-y-4">
              {regions.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-wide text-[var(--muted)]">Region:</span>
                  {regions.map((region) => (
                    <Link
                      key={region}
                      href={`/stories?region=${encodeURIComponent(region.trim())}`}
                      className="text-xs px-2 py-1 bg-[#f5f0e8] hover:bg-[var(--accent)] hover:text-white transition-colors"
                    >
                      {region.trim()}
                    </Link>
                  ))}
                </div>
              )}
              {countries.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-wide text-[var(--muted)]">Country:</span>
                  {countries.map((country) => (
                    <Link
                      key={country}
                      href={`/stories?country=${encodeURIComponent(country.trim())}`}
                      className="text-xs px-2 py-1 bg-[#f5f0e8] hover:bg-[var(--accent)] hover:text-white transition-colors"
                    >
                      {country.trim()}
                    </Link>
                  ))}
                </div>
              )}
              {themes.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-wide text-[var(--muted)]">Themes:</span>
                  {themes.map((theme) => (
                    <Link
                      key={theme}
                      href={`/stories?theme=${encodeURIComponent(theme.trim())}`}
                      className="text-xs px-2 py-1 bg-[#f5f0e8] hover:bg-[var(--accent)] hover:text-white transition-colors"
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
            <hr className="border-[var(--border)] my-12" />
            <div className="text-sm text-[var(--muted)]">
              <h3 className="text-xs uppercase tracking-[0.15em] font-medium mb-4">Sources</h3>
              <ul className="space-y-2">
                {sources.map((source, index) => (
                  <li key={index} className="font-serif">{source}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Attribution Footer */}
        <hr className="border-[var(--border)] my-12" />
        <footer className="text-sm text-[var(--muted)] flex flex-wrap gap-x-4 gap-y-1">
          {story.textBy && <span>Text — {story.textBy}</span>}
          {story.imagesBy && <span>Images — {story.imagesBy}</span>}
          {story.year && <span>{story.year}</span>}
        </footer>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="10,3 5,8 10,13" />
            </svg>
            All Stories
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
