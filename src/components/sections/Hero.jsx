import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative w-full h-[819px] overflow-hidden flex items-center">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595841696677-647d7c1775a7?q=80&w=2000&auto=format&fit=crop')" }} 
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FBF9F8] via-[#FBF9F8]/60 to-transparent z-10" />

      {/* Content */}
      <div className="max-w-[1280px] w-full mx-auto px-12 relative z-20">
        <motion.div 
          className="max-w-[650px] flex flex-col gap-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Tag */}
          <div className="bg-[#954500] text-white font-body text-xs font-bold px-3 py-1 uppercase tracking-wider w-fit rounded-sm shadow-sm">
            GLOBAL AGRO-INDUSTRIAL LEADER
          </div>

          {/* Headline */}
          <h1 className="text-[#1B1C1C] font-heading text-[72px] leading-[1.1] font-extrabold tracking-tight">
            La Esencia del Campo, Exportada al Mundo.
          </h1>

          {/* Description */}
          <p className="text-[#554339] font-body text-xl leading-relaxed max-w-[580px]">
            Transformamos la riqueza de la tierra peruana en productos de calidad internacional. Especialistas en procesamiento y logística global de mangos y legumbres.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Link to="/contacto" className="bg-[#954500] text-white font-heading text-lg font-bold px-8 py-4 rounded shadow-md hover:bg-[#803a00] hover:shadow-lg transition-all">
              Contact Sales
            </Link>
            <Link to="/productos" className="bg-white/40 backdrop-blur-md border border-white/50 text-[#1B1C1C] font-heading text-lg font-bold px-8 py-4 rounded hover:bg-white/60 transition-all">
              Nuestros Productos
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
