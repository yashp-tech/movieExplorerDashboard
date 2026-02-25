import { memo, useCallback } from 'react';

const MovieFilters = memo(({ selectedType, onTypeChange, selectedGenre, onGenreChange }) => {
  const types = [
    { value: '', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'Series' },
  ];

  const genres = [
    { value: '', label: 'All Genres' },
    { value: 'horror', label: 'Horror' },
    { value: 'sci-fi', label: 'Sci-Fi' },
    { value: 'family', label: 'Family Friendly' },
    { value: 'crime thriller', label: 'Crime Thriller' },
  ];

  const handleTypeChange = useCallback((type) => {
    onTypeChange(type);
  }, [onTypeChange]);

  const handleGenreChange = useCallback((genre) => {
    onGenreChange(genre);
  }, [onGenreChange]);

  return (
    <div className="space-y-4 p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 mb-6 animate-fade-in bg-pink-400">
      <div className="flex gap-3 flex-wrap justify-center">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => handleTypeChange(type.value)}
            className={`px-5 py-2 font-semibold rounded-xl shadow-md transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:ring-offset-2 ${
              selectedType === type.value
                ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white border-blue-600 scale-105 shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-105'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
      <div className="flex gap-3 flex-wrap justify-center mt-2">
        {genres.map((genre) => (
          <button
            key={genre.value}
            onClick={() => handleGenreChange(genre.value)}
            className={`px-5 py-2 font-semibold rounded-xl shadow-md transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:ring-offset-2 ${
              selectedGenre === genre.value
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-600 scale-105 shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-purple-100 dark:hover:bg-pink-900 hover:text-purple-700 dark:hover:text-pink-300 hover:scale-105'
            }`}
          >
            {genre.label}
          </button>
        ))}
      </div>
    </div>
  );
});

export default MovieFilters;

