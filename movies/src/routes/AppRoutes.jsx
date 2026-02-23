
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Favorites = lazy(() => import('../pages/Favorites'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/movie/:id" element={<MovieDetails />} />
			<Route path="/favorites" element={<Favorites />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</Suspense>
);

export default AppRoutes;

