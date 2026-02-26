import axios from 'axios';
import { OMDB_API_KEY, OMDB_API_URL } from '../utils/constants';
import type { Movie, MovieDetails, MovieSearchResult } from '../types/movie';

export const searchMovies = async (
  query: string,
  page: number = 1,
  type: string = ''
): Promise<MovieSearchResult> => {
  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        apikey: OMDB_API_KEY,
        s: query || 'marvel',
        page,
        type: type || undefined,
      },
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }

    return {
      movies: (response.data.Search as Movie[]) || [],
      totalResults: parseInt(response.data.totalResults) || 0,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.Error || error.message || 'Failed to fetch movies');
    }
    throw new Error((error as Error).message || 'Failed to fetch movies');
  }
};

export const fetchMovieById = async (id: string): Promise<MovieDetails> => {
  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        apikey: OMDB_API_KEY,
        i: id,
        plot: 'full',
      },
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }

    return response.data as MovieDetails;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.Error || error.message || 'Failed to fetch movie details');
    }
    throw new Error((error as Error).message || 'Failed to fetch movie details');
  }
};
