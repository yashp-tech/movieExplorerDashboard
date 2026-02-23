
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies/movieSlice';

const store = configureStore({
	reducer: {
		movies: movieReducer,
	},
});

export default store;

