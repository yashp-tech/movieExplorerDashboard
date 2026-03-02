import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { searchMovies } from '../api/MovieAPI';
import type { Movie, MovieSearchResult } from '../types/movie';

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  favorites: Movie[];
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  totalResults: 0,
  favorites: JSON.parse(localStorage.getItem('favorites') ?? '[]') as Movie[],
};

interface FetchMoviesArgs {
  query: string;
  page: number;
  type: string;
}

export const fetchMovies = createAsyncThunk<MovieSearchResult, FetchMoviesArgs>(
  'movies/fetchMovies',
  async ({ query, page, type }) => {
    const data = await searchMovies(query, page, type);
    return data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const exists = state.favorites.find((fav) => fav.imdbID === movie.imdbID);
      if (!exists) {
        state.favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.imdbID !== action.payload
      );
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default movieSlice.reducer;
export const { addToFavorites, removeFromFavorites } = movieSlice.actions;
