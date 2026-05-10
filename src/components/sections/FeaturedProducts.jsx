import { motion } from 'framer-motion';

export default function FeaturedProducts() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="bg-white py-16 md:py-24 w-full">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[#1B1C1C] font-heading text-[32px] md:text-[48px] font-extrabold leading-tight max-w-[500px]">
            Materia Prima de Excelencia Superior
          </h2>
          <div className="flex gap-8 md:gap-12 w-full md:w-auto">
            <div>
              <div className="text-[#954500] font-heading text-3xl md:text-4xl font-black mb-1 md:mb-2">24+</div>
              <div className="text-[#71717A] font-body text-xs md:text-sm font-bold tracking-widest uppercase">Países de Destino</div>
            </div>
            <div>
              <div className="text-[#954500] font-heading text-3xl md:text-4xl font-black mb-1 md:mb-2">15k</div>
              <div className="text-[#71717A] font-body text-xs md:text-sm font-bold tracking-widest uppercase">Toneladas Anuales</div>
            </div>
          </div>
        </motion.div>

        {/* Asymmetric Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Mango Card (Large) */}
          <motion.div variants={itemVariants} className="md:col-span-7 h-[350px] md:h-[480px] rounded-2xl overflow-hidden relative group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <h3 className="text-white font-heading text-2xl md:text-3xl font-bold mb-2 md:mb-4">Mango Kent & Tommy</h3>
              <p className="text-white/80 font-body text-sm md:text-lg max-w-[400px]">
                Procesamiento premium con tecnologías de maduración controlada y empaque de alta seguridad.
              </p>
            </div>
          </motion.div>

          {/* Right Column Stack */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Legumes Card */}
            <motion.div variants={itemVariants} className="h-[200px] md:h-[260px] rounded-2xl overflow-hidden relative group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515589654515-32e6fb1bf6b5?q=80&w=800&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className="text-white font-heading text-xl md:text-2xl font-bold mb-2">Legumbres y Granos</h3>
                <p className="text-white/80 font-body text-sm max-w-[300px]">
                  Pureza garantizada y trazabilidad total desde el origen.
                </p>
              </div>
            </motion.div>

            {/* Certifications Card */}
            <motion.div variants={itemVariants} className="min-h-[160px] md:h-[196px] rounded-2xl bg-[#E4E2E1] p-6 md:p-8 flex flex-col justify-between">
              <div className="flex gap-4 mb-4 md:mb-0">
                <div className="w-12 h-1 bg-[#954500] rounded-full" />
              </div>
              <div>
                <h3 className="text-[#1B1C1C] font-heading text-xl md:text-2xl font-bold mb-2">Certificaciones Globales</h3>
                <p className="text-[#554339] font-body text-xs md:text-sm">
                  Cumplimos con las normativas BRC, Global GAP y SMETA, asegurando prácticas sostenibles y éticas en cada paso.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
