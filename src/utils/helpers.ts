import type { Movie } from '../types/movie';

// Helper function to truncate text
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Helper function to format year from date
export const formatYear = (dateString: string): string | number => {
  if (!dateString) return 'N/A';
  return new Date(dateString).getFullYear();
};

// Helper function to check if movie is in favorites
export const isFavorite = (movieId: string, favorites: Movie[]): boolean => {
  return favorites.some((fav) => fav.imdbID === movieId);
};

// Helper function to calculate total pages
export const calculateTotalPages = (totalResults: number, resultsPerPage: number = 10): number => {
  return Math.ceil(totalResults / resultsPerPage);
};
