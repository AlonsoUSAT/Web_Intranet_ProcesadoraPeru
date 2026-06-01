import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
// 1. Importamos tu imagen inicio.jpeg que vi en tu carpeta assets
import inicioBg from '../../assets/inicio.jpeg'; 

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[100vh] md:h-[819px] overflow-hidden flex items-center pt-24 md:pt-0">
      
      {/* Background Image: Usamos la variable inicioBg que creamos arriba */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${inicioBg})` }} 
      />
      
      {/* Gradient Overlay Oscuro: Para que las letras blancas resalten */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#18181B]/95 via-[#18181B]/75 to-transparent z-10" />

      {/* Content */}
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 relative z-20">
        <motion.div 
          className="max-w-[650px] flex flex-col gap-6 md:gap-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Tag */}
          <div className="bg-[#954500] text-white font-body text-[10px] md:text-xs font-bold px-3 py-1 uppercase tracking-wider w-fit rounded-sm shadow-sm">
            {t.home.heroTag}
          </div>

          {/* Headline: Ahora con letras BLANCAS y el "Campo" en naranja */}
          <h1 className="text-white font-heading text-[44px] md:text-[72px] leading-[1.1] font-extrabold tracking-tight">
            {t.home.heroTitle1} <span className="text-[#E07A5F]">{t.home.heroTitleHighlight}</span><br /> {t.home.heroTitle2}
          </h1>

          {/* Description: Letras blancas semitransparentes */}
          <p className="text-white/90 font-body text-lg md:text-xl leading-relaxed max-w-[580px]">
            {t.home.heroDesc}
          </p>

          {/* Buttons: Efecto cristal para el modo oscuro */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link to="/contacto" className="w-full sm:w-auto text-center bg-[#954500] text-white font-heading text-base md:text-lg font-bold px-8 py-4 rounded shadow-md hover:bg-[#803a00] hover:shadow-lg transition-all flex items-center justify-center gap-2">
              {t.home.heroBtn1}
            </Link>
            <Link to="/productos" className="w-full sm:w-auto text-center bg-white/10 backdrop-blur-md border border-white/20 text-white font-heading text-base md:text-lg font-bold px-8 py-4 rounded hover:bg-white/20 transition-all">
              {t.home.heroBtn2}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}