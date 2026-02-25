import { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../features/movies/MovieGrid';
import MovieFilters from '../features/movies/MovieFilters';
import Pagination from '../components/Pagination';
import MovieCarousel from '../components/MovieCarousel';
import MovieCard from '../features/movies/MovieCard';
import '../components/MovieCarousel.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Get movies from Redux store for carousel
  const { movies } = useSelector((state) => state.movies);

  return (
    <div className="space-y-6 bg-black">
      <h1 className="text-3xl  font-bold text-yellow-400 dark:text-yellow-400">
        Discover Movies
      </h1>

      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery}
      />

      <MovieFilters 
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      {/* Movie Carousel - show only if movies exist */}
      {movies && movies.length > 0 && (
        <MovieCarousel 
          movies={movies.slice(0, 10)}
          renderCard={(movie) => <MovieCard movie={movie} />}
        />
      )}

      <MovieGrid 
        searchQuery={searchQuery}
        type={selectedType}
        genre={selectedGenre}
        page={currentPage}
      />

      <Pagination 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;

