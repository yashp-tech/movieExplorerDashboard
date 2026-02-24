import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../features/movies/MovieGrid';
import MovieFilters from '../features/movies/MovieFilters';
import Pagination from '../components/Pagination';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
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

