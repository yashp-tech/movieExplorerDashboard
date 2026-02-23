import { memo, useCallback } from 'react';

const MovieFilters = memo(({ selectedType, onTypeChange }) => {
  const types = [
    { value: '', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'Series' },
  ];

  const handleTypeChange = useCallback((type) => {
    onTypeChange(type);
  }, [onTypeChange]);

  return (
    <div className="flex gap-2 flex-wrap">
      {types.map((type) => (
        <button
          key={type.value}
          onClick={() => handleTypeChange(type.value)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedType === type.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
});

MovieFilters.displayName = 'MovieFilters';

export default MovieFilters;

