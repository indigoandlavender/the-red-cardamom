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
    <main className="min-h-screen bg-white">
      {/* Hero with dark background */}
      <div className="bg-black text-white">
        <Header />
        <section className="pt-24 pb-16 md:pt-28 md:pb-20">
          <div className="container mx-auto px-6 lg:px-16">
            <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4 font-medium">
              The Archive
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Stories</h1>
            <p className="text-lg text-white/60 max-w-xl">
              Food as covenant. Food as currency. Food as war.
            </p>
          </div>
        </section>
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3">
            {/* Active Filter */}
            {activeFilter && (
              <div className="mb-10 pb-10 border-b border-black">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-[0.2em] uppercase text-black font-semibold">
                    Filtered by
                  </span>
                  <Link
                    href="/stories"
                    className="text-xs text-black hover:opacity-60 transition-opacity"
                  >
                    Clear ×
                  </Link>
                </div>
                <span className="inline-block px-3 py-1.5 bg-black text-white text-sm">
                  {activeFilter}
                </span>
              </div>
            )}

            {/* Categories */}
            <div className="mb-10">
              <h3 className="text-xs tracking-[0.2em] uppercase text-black font-semibold mb-5">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/stories?category=${encodeURIComponent(cat)}`}
                      className={`text-sm transition-opacity ${
                        searchParams.category === cat ? 'text-black font-medium' : 'text-black hover:opacity-60'
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
                <h3 className="text-xs tracking-[0.2em] uppercase text-black font-semibold mb-5">
                  Regions
                </h3>
                <ul className="space-y-2">
                  {regions.map((region) => (
                    <li key={region}>
                      <Link
                        href={`/stories?region=${encodeURIComponent(region)}`}
                        className={`text-sm transition-opacity ${
                          searchParams.region === region ? 'text-black font-medium' : 'text-black hover:opacity-60'
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
                <h3 className="text-xs tracking-[0.2em] uppercase text-black font-semibold mb-5">
                  Countries
                </h3>
                <ul className="space-y-2">
                  {countries.slice(0, 15).map((country) => (
                    <li key={country}>
                      <Link
                        href={`/stories?country=${encodeURIComponent(country)}`}
                        className={`text-sm transition-opacity ${
                          searchParams.country === country ? 'text-black font-medium' : 'text-black hover:opacity-60'
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
                <h3 className="text-xs tracking-[0.2em] uppercase text-black font-semibold mb-5">
                  Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {themes.slice(0, 20).map((theme) => (
                    <Link
                      key={theme}
                      href={`/stories?theme=${encodeURIComponent(theme)}`}
                      className={`text-xs px-3 py-1.5 border transition-colors ${
                        searchParams.theme === theme 
                          ? 'border-black bg-black text-white' 
                          : 'border-black text-black hover:bg-black hover:text-white'
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
                <p className="text-black mb-4">No stories found</p>
                <Link
                  href="/stories"
                  className="text-xs tracking-[0.15em] uppercase text-black font-semibold hover:opacity-60 transition-opacity"
                >
                  Clear filters →
                </Link>
              </div>
            ) : (
              <>
                <p className="text-xs text-black mb-8">
                  {stories.length} {stories.length === 1 ? 'story' : 'stories'}
                </p>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                  {stories.map((story) => (
                    <article key={story.slug} className="group">
                      <Link href={`/story/${story.slug}`}>
                        <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-gray-100">
                          {story.heroImage && (
                            <Image
                              src={story.heroImage}
                              alt={story.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-black font-semibold mb-2">
                          {story.category}
                        </p>
                        <h2 className="font-serif text-xl md:text-2xl mb-2 group-hover:opacity-60 transition-opacity">
                          {story.title}
                        </h2>
                        <p className="text-sm text-black mb-2">
                          {story.subtitle}
                        </p>
                        {story.country && (
                          <p className="text-xs text-black">
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
