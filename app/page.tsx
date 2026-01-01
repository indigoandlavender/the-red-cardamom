import Link from 'next/link';
import Image from 'next/image';
import { getStories, getFeaturedStories, getAllCategories, getAllRegions, getAllCountries } from '@/lib/sheets';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryMapWrapper from '@/components/StoryMapWrapper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [stories, featuredStories, categories, regions, countries] = await Promise.all([
    getStories(),
    getFeaturedStories(),
    getAllCategories(),
    getAllRegions(),
    getAllCountries(),
  ]);

  // Get latest stories for the grid (non-featured, limit 6)
  const latestStories = stories
    .filter(s => !featuredStories.find(f => f.slug === s.slug))
    .slice(0, 6);

  const heroStory = featuredStories[0] || stories[0];

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Header />

      {/* Hero Section */}
      {heroStory && (
        <section className="relative">
          <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Text */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-4 font-medium">
                  {heroStory.category}
                </p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                  {heroStory.title}
                </h1>
                <p className="text-lg text-[var(--muted)] mb-6 font-serif italic">
                  {heroStory.subtitle}
                </p>
                <p className="text-[var(--foreground)]/80 mb-8 line-clamp-3">
                  {heroStory.excerpt}
                </p>
                <Link
                  href={`/story/${heroStory.slug}`}
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-wide font-medium text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors"
                >
                  Read the story
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
              {/* Image */}
              {heroStory.heroImage && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={heroStory.heroImage}
                    alt={heroStory.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Tagline */}
      <section className="border-y border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <p className="text-center text-lg md:text-xl text-[var(--muted)] font-serif italic">
            Food history, chemistry, and hospitality from Namibia to China
          </p>
        </div>
      </section>

      {/* Story Map */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="px-6 pt-12 pb-6">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
              Explore the Map
            </h2>
            <p className="text-[var(--foreground)]/70 text-sm">
              Click a marker to read the story. Scroll to zoom.
            </p>
          </div>
          <StoryMapWrapper stories={stories.map(s => ({
            slug: s.slug,
            title: s.title,
            subtitle: s.subtitle,
            category: s.category,
            country: s.country,
          }))} />
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-8">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/stories?category=${encodeURIComponent(category)}`}
                className="px-4 py-2 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-sm"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Stories Grid */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl">Latest Stories</h2>
            <Link
              href="/stories"
              className="text-sm uppercase tracking-wide text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestStories.map((story) => (
              <article key={story.slug} className="group">
                <Link href={`/story/${story.slug}`}>
                  {story.heroImage && (
                    <div className="relative aspect-[3/2] overflow-hidden mb-4">
                      <Image
                        src={story.heroImage}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <p className="text-xs uppercase tracking-[0.15em] text-[var(--accent)] mb-2">
                    {story.category}
                  </p>
                  <h3 className="font-serif text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] font-serif italic">
                    {story.subtitle}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Region */}
      {regions.length > 0 && (
        <section className="py-16 bg-[#f5f0e8]">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-8">
              Browse by Region
            </h2>
            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <Link
                  key={region}
                  href={`/stories?region=${encodeURIComponent(region)}`}
                  className="px-4 py-2 bg-white border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-sm"
                >
                  {region}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Teaser */}
      <section className="py-20 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            The stories behind what we eat
          </h2>
          <p className="text-[var(--muted)] text-lg mb-8 font-serif">
            Food as covenant. Food as currency. Food as war. Food as ceremony.
            From the salt roads of the Sahara to the tea houses of China — 
            the history, chemistry, and hospitality that shaped civilizations.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wide font-medium text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors"
          >
            About The Red Cardamom
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
