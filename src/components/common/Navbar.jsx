import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import logoImg from '../../assets/logopp.png';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t, changeLanguage, language } = useLanguage();

  const navLinks = [
    { name: t.navbar.inicio, path: '/' },
    { name: t.navbar.nosotros, path: '/nosotros' },
    { name: t.navbar.productos, path: '/productos' },
    { name: t.navbar.lineaEtica, path: '/libro-reclamaciones' },
    { name: t.navbar.contacto, path: '/contacto' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 h-[93px] bg-[#FBF9F8]/80 backdrop-blur-md border-b border-[#F4F4F5] flex flex-col justify-end"
    >
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 h-[92px] flex items-center justify-between">

        {/* Logo y Nombre */}
        <div className="flex-shrink-0 z-50">
          <Link to="/" className="flex items-center gap-3 md:gap-4" onClick={() => setIsOpen(false)}>

            <img
              src={logoImg}
              alt="Logo Procesadora Perú"
              className="h-10 md:h-14 w-auto object-contain"
            />

            {/* Texto gigante */}
            <span className="text-[#18181B] font-heading text-2xl md:text-[28px] font-extrabold tracking-tight hidden sm:block">
              PROCESADORA PERÚ
            </span>
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden z-50 p-3 min-h-[48px] min-w-[48px] flex justify-center items-center text-[#18181B]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
          aria-expanded={isOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-heading text-base font-bold pb-1 transition-colors ${isActive ? 'text-[#C2410C]' : 'text-[#52525B] hover:text-[#C2410C]'
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#C2410C]"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      y: { duration: 0 }
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Language Switcher */}
        <div className="hidden md:flex items-center gap-6">
          {/* Banderas de Idioma */}
          <div className="flex items-center gap-3 border-r border-[#E4E4E7] pr-6">
            <button
              onClick={() => changeLanguage('es')}
              className={`text-xl transition-all p-3 min-h-[44px] min-w-[44px] flex items-center justify-center ${language === 'es' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-80'}`}
              title="Español"
              aria-label="Idioma Español"
            >
              🇪🇸
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`text-xl transition-all p-3 min-h-[44px] min-w-[44px] flex items-center justify-center ${language === 'en' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-80'}`}
              title="English"
              aria-label="English Language"
            >
              🇺🇸
            </button>
          </div>

         <Link to="/intranet/login" className="bg-[#954500] text-white font-heading text-base font-semibold px-6 py-2.5 rounded shadow-sm hover:shadow-md transition-shadow hover:bg-[#803a00]">
  {t.navbar.accesoIntranet}
</Link>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[93px] left-0 right-0 bg-[#FBF9F8] border-b border-[#E4E4E7] flex flex-col md:hidden px-6 py-4 shadow-lg"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-heading text-lg font-bold py-4 border-b border-[#E4E4E7] ${isActive ? 'text-[#C2410C]' : 'text-[#52525B]'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Banderas en Mobile */}
              <div className="flex justify-center gap-6 py-4 border-b border-[#E4E4E7]">
                <button aria-label="Idioma Español" onClick={() => changeLanguage('es')} className={`text-2xl p-3 min-h-[48px] min-w-[48px] flex items-center justify-center ${language === 'es' ? 'opacity-100' : 'opacity-50'}`}>🇪🇸</button>
                <button aria-label="English Language" onClick={() => changeLanguage('en')} className={`text-2xl p-3 min-h-[48px] min-w-[48px] flex items-center justify-center ${language === 'en' ? 'opacity-100' : 'opacity-50'}`}>🇺🇸</button>
              </div>

             <Link to="/intranet/login" onClick={() => setIsOpen(false)} className="bg-[#954500] text-white font-heading text-lg font-semibold px-6 py-4 mt-4 rounded shadow-sm text-center">
  {t.navbar.accesoIntranet}
</Link>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}