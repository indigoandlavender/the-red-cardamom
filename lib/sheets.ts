import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.RED_CARDAMOM_SPREADSHEET_ID;

async function getAuthClient() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, 'base64').toString()
    );
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    return auth;
  }
  
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  return auth;
}

// ==================== STORIES ====================

export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  sourceType: string;
  heroImage: string;
  mj_prompt: string;
  heroCaption: string;
  excerpt: string;
  body: string;
  the_facts: string;
  readTime: string;
  year: string;
  textBy: string;
  imagesBy: string;
  sources: string;
  // Classification fields
  region: string;
  country: string;
  theme: string;
  era: string;
  tags: string;
  // Status fields
  published: string;
  featured: string;
  order: string;
}

export async function getStories(): Promise<Story[]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Stories!A:X',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      console.log('No stories data found');
      return [];
    }

    const headers = rows[0];
    
    const stories = rows.slice(1).map((row) => {
      const story: Record<string, string> = {};
      headers.forEach((header: string, index: number) => {
        let value = row[index] || '';
        if (typeof value === 'string') {
          value = value.replace(/<br>/g, '\n');
        }
        story[header] = value;
      });
      return story as unknown as Story;
    });

    const filtered = stories.filter((story) => {
      const pub = String(story.published || '').toLowerCase().trim();
      return pub === 'true' || pub === 'yes' || pub === '1';
    });
    
    return filtered;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const stories = await getStories();
  return stories.find((story) => story.slug === slug) || null;
}

export async function getFeaturedStories(): Promise<Story[]> {
  const stories = await getStories();
  return stories
    .filter((story) => {
      const featured = String(story.featured || '').toLowerCase().trim();
      return featured === 'true' || featured === 'yes' || featured === '1';
    })
    .sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
}

// ==================== FILTER FUNCTIONS ====================

export async function getStoriesByCategory(category: string): Promise<Story[]> {
  const stories = await getStories();
  return stories.filter((story) => 
    story.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getStoriesByRegion(region: string): Promise<Story[]> {
  const stories = await getStories();
  return stories.filter((story) => 
    story.region.toLowerCase().includes(region.toLowerCase())
  );
}

export async function getStoriesByCountry(country: string): Promise<Story[]> {
  const stories = await getStories();
  return stories.filter((story) => 
    story.country.toLowerCase().includes(country.toLowerCase())
  );
}

export async function getStoriesByTheme(theme: string): Promise<Story[]> {
  const stories = await getStories();
  return stories.filter((story) => 
    story.theme.toLowerCase().includes(theme.toLowerCase())
  );
}

export async function getStoriesByEra(era: string): Promise<Story[]> {
  const stories = await getStories();
  return stories.filter((story) => 
    story.era.toLowerCase().includes(era.toLowerCase())
  );
}

// ==================== AGGREGATION FUNCTIONS ====================

export async function getAllCategories(): Promise<string[]> {
  const stories = await getStories();
  const categories = new Set(stories.map(s => s.category).filter(Boolean));
  return Array.from(categories).sort();
}

export async function getAllRegions(): Promise<string[]> {
  const stories = await getStories();
  const regions = new Set<string>();
  stories.forEach(s => {
    if (s.region) {
      // Handle multiple regions separated by " / "
      s.region.split(' / ').forEach(r => regions.add(r.trim()));
    }
  });
  return Array.from(regions).sort();
}

export async function getAllCountries(): Promise<string[]> {
  const stories = await getStories();
  const countries = new Set<string>();
  stories.forEach(s => {
    if (s.country) {
      // Handle multiple countries separated by " / "
      s.country.split(' / ').forEach(c => countries.add(c.trim()));
    }
  });
  return Array.from(countries).sort();
}

export async function getAllThemes(): Promise<string[]> {
  const stories = await getStories();
  const themes = new Set<string>();
  stories.forEach(s => {
    if (s.theme) {
      // Handle multiple themes separated by ", "
      s.theme.split(', ').forEach(t => themes.add(t.trim()));
    }
  });
  return Array.from(themes).sort();
}

// ==================== STORY IMAGES ====================

export interface StoryImage {
  story_slug: string;
  image_order: number;
  image_url: string;
  caption: string;
}

export async function getStoryImages(slug: string): Promise<StoryImage[]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Story_Images!A:E',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return [];

    // Sheet columns: A=story_slug, B=order, C=image_url, D=caption, E=mj_prompt
    const images = rows.slice(1)
      .map((row) => ({
        story_slug: row[0] || '',
        image_order: parseInt(row[1]) || 0,
        image_url: row[2] || '',
        caption: row[3] || '',
      }))
      .filter((img) => img.story_slug === slug && img.image_url)
      .sort((a, b) => a.image_order - b.image_order);

    return images;
  } catch (error) {
    console.error('Error fetching story images:', error);
    return [];
  }
}

// ==================== SETTINGS ====================

export interface Settings {
  [key: string]: string;
}

export async function getSettings(): Promise<Settings> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Settings!A:B',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return {};

    const settings: Settings = {};
    rows.slice(1).forEach((row) => {
      if (row[0]) {
        settings[row[0]] = row[1] || '';
      }
    });

    return settings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {};
  }
}

// ==================== RECIPES (optional flourish) ====================

export interface Recipe {
  slug: string;
  title: string;
  subtitle: string;
  story_slug: string; // Links to parent story
  intro: string;
  ingredients: string;
  instructions: string;
  notes: string;
  heroImage: string;
  published: string;
}

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Recipes!A:J',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return [];

    const headers = rows[0];
    
    const recipes = rows.slice(1).map((row) => {
      const recipe: Record<string, string> = {};
      headers.forEach((header: string, index: number) => {
        let value = row[index] || '';
        if (typeof value === 'string') {
          value = value.replace(/<br>/g, '\n');
        }
        recipe[header] = value;
      });
      return recipe as unknown as Recipe;
    });

    return recipes.filter((recipe) => {
      const pub = String(recipe.published || '').toLowerCase().trim();
      return pub === 'true' || pub === 'yes' || pub === '1';
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipes = await getRecipes();
  return recipes.find((recipe) => recipe.slug === slug) || null;
}

export async function getRecipesByStory(storySlug: string): Promise<Recipe[]> {
  const recipes = await getRecipes();
  return recipes.filter((recipe) => recipe.story_slug === storySlug);
}
