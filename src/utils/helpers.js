// Helper function to truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Helper function to format year from date
export const formatYear = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).getFullYear();
};

// Helper function to check if movie is in favorites
export const isFavorite = (movieId, favorites) => {
  return favorites.some((fav) => fav.imdbID === movieId);
};

// Helper function to calculate total pages
export const calculateTotalPages = (totalResults, resultsPerPage = 10) => {
  return Math.ceil(totalResults / resultsPerPage);
};

