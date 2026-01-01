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
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      {/* Spacer for absolute header */}
      <div className="h-20" />

      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-16 py-16 md:py-24">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            The Archive
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">Stories</h1>
          <p className="text-xl text-white/50 font-serif italic max-w-2xl">
            Food as covenant. Food as currency. Food as war. Food as ceremony.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-16 py-16">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3">
            {/* Active Filter */}
            {activeFilter && (
              <div className="mb-10 pb-10 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-[0.2em] uppercase text-white/40">
                    Filtered by
                  </span>
                  <Link
                    href="/stories"
                    className="text-xs text-white/50 hover:text-white transition-colors"
                  >
                    Clear ×
                  </Link>
                </div>
                <span className="inline-block px-4 py-2 bg-white/10 text-white/80 text-sm">
                  {activeFilter}
                </span>
              </div>
            )}

            {/* Categories */}
            <div className="mb-10">
              <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/stories?category=${encodeURIComponent(cat)}`}
                      className={`text-sm hover:text-white transition-colors ${
                        searchParams.category === cat ? 'text-white' : 'text-white/50'
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
              <div className="mb-10">
                <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
                  Regions
                </h3>
                <ul className="space-y-3">
                  {regions.map((region) => (
                    <li key={region}>
                      <Link
                        href={`/stories?region=${encodeURIComponent(region)}`}
                        className={`text-sm hover:text-white transition-colors ${
                          searchParams.region === region ? 'text-white' : 'text-white/50'
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
              <div className="mb-10">
                <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
                  Countries
                </h3>
                <ul className="space-y-3">
                  {countries.slice(0, 15).map((country) => (
                    <li key={country}>
                      <Link
                        href={`/stories?country=${encodeURIComponent(country)}`}
                        className={`text-sm hover:text-white transition-colors ${
                          searchParams.country === country ? 'text-white' : 'text-white/50'
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
              <div className="mb-10">
                <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
                  Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {themes.slice(0, 20).map((theme) => (
                    <Link
                      key={theme}
                      href={`/stories?theme=${encodeURIComponent(theme)}`}
                      className={`text-xs px-3 py-1.5 border transition-colors ${
                        searchParams.theme === theme 
                          ? 'border-white/50 text-white' 
                          : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
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
          <div className="lg:col-span-9">
            {stories.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/50 mb-4">No stories found</p>
                <Link
                  href="/stories"
                  className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors"
                >
                  Clear filters →
                </Link>
              </div>
            ) : (
              <>
                <p className="text-xs text-white/40 mb-10">
                  {stories.length} {stories.length === 1 ? 'story' : 'stories'}
                </p>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                  {stories.map((story) => (
                    <article key={story.slug} className="group">
                      <Link href={`/story/${story.slug}`}>
                        <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-white/5">
                          {story.heroImage && (
                            <Image
                              src={story.heroImage}
                              alt={story.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                          {story.category}
                        </p>
                        <h2 className="font-serif text-xl mb-2 text-white/90 group-hover:text-white transition-colors">
                          {story.title}
                        </h2>
                        <p className="text-sm text-white/50 font-serif italic mb-3">
                          {story.subtitle}
                        </p>
                        {story.country && (
                          <p className="text-xs text-white/30">
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
