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
      {/* Hero */}
      <Header />
      <section className="pt-12 pb-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Stories</h1>
          <p className="text-lg text-gray-600">
            Food as covenant. Food as currency. Food as war.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3">
            {/* Active Filter */}
            {activeFilter && (
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-black">
                    Filtered by
                  </span>
                  <Link
                    href="/stories"
                    className="text-sm text-[#8b4d3b] hover:underline"
                  >
                    Clear
                  </Link>
                </div>
                <span className="inline-block px-3 py-1.5 bg-gray-100 text-black text-sm">
                  {activeFilter}
                </span>
              </div>
            )}

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-black mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/stories?category=${encodeURIComponent(cat)}`}
                      className={`text-sm ${
                        searchParams.category === cat 
                          ? 'text-[#8b4d3b] font-medium' 
                          : 'text-gray-700 hover:text-black'
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
                <h3 className="text-sm font-bold text-black mb-4">
                  Regions
                </h3>
                <ul className="space-y-2">
                  {regions.map((region) => (
                    <li key={region}>
                      <Link
                        href={`/stories?region=${encodeURIComponent(region)}`}
                        className={`text-sm ${
                          searchParams.region === region 
                            ? 'text-[#8b4d3b] font-medium' 
                            : 'text-gray-700 hover:text-black'
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
                <h3 className="text-sm font-bold text-black mb-4">
                  Countries
                </h3>
                <ul className="space-y-2">
                  {countries.slice(0, 15).map((country) => (
                    <li key={country}>
                      <Link
                        href={`/stories?country=${encodeURIComponent(country)}`}
                        className={`text-sm ${
                          searchParams.country === country 
                            ? 'text-[#8b4d3b] font-medium' 
                            : 'text-gray-700 hover:text-black'
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
                <h3 className="text-sm font-bold text-black mb-4">
                  Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {themes.slice(0, 20).map((theme) => (
                    <Link
                      key={theme}
                      href={`/stories?theme=${encodeURIComponent(theme)}`}
                      className={`text-xs px-3 py-1.5 border transition-colors ${
                        searchParams.theme === theme 
                          ? 'border-[#8b4d3b] bg-[#8b4d3b] text-white' 
                          : 'border-gray-300 text-gray-700 hover:border-black'
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
                <p className="text-gray-600 mb-4">No stories found</p>
                <Link
                  href="/stories"
                  className="text-sm font-medium text-[#8b4d3b] hover:underline"
                >
                  Clear filters →
                </Link>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-8">
                  {stories.length} {stories.length === 1 ? 'story' : 'stories'}
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  {stories.map((story) => (
                    <article key={story.slug} className="group">
                      <Link href={`/story/${story.slug}`}>
                        <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-gray-100">
                          {story.heroImage && (
                            <Image
                              src={story.heroImage}
                              alt={story.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <p className="text-xs font-medium text-[#8b4d3b] mb-1">
                          {story.category}
                        </p>
                        <h2 className="text-lg font-bold text-black mb-1 group-hover:text-[#8b4d3b] transition-colors">
                          {story.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {story.subtitle}
                        </p>
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
