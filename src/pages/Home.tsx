import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import SearchBar from '../components/SearchBar';
import ActorSearch from '../components/ActorSearch';
import MovieGrid from '../movies/MovieGrid';
import MovieFilters from '../movies/MovieFilters';
import Pagination from '../components/Pagination';
import MovieCarousel from '../components/MovieCarousel';
import MovieCard from '../movies/MovieCard';
import '../components/MovieCarousel.css';
import useLanguage from '../hooks/useLanguage';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [actorQuery, setActorQuery] = useState('');
  const [selectedActor, setSelectedActor] = useState('');
  const { selectedLanguage } = useLanguage();

  const { movies } = useAppSelector((state) => state.movies);

  return (
    <div className="flex gap-6 bg-gray-50 dark:bg-black min-h-screen">
      {/* Hotstar-style Sidebar */}
      <aside className="w-52 flex-shrink-0 mt-20 -ml-8">
        <MovieFilters
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        <h1 className="text-3xl font-bold text-yellow-400 dark:text-yellow-400">
          Discover Movies
        </h1>

        <SearchBar
          value={searchQuery}
          onChange={(val) => { setSearchQuery(val); setActorQuery(''); setSelectedActor(''); }}
        />

        <ActorSearch
          actorQuery={actorQuery}
          onActorQueryChange={setActorQuery}
          selectedActor={selectedActor}
          onActorSelect={(actor) => { setSelectedActor(actor); setSearchQuery(''); }}
        />

        {movies && movies.length > 0 && (
          <MovieCarousel
            movies={movies}
            renderCard={(movie) => <MovieCard movie={movie} />}
          />
        )}

        <MovieGrid
          searchQuery={actorQuery || searchQuery}
          type={selectedType}
          genre={selectedGenre}
          page={currentPage}
          actorQuery={actorQuery}
          language={selectedLanguage.code}
        />

        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;
