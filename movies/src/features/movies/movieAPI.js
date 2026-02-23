import axios from 'axios';
import { OMDB_API_KEY, OMDB_API_URL } from '../../utils/constants';

export const searchMovies = async (query, page = 1, type = '') => {
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
      movies: response.data.Search || [],
      totalResults: parseInt(response.data.totalResults) || 0,
    };
  } catch (error) {
    throw new Error(error.response?.data?.Error || error.message || 'Failed to fetch movies');
  }
};

export const fetchMovieById = async (id) => {
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

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.Error || error.message || 'Failed to fetch movie details');
  }
};

