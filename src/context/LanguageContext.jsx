import React, { createContext, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeLanguage = (newLang) => {
    if (newLang === language) return;
    
    setIsTransitioning(true);

    // Retraso de 800ms para mostrar la animación antes de cambiar el texto
    setTimeout(() => {
      setLanguage(newLang);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 800);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
      
      {/* Animación global de cambio de idioma */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FBF9F8]/90 backdrop-blur-sm"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#C2410C]/30 border-t-[#C2410C] rounded-full mb-4"
            />
            <p className="font-heading text-lg font-bold text-[#954500]">
              {language === 'es' ? translations.en.loader : translations.es.loader}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);