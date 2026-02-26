import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieById } from '../api/MovieAPI';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import type { MovieDetails as MovieDetailsType } from '../types/movie';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieById(id!);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadMovie();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="Movie not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {movie.Title} ({movie.Year})
            </h1>
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
              <span>⭐ {movie.imdbRating}/10</span>
              <span>📅 {movie.Released}</span>
              <span>⏱️ {movie.Runtime}</span>
            </div>
            <div className="mb-4">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                {movie.Genre}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {movie.Plot}
            </p>
            <div className="space-y-2 text-sm">
              <p><strong className="text-gray-800 dark:text-white">Director:</strong> <span className="text-gray-600 dark:text-gray-400">{movie.Director}</span></p>
              <p><strong className="text-gray-800 dark:text-white">Actors:</strong> <span className="text-gray-600 dark:text-gray-400">{movie.Actors}</span></p>
              <p><strong className="text-gray-800 dark:text-white">Language:</strong> <span className="text-gray-600 dark:text-gray-400">{movie.Language}</span></p>
              <p><strong className="text-gray-800 dark:text-white">Country:</strong> <span className="text-gray-600 dark:text-gray-400">{movie.Country}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
