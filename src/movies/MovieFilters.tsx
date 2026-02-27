import { memo, useCallback } from 'react';

interface FilterType {
  value: string;
  label: string;
}

interface MovieFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

const MovieFilters = memo(({ selectedType, onTypeChange, selectedGenre, onGenreChange }: MovieFiltersProps) => {
  const types: FilterType[] = [
    { value: '', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'Series' },
    { value: 'upcoming', label: 'Upcoming Movies' },

  ];

  const genres: FilterType[] = [
    { value: 'horror', label: 'Horror' },
    { value: 'sci-fi', label: 'Sci-Fi' },
    { value: 'family', label: 'Family Friendly' },
    { value: 'crime thriller', label: 'Crime Thriller' },
  ];

  const handleTypeChange = useCallback((type: string) => {
    onTypeChange(type);
  }, [onTypeChange]);

  const handleGenreChange = useCallback((genre: string) => {
    onGenreChange(genre);
  }, [onGenreChange]);

  return (
    <div className="flex flex-col bg-white dark:bg-gray-950 border border-gray-200 dark:border-yellow-400/20 rounded-2xl overflow-hidden sticky top-0 h-fit shadow-2xl">
      {/* Sidebar header */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-yellow-400/20">
        <span className="text-yellow-400 font-black text-lg tracking-widest uppercase">🎬 Browse</span>
      </div>

      {/* Type section */}
      <div className="px-3 pt-4 pb-2">
        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold px-2 mb-2">Type</p>
        <div className="flex flex-col gap-1">
          {types.map((type) => (
            <button
              key={type.value}
              onClick={() => handleTypeChange(type.value)}
              className={`flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                selectedType === type.value
                  ? 'bg-yellow-400 text-black shadow-lg scale-[1.02]'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-yellow-600 dark:hover:text-yellow-400'
              }`}
            >
              <span>{type.value === '' ? '🌐' : type.value === 'movie' ? '🎥' : type.value === 'series' ? '📺' : '🗓️'}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-4 border-t border-gray-200 dark:border-gray-800 my-2" />

      {/* Genre section */}
      <div className="px-3 pb-4">
        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold px-2 mb-2">Genre</p>
        <div className="flex flex-col gap-1">
          {genres.map((genre) => (
            <button
              key={genre.value}
              onClick={() => handleGenreChange(selectedGenre === genre.value ? '' : genre.value)}
              className={`flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                selectedGenre === genre.value
                  ? 'bg-yellow-400 text-black shadow-lg scale-[1.02]'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-yellow-600 dark:hover:text-yellow-400'
              }`}
            >
              <span>{genre.value === 'horror' ? '👻' : genre.value === 'sci-fi' ? '🚀' : genre.value === 'family' ? '👨‍👩‍👧' : '🔪'}</span>
              {genre.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default MovieFilters;
