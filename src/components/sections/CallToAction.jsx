import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-24 bg-white w-full">
      <div className="max-w-[1280px] mx-auto px-12">
        <motion.div 
          className="bg-[#1B1C1C] rounded-[24px] overflow-hidden flex flex-col md:flex-row"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Content Left */}
          <div className="p-16 md:p-24 md:w-1/2 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-white font-heading text-[60px] font-bold leading-tight mb-8">
                Construyamos<br />el Futuro del<br />Agro Peruano.
              </h2>
              <p className="text-[#A1A1AA] font-body text-xl leading-relaxed max-w-[470px] mb-12">
                ¿Busca un socio estratégico para el suministro global de productos agrícolas de alta gama? Nuestro equipo comercial está listo para atender sus requerimientos.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <Link to="/contacto" className="bg-[#954500] text-white font-heading text-lg font-bold px-8 py-4 rounded hover:bg-[#803a00] transition-colors shadow-sm text-center">
                Contactar Ventas
              </Link>
              <div className="flex items-center gap-4 text-[#D4D4D8]">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                  <PhoneCall size={20} />
                </div>
                <span className="font-body text-lg font-semibold tracking-wide">+51 1 555-0123</span>
              </div>
            </div>
          </div>

          {/* Image Right */}
          <div className="md:w-1/2 relative min-h-[400px] md:min-h-[697px]">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1000&auto=format&fit=crop')" }}
            />
            {/* Orange Overlay */}
            <div className="absolute inset-0 bg-[#954500]/20 mix-blend-multiply" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
