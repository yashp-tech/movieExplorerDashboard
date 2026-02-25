import { memo, useCallback } from 'react';

const MovieFilters = memo(({ selectedType, onTypeChange, selectedGenre, onGenreChange }) => {
  const types = [
    { value: '', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'Series' },
  ];

  const genres = [
    
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
    <div className="space-y-4 p-6 bg-black dark:bg-gray-900/80 rounded-2xl shadow-2xl border border-yellow-400 dark:border-gray-800 mb-6 animate-fade-in">
      <div className="flex gap-3 flex-wrap justify-center">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => handleTypeChange(type.value)}
            className={`px-5 py-2 font-semibold rounded-xl shadow-md transition-all duration-200 border-2 focus:outline-none focus:ring-2 ${
              selectedType === type.value
                ? 'bg-gradient-to-r text-white border-yellow-400 scale-105 shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-yellow-400 hover:scale-105'
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
            className={`px-5 py-2 font-semibold rounded-xl shadow-md transition-all duration-200 border-2 focus:outline-none focus:ring-2 ${
              selectedGenre === genre.value
                ? 'bg-gradient-to-r  text-white border-yellow-400 scale-105 shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200  hover:text-yellow-400 hover:scale-105'
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

