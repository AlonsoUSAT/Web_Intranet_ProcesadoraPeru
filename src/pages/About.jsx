import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <Helmet>
        <title>Nosotros - Procesadora Perú</title>
        <meta name="description" content="Conoce nuestra historia, misión y visión en la transformación del agro peruano para el mundo." />
      </Helmet>

      {/* Main Wrapper */}
      <div className="w-full flex flex-col items-center overflow-x-hidden pt-[93px]">

        {/* 1. Hero Editorial Section */}
        <section className="relative w-full min-h-[calc(100vh-93px)] lg:h-[819px] flex items-center bg-[#FBF9F8]">
          {/* Image & Gradient */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1426&auto=format&fit=crop')" }} 
          />
          <div 
            className="absolute inset-0" 
            style={{ background: "linear-gradient(90deg, #FBF9F8 0%, rgba(251, 249, 248, 0.7) 50%, rgba(251, 249, 248, 0) 100%)" }} 
          />

          {/* Text Container */}
          <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 relative z-10">
            <motion.div 
              className="max-w-[763px] flex flex-col items-start gap-6 md:gap-[32px] py-12 md:py-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* NUESTRA IDENTIDAD Badge */}
              <div className="bg-[#AEF27A] rounded-[12px] px-4 py-1.5 flex items-center shadow-sm">
                <span className="text-[#377000] font-['Inter'] text-xs md:text-[14px] font-[600] tracking-widest uppercase">
                  Nuestra Identidad
                </span>
              </div>
              
              {/* Heading 1 */}
              <h1 className="text-[#1B1C1C] font-['Manrope'] text-[40px] md:text-[72px] font-[800] leading-[1.1] m-0">
                Elevando la Tierra a<br className="hidden md:block" /> un <span className="text-[#B55C1C]">Estándar Global.</span>
              </h1>
              
              {/* Paragraph */}
              <p className="text-[#554339] font-['Inter'] text-lg md:text-[20px] font-normal leading-relaxed m-0 max-w-[664px]">
                En Procesadora Perú SAC, transformamos la riqueza del agro peruano en soluciones industriales de alta precisión para los mercados más exigentes del mundo.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. Section - History & Mission */}
        <section className="relative w-full bg-[#FBF9F8] py-16 md:py-32">
          <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Left Column (Image & Badge) */}
            <div className="w-full lg:w-1/2 relative h-[400px] md:h-[593px]">
              <div 
                className="absolute inset-0 rounded-[8px] bg-cover bg-center shadow-sm"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595841696677-647d7c1775a7?q=80&w=800&auto=format&fit=crop')" }}
              />
              
              {/* Overlay+Shadow Badge */}
              <motion.div 
                className="absolute -bottom-6 -right-2 md:bottom-auto md:top-[70%] md:-right-12 w-[220px] md:w-[276px] bg-[#B55C1C] rounded-[8px] shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),_0px_20px_25px_-5px_rgba(0,0,0,0.1)] p-6 md:p-10 z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-[#FFFBFF] font-['Manrope'] text-[40px] md:text-[48px] font-[900] leading-none mb-2">
                  25+
                </div>
                <div className="text-[#FFFBFF] font-['Inter'] text-xs md:text-[14px] font-[600] tracking-widest uppercase leading-tight">
                  Años de Excelencia
                </div>
              </motion.div>
            </div>

            {/* Right Column (Text) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between items-start pt-8 md:pt-0">
              
              {/* Heading & Paragraph */}
              <div className="flex flex-col items-start mb-12">
                <h2 className="text-[#1B1C1C] font-['Manrope'] text-[32px] md:text-[36px] font-[800] leading-tight m-0 mb-4">
                  Nuestra Trayectoria
                </h2>
                <div className="w-[64px] h-[4px] bg-[#B55C1C] mb-6" />
                <p className="text-[#554339] font-['Inter'] text-base md:text-[18px] font-normal leading-relaxed m-0 max-w-[600px]">
                  Fundada con la visión de cerrar la brecha entre el campo y la industria, hemos evolucionado hasta convertirnos en un referente de innovación agro-industrial en el Perú. Nuestra historia es una de compromiso con la calidad y respeto por el origen.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 w-full">
                {/* Mission Column */}
                <div className="flex-1 flex flex-col items-start gap-3">
                  <h3 className="text-[#B55C1C] font-['Manrope'] text-lg md:text-[20px] font-[700] m-0">
                    Misión
                  </h3>
                  <p className="text-[#554339] font-['Inter'] text-sm md:text-[14px] font-normal leading-relaxed m-0">
                    Proveer alimentos procesados de la más alta calidad, garantizando la seguridad alimentaria a través de tecnología de punta y procesos sostenibles.
                  </p>
                </div>

                {/* Vision Column */}
                <div className="flex-1 flex flex-col items-start gap-3">
                  <h3 className="text-[#B55C1C] font-['Manrope'] text-lg md:text-[20px] font-[700] m-0">
                    Visión
                  </h3>
                  <p className="text-[#554339] font-['Inter'] text-sm md:text-[14px] font-normal leading-relaxed m-0">
                    Ser el socio estratégico preferido a nivel internacional para la exportación de productos agroindustriales peruanos con valor agregado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Section - Services: Bento Grid Layout */}
        <section className="w-full bg-[#F6F3F2] py-16 md:py-24">
          <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 flex flex-col gap-12">
            
            {/* Header */}
            <div className="flex flex-col items-center md:items-start lg:items-center gap-4">
              <h2 className="text-[#1B1C1C] font-['Manrope'] text-[32px] md:text-[48px] font-[900] leading-tight text-center md:text-left lg:text-center m-0">
                Nuestras Líneas de Producción
              </h2>
              <p className="text-[#554339] font-['Inter'] text-base md:text-[18px] text-center md:text-left lg:text-center m-0">
                Tecnología avanzada aplicada a la conservación de la frescura natural.
              </p>
            </div>

            {/* Grid */}
            <div className="flex flex-col lg:flex-row gap-8 w-full min-h-[400px] md:min-h-[600px]">
              
              {/* IQF Frozen Card */}
              <motion.div 
                className="relative w-full lg:w-[57%] h-[400px] md:h-[600px] bg-white rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1635328849767-422fc9b08f43?q=80&w=800&auto=format&fit=crop')" }}
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(0deg, rgba(24, 24, 27, 0.9) 0%, rgba(24, 24, 27, 0.4) 50%, rgba(24, 24, 27, 0) 100%)" }}
                />
                
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col gap-4 z-10">
                  <h3 className="text-[#FFFFFF] font-['Manrope'] text-[28px] md:text-[36px] font-[800] leading-tight m-0">
                    Congelados IQF
                  </h3>
                  <p className="text-[#FFFFFF] font-['Inter'] text-sm md:text-[16px] leading-relaxed m-0 max-w-[480px]">
                    Sistema de Congelación Rápida Individual que preserva la estructura celular, el sabor y los nutrientes de cada pieza sin aditivos.
                  </p>
                  <div className="flex items-center gap-2 cursor-pointer mt-2 md:mt-4">
                    <span className="text-[#FFB68B] font-['Inter'] text-sm md:text-[16px] font-[700]">Explorar detalles</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.3335 8H12.6668" stroke="#FFB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#FFB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Canned Card */}
              <motion.div 
                className="relative w-full lg:w-[43%] h-[400px] md:h-[600px] bg-white rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599307767316-776abeddebc8?q=80&w=600&auto=format&fit=crop')" }}
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(0deg, rgba(24, 24, 27, 0.9) 0%, rgba(24, 24, 27, 0.4) 50%, rgba(24, 24, 27, 0) 100%)" }}
                />
                
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col gap-4 z-10">
                  <h3 className="text-[#FFFFFF] font-['Manrope'] text-[28px] md:text-[36px] font-[800] leading-tight m-0">
                    Conservas
                  </h3>
                  <p className="text-[#FFFFFF] font-['Inter'] text-sm md:text-[16px] leading-relaxed m-0 max-w-[320px]">
                    Enlatados de alta calidad con procesos térmicos controlados para máxima durabilidad y frescura.
                  </p>
                  <div className="flex items-center gap-2 cursor-pointer mt-2 md:mt-4">
                    <span className="text-[#FFB68B] font-['Inter'] text-sm md:text-[16px] font-[700]">Ver catálogo</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.3335 8H12.6668" stroke="#FFB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#FFB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 4. Stats Section */}
        <section className="w-full bg-[#FBF9F8] border-t border-[#E4E4E7] py-16 md:py-24">
          <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
            
            <div className="flex flex-col items-center gap-2">
              <span className="text-[#954500] font-['Manrope'] text-[40px] md:text-[60px] font-[900] leading-none m-0">
                50k
              </span>
              <span className="text-[#554339] font-['Inter'] text-[10px] md:text-[12px] font-[700] tracking-widest uppercase m-0">
                TN Anuales
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[#954500] font-['Manrope'] text-[40px] md:text-[60px] font-[900] leading-none m-0">
                12
              </span>
              <span className="text-[#554339] font-['Inter'] text-[10px] md:text-[12px] font-[700] tracking-widest uppercase m-0">
                Países Destino
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[#954500] font-['Manrope'] text-[40px] md:text-[60px] font-[900] leading-none m-0">
                100%
              </span>
              <span className="text-[#554339] font-['Inter'] text-[10px] md:text-[12px] font-[700] tracking-widest uppercase m-0">
                Trazabilidad
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[#954500] font-['Manrope'] text-[32px] md:text-[60px] font-[900] leading-none m-0">
                HACCP
              </span>
              <span className="text-[#554339] font-['Inter'] text-[10px] md:text-[12px] font-[700] tracking-widest uppercase m-0">
                Certificación
              </span>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
