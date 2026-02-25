import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./MovieCarousel.css";

const MovieCarousel = ({ movies, renderCard }) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const { current } = carouselRef;
    if (!current) return;
    const scrollAmount = current.offsetWidth * 0.7;
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="movie-carousel-container">
      <button className="carousel-arrow left" onClick={() => scroll("left")}>{"<"}</button>
      <div className="movie-carousel" ref={carouselRef}>
        {movies.map((movie) => (
          <div className="carousel-card" key={movie.id}>
            {renderCard(movie)}
          </div>
        ))}
      </div>
      <button className="carousel-arrow right" onClick={() => scroll("right")}>{">"}</button>
    </div>
  );
};

MovieCarousel.propTypes = {
  movies: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired,
};

export default MovieCarousel;
