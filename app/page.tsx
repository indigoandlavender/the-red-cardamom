import Link from 'next/link';
import Image from 'next/image';
import { getStories, getFeaturedStories, getAllCategories, getAllRegions } from '@/lib/sheets';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryMapWrapper from '@/components/StoryMapWrapper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [stories, featuredStories, categories, regions] = await Promise.all([
    getStories(),
    getFeaturedStories(),
    getAllCategories(),
    getAllRegions(),
  ]);

  const heroStory = featuredStories[0] || stories[0];
  const secondaryStories = stories.filter(s => s.slug !== heroStory?.slug).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Hero - Full viewport cinematic */}
      <section className="relative min-h-screen flex items-end">
        {/* Background image */}
        {heroStory?.heroImage ? (
          <Image
            src={heroStory.heroImage}
            alt={heroStory.title}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 w-full pb-20 md:pb-32">
          <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
            {heroStory ? (
              <Link href={`/story/${heroStory.slug}`} className="block group">
                <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
                  {heroStory.category}
                </p>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 max-w-4xl">
                  {heroStory.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/60 font-serif italic max-w-2xl mb-8">
                  {heroStory.subtitle}
                </p>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors">
                  Read the story
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M4 10h12M12 6l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            ) : (
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
                  Welcome
                </p>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 max-w-4xl">
                  The Red Cardamom
                </h1>
                <p className="text-xl md:text-2xl text-white/60 font-serif italic max-w-2xl">
                  Food as covenant. Food as war. Food as chemistry.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
        </div>
      </section>

      {/* Manifesto - Full viewport statement */}
      <section className="min-h-screen flex items-center justify-center relative border-t border-white/10">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}} />
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl py-32">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-12">
            The Red Cardamom
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-12 text-white/90">
            The stories behind what we eat shape the stories of who we are
          </h2>
          <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto">
            Salt built empires. Spice launched armadas. Coffee sparked revolutions. 
            Food is never just food — it's currency, covenant, chemistry, and war.
          </p>
        </div>
      </section>

      {/* Stories Grid - Magazine editorial layout */}
      {stories.length > 0 && (
        <section className="py-24 md:py-32 border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex justify-between items-end mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                  The Archive
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-white/90">
                  Stories
                </h2>
              </div>
              <Link
                href="/stories"
                className="text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors hidden md:block"
              >
                View All →
              </Link>
            </div>

            {/* Asymmetric magazine grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {/* Large feature - left */}
              {secondaryStories[0] && (
                <div className="md:col-span-7 md:row-span-2">
                  <Link href={`/story/${secondaryStories[0].slug}`} className="group block h-full">
                    <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden bg-white/5">
                      {secondaryStories[0].heroImage && (
                        <Image
                          src={secondaryStories[0].heroImage}
                          alt={secondaryStories[0].title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">
                          {secondaryStories[0].category}
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-white mb-3">
                          {secondaryStories[0].title}
                        </h3>
                        <p className="text-white/60 font-serif italic text-lg hidden md:block">
                          {secondaryStories[0].subtitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Stacked stories - right */}
              <div className="md:col-span-5 space-y-6 md:space-y-8">
                {secondaryStories.slice(1, 4).map((story) => (
                  <Link key={story.slug} href={`/story/${story.slug}`} className="group block">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <div className="relative aspect-square overflow-hidden bg-white/5">
                          {story.heroImage && (
                            <Image
                              src={story.heroImage}
                              alt={story.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col justify-center">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                          {story.category}
                        </p>
                        <h3 className="font-serif text-lg md:text-xl leading-tight text-white/90 group-hover:text-white transition-colors">
                          {story.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile view all */}
            <div className="text-center mt-12 md:hidden">
              <Link
                href="/stories"
                className="inline-block border border-white/20 px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors"
              >
                View All Stories
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Pull Quote - Visual break */}
      <section className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl text-center">
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-white/70 italic">
            "Every meal is a negotiation with the dead — 
            the ancestors who selected these seeds, 
            who walked these trade routes, 
            who decided what was sacred."
          </p>
        </div>
      </section>

      {/* Categories - Dark editorial grid */}
      {categories.length > 0 && (
        <section className="py-24 md:py-32 border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                  Explore By
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-white/90 mb-6">
                  Territory
                </h2>
                <p className="text-white/50 leading-relaxed">
                  Food stories organized by the forces that shaped them — 
                  the routes that carried them, the wars they caused, 
                  the chemistry that makes them work.
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/stories?category=${encodeURIComponent(category)}`}
                      className="group p-6 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
                    >
                      <h3 className="font-serif text-lg text-white/80 group-hover:text-white transition-colors">
                        {category}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Map Section - Dark theme */}
      {stories.length > 0 && (
        <section className="border-t border-white/10 bg-[#050505]">
          <div className="container mx-auto px-6 lg:px-16 py-16">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                  Geography
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-white/90">
                  The Map
                </h2>
              </div>
              <p className="text-xs text-white/30 hidden md:block">
                Click a marker to read
              </p>
            </div>
          </div>
          <div className="bg-[#0d0d0d]">
            <StoryMapWrapper stories={stories.map(s => ({
              slug: s.slug || '',
              title: s.title || '',
              subtitle: s.subtitle || '',
              category: s.category || '',
              country: s.country || '',
            }))} />
          </div>
        </section>
      )}

      {/* Regions - Two column dark */}
      {regions.length > 0 && (
        <section className="py-24 md:py-32 border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                  Browse By
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-white/90 mb-8">
                  Region
                </h2>
                <p className="text-white/50 leading-relaxed">
                  From the salt caravans of the Sahara to the spice ports of the Indian Ocean — 
                  food stories mapped to the places that made them.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 content-start">
                {regions.map((region) => (
                  <Link
                    key={region}
                    href={`/stories?region=${encodeURIComponent(region)}`}
                    className="px-5 py-3 border border-white/20 text-white/70 hover:border-white/50 hover:text-white hover:bg-white/5 transition-all text-sm"
                  >
                    {region}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA - Final statement */}
      <section className="py-32 md:py-40 bg-[#0d0d0d] border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 text-white/90">
            Every ingredient has a passport
          </h2>
          <p className="text-white/50 leading-relaxed text-lg mb-12">
            The cardamom in your coffee crossed three empires. 
            The salt on your table built kingdoms.
            These are those stories.
          </p>
          <Link
            href="/stories"
            className="inline-block border border-white/20 px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors"
          >
            Enter the Archive
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
