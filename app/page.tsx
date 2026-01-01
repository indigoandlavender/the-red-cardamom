import Link from 'next/link';
import Image from 'next/image';
import { getStories, getAllCategories, getSettings } from '@/lib/sheets';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryMapWrapper from '@/components/StoryMapWrapper';
import { WebsiteJsonLd } from '@/components/JsonLd';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [stories, categories, settings] = await Promise.all([
    getStories(),
    getAllCategories(),
    getSettings(),
  ]);

  const heroStory = stories[0];
  const featuredStories = stories.slice(1, 5);

  // Get hero data from settings or fallback
  const heroTitle = settings?.hero_title || 'The stories behind what we eat';
  const heroSubtitle = settings?.hero_subtitle || 'Food history, chemistry, and hospitality from Namibia to China';

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a]">
      <WebsiteJsonLd />
      <Header />

      {/* Hero - Full viewport with story */}
      <section className="min-h-screen relative flex items-end">
        {heroStory?.heroImage ? (
          <Image
            src={heroStory.heroImage}
            alt={heroStory.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#6b7c63] via-[#8a9a82] to-[#a8b8a0]" />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/30 to-transparent" />
        
        {/* Hero content */}
        <div className="relative z-10 w-full pb-16 md:pb-24 text-white">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.25em] uppercase text-white/60 mb-4">
                {heroStory ? heroStory.category : 'Featured'}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-4">
                {heroStory ? heroStory.title : heroTitle}
              </h1>
              {heroStory?.subtitle && (
                <p className="text-lg md:text-xl text-white/70 font-serif italic mb-8 max-w-xl">
                  {heroStory.subtitle}
                </p>
              )}
              {heroStory && (
                <Link
                  href={`/story/${heroStory.slug}`}
                  className="inline-block border border-white/30 px-8 py-3 text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-colors"
                >
                  Read Story
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 md:py-32 border-b border-black/10">
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-[#6b7c63] mb-8">
            The Red Cardamom
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.2] mb-8 text-[#1a1a1a]">
            The stories behind what we eat shape the stories of who we are
          </h2>
          <p className="text-base md:text-lg text-[#666] leading-relaxed">
            Food as covenant. Food as currency. Food as chemistry. Food as war. 
            From the Salt Road to the Spice Road, from Namibia to China.
          </p>
        </div>
      </section>

      {/* Stories Grid - Magazine layout */}
      {featuredStories.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center justify-between mb-12">
              <p className="text-xs tracking-[0.25em] uppercase text-[#666]">
                Recent Stories
              </p>
              <Link
                href="/stories"
                className="text-xs tracking-[0.15em] uppercase text-[#6b7c63] hover:text-[#1a1a1a] transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Featured large */}
              {featuredStories[0] && (
                <article className="lg:col-span-7 group">
                  <Link href={`/story/${featuredStories[0].slug}`}>
                    <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-[#e8e6e0]">
                      {featuredStories[0].heroImage && (
                        <Image
                          src={featuredStories[0].heroImage}
                          alt={featuredStories[0].title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b7c63] mb-2">
                      {featuredStories[0].category}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-[#6b7c63] transition-colors">
                      {featuredStories[0].title}
                    </h3>
                    <p className="text-base text-[#666] font-serif italic">
                      {featuredStories[0].subtitle}
                    </p>
                  </Link>
                </article>
              )}

              {/* Stacked smaller stories */}
              <div className="lg:col-span-5 space-y-8">
                {featuredStories.slice(1, 4).map((story) => (
                  <article key={story.slug} className="group">
                    <Link href={`/story/${story.slug}`} className="flex gap-5">
                      <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden bg-[#e8e6e0]">
                        {story.heroImage && (
                          <Image
                            src={story.heroImage}
                            alt={story.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="flex-1 py-1">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b7c63] mb-1">
                          {story.category}
                        </p>
                        <h3 className="font-serif text-lg leading-snug mb-1 group-hover:text-[#6b7c63] transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-sm text-[#888] font-serif italic line-clamp-2">
                          {story.subtitle}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pull Quote */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center">
          <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-[#444] italic">
            "Every meal is a negotiation with the dead — the ancestors who selected these seeds, 
            who walked these trade routes, who decided what was sacred."
          </p>
        </div>
      </section>

      {/* Categories / Territory */}
      <section className="py-20 md:py-28 border-b border-black/10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.25em] uppercase text-[#666] mb-4">
                The Territory
              </p>
              <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-6">
                Where the stories live
              </h2>
              <p className="text-[#666] leading-relaxed">
                Our geography follows the ancient trade routes — Salt Road, Spice Road, 
                Silk Road, Coffee Route. Wherever the stories lead.
              </p>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.slice(0, 6).map((category) => (
                  <Link
                    key={category}
                    href={`/stories?category=${encodeURIComponent(category)}`}
                    className="group p-6 border border-black/10 hover:border-[#6b7c63] hover:bg-[#6b7c63]/5 transition-all"
                  >
                    <h3 className="font-serif text-lg mb-2 group-hover:text-[#6b7c63] transition-colors">
                      {category}
                    </h3>
                    <p className="text-xs text-[#888]">
                      {category === 'Origins' && 'Where things came from'}
                      {category === 'Routes' && 'How food moved'}
                      {category === 'Chemistry' && 'Why things work'}
                      {category === 'Wars' && 'What people killed for'}
                      {category === 'Rituals' && 'How food is eaten'}
                      {category === 'Hospitality' && 'Laws of the table'}
                      {category === 'Lies' && 'Stories traders told'}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {stories.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#666] mb-2">
                  The Map
                </p>
                <h2 className="font-serif text-2xl md:text-3xl">
                  Stories by Location
                </h2>
              </div>
            </div>
            <div className="border border-black/10">
              <StoryMapWrapper stories={stories} />
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-24 md:py-32 border-t border-black/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#6b7c63] mb-6">
            A Dancing with Lions Publication
          </p>
          <h2 className="font-serif text-2xl md:text-3xl mb-6">
            Enter the archive
          </h2>
          <p className="text-[#666] mb-10 leading-relaxed">
            Food history, chemistry, and hospitality from Namibia to China. 
            The stories behind what we eat.
          </p>
          <Link
            href="/stories"
            className="inline-block border border-[#1a1a1a] px-10 py-4 text-xs tracking-[0.15em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-colors"
          >
            Browse Stories
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
