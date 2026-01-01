'use client';

import dynamic from 'next/dynamic';
import { prepareStoriesForMap } from './StoryMap';

const StoryMap = dynamic(() => import('./StoryMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] bg-[#f5f0e8] flex items-center justify-center">
      <div className="text-[var(--muted)] text-sm">Loading map...</div>
    </div>
  ),
});

interface StoryMapWrapperProps {
  stories: Array<{
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    country: string;
  }>;
}

export default function StoryMapWrapper({ stories }: StoryMapWrapperProps) {
  const mappedStories = prepareStoriesForMap(stories);
  
  if (mappedStories.length === 0) {
    return (
      <div className="w-full h-[400px] bg-[#f5f0e8] flex items-center justify-center">
        <p className="text-[var(--muted)] text-sm">Stories will appear on the map once published</p>
      </div>
    );
  }
  
  return <StoryMap stories={mappedStories} />;
}
