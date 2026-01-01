'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Only import the map preparation function, not the component itself
const prepareStoriesForMap = (stories: Array<{
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  country: string;
}>) => {
  const LOCATION_COORDINATES: Record<string, [number, number]> = {
    'Jordan': [36.2384, 31.9454],
    'Saudi Arabia': [45.0792, 23.8859],
    'Yemen': [48.5164, 15.5527],
    'Iran': [53.6880, 32.4279],
    'India': [78.9629, 20.5937],
    'Pakistan': [69.3451, 30.3753],
    'Afghanistan': [67.7100, 33.9391],
    'Indonesia': [113.9213, -0.7893],
    'China': [104.1954, 35.8617],
    'Uzbekistan': [64.5853, 41.3775],
    'Ethiopia': [40.4897, 9.1450],
    'Morocco': [-7.0926, 31.7917],
    'USA': [-95.7129, 37.0902],
    'UK': [-3.4360, 55.3781],
    'Netherlands': [5.2913, 52.1326],
  };

  return stories
    .map(story => {
      const countries = story.country.split(' / ').map(c => c.trim());
      let coordinates: [number, number] | null = null;
      for (const c of countries) {
        if (LOCATION_COORDINATES[c]) {
          coordinates = LOCATION_COORDINATES[c];
          break;
        }
      }
      if (!coordinates) return null;
      return { ...story, coordinates };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);
};

const StoryMap = dynamic(() => import('./StoryMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] bg-[#efeee8] flex items-center justify-center">
      <div className="text-[#888] text-sm">Loading map...</div>
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

// Fallback component when map fails to load
function MapFallback({ stories }: { stories: StoryMapWrapperProps['stories'] }) {
  // Group stories by region
  const byCountry = stories.reduce((acc, story) => {
    const countries = story.country.split(' / ').map(c => c.trim());
    countries.forEach(country => {
      if (!acc[country]) acc[country] = [];
      acc[country].push(story);
    });
    return acc;
  }, {} as Record<string, typeof stories>);

  const sortedCountries = Object.keys(byCountry).sort();

  return (
    <div className="w-full bg-[#efeee8] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-8">
          Stories by Location
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {sortedCountries.map(country => (
            <div key={country}>
              <h3 className="font-medium text-sm mb-2 text-[#1a1a1a]">{country}</h3>
              <ul className="space-y-1">
                {byCountry[country].map(story => (
                  <li key={story.slug}>
                    <Link 
                      href={`/story/${story.slug}`}
                      className="text-sm text-[#666] hover:text-[#6b7c63] transition-colors"
                    >
                      {story.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StoryMapWrapper({ stories }: StoryMapWrapperProps) {
  const [mapError, setMapError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // If no stories, show placeholder
  if (stories.length === 0) {
    return (
      <div className="w-full h-[300px] bg-[#efeee8] flex items-center justify-center">
        <p className="text-[#888] text-sm">Stories will appear on the map once published</p>
      </div>
    );
  }

  // Server-side or map error: show fallback
  if (!isClient || mapError) {
    return <MapFallback stories={stories} />;
  }

  const mappedStories = prepareStoriesForMap(stories);

  // Try to render the map, catch any errors
  return (
    <div>
      <ErrorBoundary fallback={<MapFallback stories={stories} />} onError={() => setMapError(true)}>
        <StoryMap stories={mappedStories} />
      </ErrorBoundary>
    </div>
  );
}

// Simple error boundary component
import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
