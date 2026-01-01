'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaW5kaWdvYW5kbGF2ZW5kZXIiLCJhIjoiY21kN3B0OTZvMGllNjJpcXY0MnZlZHVlciJ9.1-jV-Pze3d7HZseOAhmkCg';

interface StoryLocation {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
}

interface StoryMapProps {
  stories: StoryLocation[];
}

// Country/region coordinates for stories
const LOCATION_COORDINATES: Record<string, [number, number]> = {
  // Middle East
  'Jordan': [36.2384, 31.9454],
  'Saudi Arabia': [45.0792, 23.8859],
  'Yemen': [48.5164, 15.5527],
  'Oman': [55.9754, 21.4735],
  'Iran': [53.6880, 32.4279],
  'Iraq': [43.6793, 33.2232],
  'Syria': [38.9968, 34.8021],
  'Lebanon': [35.8623, 33.8547],
  'Palestine': [35.2332, 31.9522],
  'Israel': [34.8516, 31.0461],
  'Turkey': [35.2433, 38.9637],
  
  // South Asia
  'India': [78.9629, 20.5937],
  'Pakistan': [69.3451, 30.3753],
  'Afghanistan': [67.7100, 33.9391],
  'Nepal': [84.1240, 28.3949],
  'Bangladesh': [90.3563, 23.6850],
  'Sri Lanka': [80.7718, 7.8731],
  
  // Southeast Asia
  'Indonesia': [113.9213, -0.7893],
  'Malaysia': [101.9758, 4.2105],
  'Thailand': [100.9925, 15.8700],
  'Vietnam': [108.2772, 14.0583],
  'Myanmar': [95.9560, 21.9162],
  'Philippines': [121.7740, 12.8797],
  'Cambodia': [104.9910, 12.5657],
  
  // East Asia
  'China': [104.1954, 35.8617],
  'Japan': [138.2529, 36.2048],
  'Korea': [127.7669, 35.9078],
  'Mongolia': [103.8467, 46.8625],
  
  // Central Asia
  'Uzbekistan': [64.5853, 41.3775],
  'Kazakhstan': [66.9237, 48.0196],
  'Tajikistan': [71.2761, 38.8610],
  'Kyrgyzstan': [74.7661, 41.2044],
  'Turkmenistan': [59.5563, 38.9697],
  
  // Africa - North
  'Morocco': [-7.0926, 31.7917],
  'Algeria': [1.6596, 28.0339],
  'Tunisia': [9.5375, 33.8869],
  'Libya': [17.2283, 26.3351],
  'Egypt': [30.8025, 26.8206],
  'Sudan': [30.2176, 12.8628],
  
  // Africa - East
  'Ethiopia': [40.4897, 9.1450],
  'Kenya': [37.9062, -0.0236],
  'Tanzania': [34.8888, -6.3690],
  'Uganda': [32.2903, 1.3733],
  'Somalia': [46.1996, 5.1521],
  'Eritrea': [39.7823, 15.1794],
  
  // Africa - West
  'Nigeria': [8.6753, 9.0820],
  'Ghana': [-1.0232, 7.9465],
  'Senegal': [-14.4524, 14.4974],
  'Mali': [-3.9962, 17.5707],
  'Ivory Coast': [-5.5471, 7.5400],
  
  // Africa - South
  'South Africa': [22.9375, -30.5595],
  'Namibia': [18.4904, -22.9576],
  'Botswana': [24.6849, -22.3285],
  'Zimbabwe': [29.1549, -19.0154],
  'Mozambique': [35.5296, -18.6657],
  
  // Europe
  'UK': [-3.4360, 55.3781],
  'France': [2.2137, 46.2276],
  'Spain': [-3.7492, 40.4637],
  'Portugal': [-8.2245, 39.3999],
  'Italy': [12.5674, 41.8719],
  'Greece': [21.8243, 39.0742],
  'Germany': [10.4515, 51.1657],
  'Netherlands': [5.2913, 52.1326],
  'Belgium': [4.4699, 50.5039],
  
  // Americas
  'USA': [-95.7129, 37.0902],
  'Mexico': [-102.5528, 23.6345],
  'Brazil': [-51.9253, -14.2350],
  'Peru': [-75.0152, -9.1900],
  'Colombia': [-74.2973, 4.5709],
  'Argentina': [-63.6167, -38.4161],
};

function getCoordinatesForStory(country: string): [number, number] | null {
  // Handle multiple countries - take the first one
  const countries = country.split(' / ').map(c => c.trim());
  
  for (const c of countries) {
    if (LOCATION_COORDINATES[c]) {
      return LOCATION_COORDINATES[c];
    }
  }
  
  return null;
}

export default function StoryMap({ stories }: StoryMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryLocation | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [50, 25], // Center on Middle East/Central Asia
      zoom: 2.5,
      minZoom: 1.5,
      maxZoom: 8,
      attributionControl: false,
      scrollZoom: false,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-right'
    );

    // Enable scroll zoom on click
    map.current.on('click', () => {
      map.current?.scrollZoom.enable();
    });

    // Disable scroll zoom when mouse leaves
    mapContainer.current.addEventListener('mouseleave', () => {
      map.current?.scrollZoom.disable();
    });

    map.current.on('load', () => {
      // Add markers for each story
      stories.forEach((story) => {
        if (!story.coordinates) return;

        const el = document.createElement('div');
        el.className = 'story-marker';
        el.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" fill="#8b2500" stroke="#faf8f5" stroke-width="2"/>
          </svg>
        `;
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false,
          className: 'story-popup',
        }).setHTML(`
          <div style="padding: 8px 12px; max-width: 200px;">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b2500; margin-bottom: 4px;">
              ${story.category}
            </p>
            <p style="font-family: 'Libre Baskerville', serif; font-size: 14px; font-weight: 500; margin-bottom: 4px;">
              ${story.title}
            </p>
            <p style="font-size: 12px; color: #666;">
              ${story.country}
            </p>
          </div>
        `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat(story.coordinates)
          .addTo(map.current!);

        el.addEventListener('mouseenter', () => {
          popup.setLngLat(story.coordinates).addTo(map.current!);
        });

        el.addEventListener('mouseleave', () => {
          popup.remove();
        });

        el.addEventListener('click', () => {
          window.location.href = `/story/${story.slug}`;
        });
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [stories]);

  return (
    <div className="relative">
      <div
        ref={mapContainer}
        className="w-full h-[500px] md:h-[600px]"
        style={{ backgroundColor: '#f5f0e8' }}
      />
      <style jsx global>{`
        .mapboxgl-popup-content {
          background: #faf8f5;
          border-radius: 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 0;
        }
        .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
          border-top-color: #faf8f5;
        }
        .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
          border-bottom-color: #faf8f5;
        }
        .story-marker {
          transition: transform 0.2s ease;
        }
        .story-marker:hover {
          transform: scale(1.2);
        }
        .mapboxgl-ctrl-group {
          border-radius: 0 !important;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }
        .mapboxgl-ctrl-group button {
          border-radius: 0 !important;
        }
      `}</style>
    </div>
  );
}

// Helper function to prepare stories for the map
export function prepareStoriesForMap(stories: Array<{
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  country: string;
}>): StoryLocation[] {
  return stories
    .map(story => {
      const coordinates = getCoordinatesForStory(story.country);
      if (!coordinates) return null;
      
      return {
        slug: story.slug,
        title: story.title,
        subtitle: story.subtitle,
        category: story.category,
        country: story.country,
        coordinates,
      };
    })
    .filter((s): s is StoryLocation => s !== null);
}
