import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  getStories, 
  getAllCategories, 
  getAllRegions, 
  getAllCountries, 
  getAllThemes 
} from '@/lib/sheets';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Food history, chemistry, and hospitality from Namibia to China.',
};

interface PageProps {
  searchParams: { 
    category?: string;
    region?: string;
    country?: string;
    theme?: string;
  };
}

export default async function StoriesPage({ searchParams }: PageProps) {
  const [allStories, categories, regions, countries, themes] = await Promise.all([
    getStories(),
    getAllCategories(),
    getAllRegions(),
    getAllCountries(),
    getAllThemes(),
  ]);

  // Filter stories based on search params
  let stories = allStories;
  let activeFilter = '';

  if (searchParams.category) {
    stories = stories.filter(s => 
      s.category.toLowerCase() === searchParams.category?.toLowerCase()
    );
    activeFilter = `Category: ${searchParams.category}`;
  }

  if (searchParams.region) {
    stories = stories.filter(s => 
      s.region.toLowerCase().includes(searchParams.region?.toLowerCase() || '')
    );
    activeFilter = `Region: ${searchParams.region}`;
  }

  if (searchParams.country) {
    stories = stories.filter(s => 
      s.country.toLowerCase().includes(searchParams.country?.toLowerCase() || '')
    );
    activeFilter = `Country: ${searchParams.country}`;
  }

  if (searchParams.theme) {
    stories = stories.filter(s => 
      s.theme.toLowerCase().includes(searchParams.theme?.toLowerCase() || '')
    );
    activeFilter = `Theme: ${searchParams.theme}`;
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Stories</h1>
          <p className="text-lg text-[var(--muted)] font-serif max-w-2xl">
            Food as covenant. Food as currency. Food as war. Food as ceremony.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            {/* Active Filter */}
            {activeFilter && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
                    Filtered by
                  </span>
                  <Link
                    href="/stories"
                    className="text-xs text-[var(--accent)] hover:underline"
                  >
                    Clear
                  </Link>
                </div>
                <span className="inline-block px-3 py-1 bg-[var(--accent)] text-white text-sm">
                  {activeFilter}
                </span>
              </div>
            )}

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/stories?category=${encodeURIComponent(cat)}`}
                      className={`text-sm hover:text-[var(--accent)] transition-colors ${
                        searchParams.category === cat ? 'text-[var(--accent)] font-medium' : ''
                      }`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regions */}
            {regions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] mb-4">
                  Regions
                </h3>
                <ul className="space-y-2">
                  {regions.map((region) => (
                    <li key={region}>
                      <Link
                        href={`/stories?region=${encodeURIComponent(region)}`}
                        className={`text-sm hover:text-[var(--accent)] transition-colors ${
                          searchParams.region === region ? 'text-[var(--accent)] font-medium' : ''
                        }`}
                      >
                        {region}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Countries */}
            {countries.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] mb-4">
                  Countries
                </h3>
                <ul className="space-y-2">
                  {countries.slice(0, 15).map((country) => (
                    <li key={country}>
                      <Link
                        href={`/stories?country=${encodeURIComponent(country)}`}
                        className={`text-sm hover:text-[var(--accent)] transition-colors ${
                          searchParams.country === country ? 'text-[var(--accent)] font-medium' : ''
                        }`}
                      >
                        {country}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Themes */}
            {themes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] mb-4">
                  Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {themes.slice(0, 20).map((theme) => (
                    <Link
                      key={theme}
                      href={`/stories?theme=${encodeURIComponent(theme)}`}
                      className={`text-xs px-2 py-1 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors ${
                        searchParams.theme === theme ? 'border-[var(--accent)] text-[var(--accent)]' : ''
                      }`}
                    >
                      {theme}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Stories Grid */}
          <div className="lg:col-span-3">
            {stories.length === 0 ? (
              <p className="text-[var(--muted)] text-center py-12">
                No stories found. Try a different filter.
              </p>
            ) : (
              <>
                <p className="text-sm text-[var(--muted)] mb-8">
                  {stories.length} {stories.length === 1 ? 'story' : 'stories'}
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  {stories.map((story) => (
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
                        <h2 className="font-serif text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">
                          {story.title}
                        </h2>
                        <p className="text-sm text-[var(--muted)] font-serif italic mb-3">
                          {story.subtitle}
                        </p>
                        {story.country && (
                          <p className="text-xs text-[var(--muted)]">
                            {story.country}
                          </p>
                        )}
                      </Link>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
