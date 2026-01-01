import Image from 'next/image';
import Link from 'next/link';
import { getStories } from '@/lib/sheets';

interface MoreStoriesProps {
  currentSlug: string;
}

export default async function MoreStories({ currentSlug }: MoreStoriesProps) {
  const allStories = await getStories();
  
  // Filter out current story and get 3 random stories
  const otherStories = allStories.filter(s => s.slug !== currentSlug);
  const moreStories = otherStories.sort(() => Math.random() - 0.5).slice(0, 3);

  if (moreStories.length === 0) return null;

  return (
    <section className="bg-black text-white py-20 md:py-28">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-serif text-2xl md:text-3xl tracking-[0.1em]">
            More Stories
          </h2>
          <Link
            href="/stories"
            className="text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
          >
            View All
          </Link>
        </div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {moreStories.map((story) => (
            <article key={story.slug} className="group">
              <Link href={`/story/${story.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-white/10">
                  {story.heroImage && (
                    <Image
                      src={story.heroImage}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mb-3">
                  {story.category}
                </p>
                <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:opacity-70 transition-opacity leading-tight">
                  {story.title}
                </h3>
                {story.subtitle && (
                  <p className="text-sm text-white/60 line-clamp-2">
                    {story.subtitle}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
