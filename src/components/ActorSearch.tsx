import { memo, useMemo } from 'react';
import ActorCarousel from './ActorCarousel';
import type { Actor } from './ActorCarousel';

interface ActorSearchProps {
  actorQuery: string;
  onActorQueryChange: (query: string) => void;
  selectedActor: string;
  onActorSelect: (actor: string) => void;
}

const FEATURED_ACTORS: Actor[] = [
  {
    name: 'Tom Cruise',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Tom_Cruise_by_Gage_Skidmore_2.jpg/440px-Tom_Cruise_by_Gage_Skidmore_2.jpg',
  },
  {
    name: 'Ana de Armas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ana_de_Armas_Cannes_2016.jpg/440px-Ana_de_Armas_Cannes_2016.jpg',
  },
  {
    name: 'Chris Evans',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Chris_Evans_by_Gage_Skidmore_2.jpg/440px-Chris_Evans_by_Gage_Skidmore_2.jpg',
  },
  {
    name: 'Scarlett Johansson',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Scarlett_Johansson_in_Kuwait_01b-tweaked.jpg/440px-Scarlett_Johansson_in_Kuwait_01b-tweaked.jpg',
  },

  {
    name: 'Sydney Sweeney',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sydney_Sweeney_by_Gage_Skidmore_2.jpg/440px-Sydney_Sweeney_by_Gage_Skidmore_2.jpg',
  },

  {
    name: 'Chris Hemsworth',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Chris_Hemsworth_by_Gage_Skidmore_2.jpg/440px-Chris_Hemsworth_by_Gage_Skidmore_2.jpg',
  },

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

      {/* Actor carousel */}
      {filteredActors.length > 0 ? (
        <ActorCarousel
          actors={filteredActors}
          selectedActor={selectedActor}
          onActorClick={handleActorClick}
        />
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
