// OMDB API constants
export const OMDB_API_KEY: string = import.meta.env.VITE_OMDB_API_KEY as string;
export const OMDB_API_URL: string = import.meta.env.VITE_OMDB_API_URL as string;

// Pagination constants
export const RESULTS_PER_PAGE: number = 10;
export const MAX_PAGES: number = 100;

// Local storage keys
export const FAVORITES_KEY: string = 'movieExplorer_favorites';
export const THEME_KEY: string = 'movieExplorer_theme';
