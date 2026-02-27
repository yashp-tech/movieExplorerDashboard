import { memo, useMemo } from 'react';

interface Actor {
  name: string;
  image: string;
}

interface ActorSearchProps {
  actorQuery: string;
  onActorQueryChange: (query: string) => void;
  selectedActor: string;
  onActorSelect: (actor: string) => void;
}

const FEATURED_ACTORS: Actor[] = [
  {
    name: 'Leonardo DiCaprio',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Leonardo_DiCaprio_2014.jpg/440px-Leonardo_DiCaprio_2014.jpg',
  },
  {
    name: 'Robert Downey Jr.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/440px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg',
  },
  {
    name: 'Ben Affleck',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ben_Affleck_by_Gage_Skidmore_3.jpg/440px-Ben_Affleck_by_Gage_Skidmore_3.jpg',
  },
  
  {
    name: 'Dwayne Johnson',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/440px-Dwayne_Johnson_2014_%28cropped%29.jpg',
  },
];

const ActorSearch = memo(({ actorQuery, onActorQueryChange, selectedActor, onActorSelect }: ActorSearchProps) => {

  // When a card is selected → show only that card
  // When typing (no selection) → show only name-matching cards
  // When nothing → show all
  const filteredActors = useMemo(() => {
    if (selectedActor) {
      return FEATURED_ACTORS.filter((a) => a.name === selectedActor);
    }
    const q = actorQuery.trim().toLowerCase();
    if (!q) return FEATURED_ACTORS;
    return FEATURED_ACTORS.filter((a) => a.name.toLowerCase().includes(q));
  }, [actorQuery, selectedActor]);

  const handleActorClick = (name: string) => {
    if (selectedActor === name) {
      onActorSelect('');
      onActorQueryChange('');
    } else {
      onActorSelect(name);
      onActorQueryChange(name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onActorQueryChange(e.target.value);
    onActorSelect(''); // clear card selection when typing manually
  };

  const handleClear = () => {
    onActorQueryChange('');
    onActorSelect('');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">🎭</span>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Search by Actor</h2>
        </div>
        {(actorQuery || selectedActor) && (
          <button
            onClick={handleClear}
            className="text-xs text-gray-400 hover:text-red-400 transition-colors font-medium px-2 py-1 rounded border border-gray-200 dark:border-gray-700"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Actor search input */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Type actor name to filter cards & movies..."
          value={actorQuery}
          onChange={handleInputChange}
          className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Filtered actor cards */}
      {filteredActors.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filteredActors.map((actor) => {
            const isSelected = selectedActor === actor.name;
            return (
              <button
                key={actor.name}
                onClick={() => handleActorClick(actor.name)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer group
                  ${isSelected
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-lg scale-105'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-yellow-400 hover:scale-105 hover:shadow-md'
                  }`}
              >
                <img
                  src={actor.image}
                  alt={actor.name}
                  className={`w-20 h-20 rounded-full object-cover object-top border-4 transition-all duration-200
                    ${isSelected ? 'border-yellow-400' : 'border-gray-200 dark:border-gray-700 group-hover:border-yellow-400'}`}
                />
                <span className={`text-sm font-semibold text-center leading-tight transition-colors duration-200
                  ${isSelected ? 'text-yellow-500' : 'text-gray-700 dark:text-gray-200 group-hover:text-yellow-500'}`}>
                  {actor.name}
                </span>
                {isSelected && (
                  <span className="text-xs text-yellow-500 font-medium">✓ Selected</span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        // No matching actor card — still search movies by typed name
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-yellow-50 dark:bg-yellow-400/10 border border-yellow-300 dark:border-yellow-400/30">
          <span className="text-yellow-500 text-lg">🎬</span>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Searching movies for <span className="font-bold">"{actorQuery}"</span>…
          </p>
        </div>
      )}
    </div>
  );
});

ActorSearch.displayName = 'ActorSearch';

export default ActorSearch;
