import { useRef } from 'react';
import './MovieCarousel.css';

export interface Actor {
  name: string;
  image: string;
}

interface ActorCarouselProps {
  actors: Actor[];
  selectedActor: string;
  onActorClick: (name: string) => void;
}

const ActorCarousel = ({ actors, selectedActor, onActorClick }: ActorCarouselProps) => {
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
      <button className="carousel-arrow left" onClick={() => scroll('left')} aria-label="Scroll left">{'❰'}</button>
      <div className="movie-carousel" ref={carouselRef}>
        {actors.map((actor) => {
          const isSelected = selectedActor === actor.name;
          return (
            <div className="actor-carousel-card" key={actor.name}>
              <button
                onClick={() => onActorClick(actor.name)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer group w-full
                  ${isSelected
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-yellow-400 hover:shadow-md'
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
            </div>
          );
        })}
      </div>
      <button className="carousel-arrow right" onClick={() => scroll('right')} aria-label="Scroll right">{'❱'}</button>
    </div>
  );
};

export default ActorCarousel;
