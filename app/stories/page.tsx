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
    <main className="min-h-screen bg-[#f7f5f0] text-[#1a1a1a]">
      {/* Hero with dark background for header visibility */}
      <div className="bg-[#1a1a1a] text-white">
        <Header />
        <section className="pt-24 pb-16 md:pt-28 md:pb-20">
          <div className="container mx-auto px-6 lg:px-16">
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
              The Archive
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">Stories</h1>
            <p className="text-lg text-white/50 font-serif italic max-w-xl">
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
              <div className="mb-10 pb-10 border-b border-black/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-[0.2em] uppercase text-[#888]">
                    Filtered by
                  </span>
                  <Link
                    href="/stories"
                    className="text-xs text-[#6b7c63] hover:text-[#1a1a1a] transition-colors"
                  >
                    Clear ×
                  </Link>
                </div>
                <span className="inline-block px-3 py-1.5 bg-[#6b7c63]/10 text-[#1a1a1a] text-sm">
                  {activeFilter}
                </span>
              </div>
            )}

            {/* Categories */}
            <div className="mb-10">
              <h3 className="text-xs tracking-[0.2em] uppercase text-[#888] mb-5">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/stories?category=${encodeURIComponent(cat)}`}
                      className={`text-sm hover:text-[#6b7c63] transition-colors ${
                        searchParams.category === cat ? 'text-[#6b7c63]' : 'text-[#666]'
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
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#888] mb-5">
                  Regions
                </h3>
                <ul className="space-y-2">
                  {regions.map((region) => (
                    <li key={region}>
                      <Link
                        href={`/stories?region=${encodeURIComponent(region)}`}
                        className={`text-sm hover:text-[#6b7c63] transition-colors ${
                          searchParams.region === region ? 'text-[#6b7c63]' : 'text-[#666]'
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
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#888] mb-5">
                  Countries
                </h3>
                <ul className="space-y-2">
                  {countries.slice(0, 15).map((country) => (
                    <li key={country}>
                      <Link
                        href={`/stories?country=${encodeURIComponent(country)}`}
                        className={`text-sm hover:text-[#6b7c63] transition-colors ${
                          searchParams.country === country ? 'text-[#6b7c63]' : 'text-[#666]'
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
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#888] mb-5">
                  Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {themes.slice(0, 20).map((theme) => (
                    <Link
                      key={theme}
                      href={`/stories?theme=${encodeURIComponent(theme)}`}
                      className={`text-xs px-3 py-1.5 border transition-colors ${
                        searchParams.theme === theme 
                          ? 'border-[#6b7c63] text-[#6b7c63]' 
                          : 'border-black/10 text-[#666] hover:border-[#6b7c63] hover:text-[#6b7c63]'
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
                <p className="text-[#888] mb-4">No stories found</p>
                <Link
                  href="/stories"
                  className="text-xs tracking-[0.15em] uppercase text-[#6b7c63] hover:text-[#1a1a1a] transition-colors"
                >
                  Clear filters →
                </Link>
              </div>
            ) : (
              <>
                <p className="text-xs text-[#888] mb-8">
                  {stories.length} {stories.length === 1 ? 'story' : 'stories'}
                </p>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                  {stories.map((story) => (
                    <article key={story.slug} className="group">
                      <Link href={`/story/${story.slug}`}>
                        <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-[#e8e6e0]">
                          {story.heroImage && (
                            <Image
                              src={story.heroImage}
                              alt={story.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b7c63] mb-2">
                          {story.category}
                        </p>
                        <h2 className="font-serif text-xl mb-2 group-hover:text-[#6b7c63] transition-colors">
                          {story.title}
                        </h2>
                        <p className="text-sm text-[#666] font-serif italic mb-2">
                          {story.subtitle}
                        </p>
                        {story.country && (
                          <p className="text-xs text-[#888]">
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
