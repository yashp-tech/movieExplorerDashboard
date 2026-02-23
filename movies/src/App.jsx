import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
