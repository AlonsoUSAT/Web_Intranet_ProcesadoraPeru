import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import ComplaintsBook from './pages/ComplaintsBook';
import ScrollToTop from './components/sections/ScrollToTop';
import Terms from './pages/Terms';

// 1. IMPORTAMOS TU NUEVO CONTEXTO DE IDIOMA
import { LanguageProvider } from './context/LanguageContext';

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
    // 2. ENVOLVEMOS TODA LA APLICACIÓN PARA QUE EL IDIOMA LLEGUE A TODAS LAS PÁGINAS
    <LanguageProvider>
      <HelmetProvider>
        <Toaster position={toastPosition} richColors />
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Añadimos pt-[93px] al main para compensar el Navbar fijo */}
            <main className="flex-grow pt-[93px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/libro-reclamaciones" element={<ComplaintsBook />} />
                <Route path="/terminos" element={<Terms />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </LanguageProvider>
  );
}

export default App;