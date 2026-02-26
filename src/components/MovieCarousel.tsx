import type { Movie } from '../types/movie';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import './MovieCarousel.css';

interface MovieCarouselProps {
  movies: Movie[];
  renderCard: (movie: Movie) => ReactNode;
}

const MovieCarousel = ({ movies, renderCard }: MovieCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const current = carouselRef.current;
    if (!current) return;
    const scrollAmount = current.offsetWidth * 0.7;
    current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="movie-carousel-container">
      <button className="carousel-arrow left" onClick={() => scroll('left')}>{'❰'}</button>
      <div className="movie-carousel" ref={carouselRef}>
        {movies.map((movie) => (
          <div className="carousel-card" key={movie.imdbID}>
            {renderCard(movie)}
          </div>
        ))}
      </div>
      <button className="carousel-arrow right" onClick={() => scroll('right')}>{'❱'}</button>
    </div>
  );
};

export default MovieCarousel;
