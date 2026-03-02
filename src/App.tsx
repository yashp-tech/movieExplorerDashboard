import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import LanguageProvider from './context/LanguageProvider';

const App = () => {
  return (
    <LanguageProvider>
      <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
