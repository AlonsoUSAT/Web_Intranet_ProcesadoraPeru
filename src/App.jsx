import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/sections/ScrollToTop';

// PERF-001: Code splitting — carga perezosa por ruta para reducir bundle inicial
// Solo Navbar, Footer y ScrollToTop se incluyen en el chunk principal
import { LanguageProvider } from './context/LanguageContext';

const Home          = lazy(() => import('./pages/Home'));
const About         = lazy(() => import('./pages/About'));
const Products      = lazy(() => import('./pages/Products'));
const Contact       = lazy(() => import('./pages/Contact'));
const ComplaintsBook = lazy(() => import('./pages/ComplaintsBook'));
const Terms         = lazy(() => import('./pages/Terms'));

// Fallback branded con colores corporativos de Procesadora Perú
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label="Cargando página">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-4 border-[#F6F3F2] border-t-[#954500] animate-spin"
          aria-hidden="true"
        />
        <span className="text-[#554339] font-body text-sm font-medium">Cargando...</span>
      </div>
    </div>
  );
}

function App() {
  const [toastPosition, setToastPosition] = useState(
    window.innerWidth < 768 ? 'bottom-center' : 'top-right'
  );

  useEffect(() => {
    const handleResize = () => {
      setToastPosition(window.innerWidth < 768 ? 'bottom-center' : 'top-right');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LanguageProvider>
      <HelmetProvider>
        <Toaster position={toastPosition} richColors />
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* pt-[93px] compensa el Navbar fijo */}
            <main className="flex-grow pt-[93px]">
              {/* Suspense envuelve las rutas — cada página es un chunk separado */}
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/"                    element={<Home />} />
                  <Route path="/nosotros"            element={<About />} />
                  <Route path="/productos"           element={<Products />} />
                  <Route path="/contacto"            element={<Contact />} />
                  <Route path="/libro-reclamaciones" element={<ComplaintsBook />} />
                  <Route path="/terminos"            element={<Terms />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </LanguageProvider>
  );
}

export default App;