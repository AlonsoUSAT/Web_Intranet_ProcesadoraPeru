import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <Helmet>
        <title>Nosotros - Procesadora Perú</title>
        <meta name="description" content="Conoce nuestra historia, misión y visión en la transformación del agro peruano para el mundo." />
      </Helmet>

      {/* Main Wrapper to maintain 1426px absolute positioning but centered on larger screens */}
      <div className="w-full bg-[#FBF9F8] flex flex-col items-center overflow-x-hidden">

        {/* 1. Hero Editorial Section (1426x819) */}
        <section className="relative w-[1426px] h-[819px] shrink-0">
          {/* Image & Gradient */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1426&auto=format&fit=crop')" }} 
          />
          <div 
            className="absolute inset-0" 
            style={{ background: "linear-gradient(90deg, #FBF9F8 0%, rgba(251, 249, 248, 0.4) 50%, rgba(251, 249, 248, 0) 100%)" }} 
          />

          {/* Text Container (763x381, left: 48, top: 234) */}
          <motion.div 
            className="absolute top-[234px] left-[48px] w-[763px] h-[381px] flex flex-col justify-between items-start gap-[32px] z-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* NUESTRA IDENTIDAD Badge (202x32, radius 12) */}
            <div className="w-[202px] h-[32px] bg-[#AEF27A] rounded-[12px] flex items-center pl-[16px]">
              <span className="text-[#377000] font-['Inter'] text-[14px] font-[600] leading-[20px] tracking-widest">
                NUESTRA IDENTIDAD
              </span>
            </div>
            
            {/* Heading 1 */}
            <div className="w-[763px] h-[187px] relative">
              <h1 className="absolute top-0 left-0 text-[#1B1C1C] font-['Manrope'] text-[72px] font-[800] leading-[79px] m-0">
                Elevando la Tierra a<br/>un <span className="text-[#B55C1C]">Estándar Global.</span>
              </h1>
            </div>
            
            {/* Paragraph Container (672x98) */}
            <div className="w-[672px] h-[98px] relative">
              <p className="absolute top-0 left-0 w-[664px] h-[98px] text-[#554339] font-['Inter'] text-[20px] font-normal leading-[33px] m-0">
                En Procesadora Perú SAC, transformamos la riqueza del agro peruano<br/>en soluciones industriales de alta precisión para los mercados más<br/>exigentes del mundo.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 2. Section - History & Mission: Asymmetric Layout (1426x849) */}
        <section className="relative w-[1426px] h-[849px] bg-[#FBF9F8] shrink-0">
          
          {/* Main Asymmetric Container (1426x593, top: 128) */}
          <div className="absolute top-[128px] left-0 w-[1426px] h-[593px]">
            
            {/* Left Column (Image & Badge) - left: 48, w: 536, h: 593 */}
            <div className="absolute left-[48px] top-0 w-[536px] h-[593px]">
              <div 
                className="absolute inset-0 rounded-[8px] bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595841696677-647d7c1775a7?q=80&w=800&auto=format&fit=crop')" }}
              />
              
              {/* Overlay+Shadow Badge (left: 292, top: 453, w: 276, h: 172) */}
              <motion.div 
                className="absolute left-[292px] top-[453px] w-[276px] h-[172px] bg-[#B55C1C] rounded-[8px] shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),_0px_20px_25px_-5px_rgba(0,0,0,0.1)] z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Text 25+ */}
                <div className="absolute left-[48px] top-[48px] w-[180px] h-[48px]">
                  <span className="absolute top-0 left-0 text-[#FFFBFF] font-['Manrope'] text-[48px] font-[900] leading-[48px]">
                    25+
                  </span>
                </div>
                {/* Text AÑOS DE EXCELENCIA */}
                <div className="absolute left-[48px] top-[104px] w-[180px] h-[20px]">
                  <span className="absolute top-0 left-0 text-[#FFFBFF] font-['Inter'] text-[14px] font-[600] leading-[20px] tracking-widest uppercase">
                    Años de Excelencia
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column (Text) - left: 729, w: 649, h: 593, padding: 89px 0px */}
            <div className="absolute left-[729px] top-[89px] w-[649px] h-[415px] flex flex-col justify-between items-start">
              
              {/* Heading & Paragraph Container (649x209, gap 24) */}
              <div className="w-[649px] h-[209px] flex flex-col justify-between items-start">
                <div className="w-[649px] h-[40px] relative">
                  <h2 className="absolute top-0 left-0 text-[#1B1C1C] font-['Manrope'] text-[36px] font-[800] leading-[40px] m-0">
                    Nuestra Trayectoria
                  </h2>
                </div>
                {/* Divider */}
                <div className="w-[64px] h-[4px] bg-[#B55C1C] mt-[-10px]" />
                {/* Paragraph */}
                <div className="w-[649px] h-[117px] relative">
                  <p className="absolute top-0 left-0 w-[649px] h-[117px] text-[#554339] font-['Inter'] text-[18px] font-normal leading-[29px] m-0">
                    Fundada con la visión de cerrar la brecha entre el campo y la<br/>industria, hemos evolucionado hasta convertirnos en un referente<br/>de innovación agro-industrial en el Perú. Nuestra historia es una de<br/>compromiso con la calidad y respeto por el origen.
                  </p>
                </div>
              </div>

              {/* Mission & Vision Container (649x158, gap 48) */}
              <div className="w-[649px] h-[158px] flex gap-[48px] justify-between items-start mt-[48px]">
                
                {/* Mission Column (301x158) */}
                <div className="w-[301px] h-[158px] flex flex-col items-start gap-[16px]">
                  <h3 className="text-[#B55C1C] font-['Manrope'] text-[20px] font-[700] leading-[28px] m-0">
                    Misión
                  </h3>
                  <p className="w-[301px] text-[#554339] font-['Inter'] text-[14px] font-normal leading-[23px] m-0">
                    Proveer alimentos procesados de la<br/>más alta calidad, garantizando la<br/>seguridad alimentaria a través de<br/>tecnología de punta y procesos<br/>sostenibles.
                  </p>
                </div>

                {/* Vision Column (301x158) */}
                <div className="w-[301px] h-[158px] flex flex-col items-start gap-[16px]">
                  <h3 className="text-[#B55C1C] font-['Manrope'] text-[20px] font-[700] leading-[28px] m-0">
                    Visión
                  </h3>
                  <p className="w-[301px] text-[#554339] font-['Inter'] text-[14px] font-normal leading-[23px] m-0">
                    Ser el socio estratégico preferido a nivel<br/>internacional para la exportación de<br/>productos agroindustriales peruanos<br/>con valor agregado.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 3. Section - Services: Bento Grid Layout (1426x1012) */}
        <section className="relative w-[1426px] h-[1012px] bg-[#F6F3F2] shrink-0">
          <div className="absolute top-[128px] left-[48px] w-[1330px] h-[756px]">
            
            {/* Header */}
            <div className="w-[1330px] h-[92px] flex flex-col items-center gap-[16px]">
              <h2 className="text-[#1B1C1C] font-['Manrope'] text-[48px] font-[900] leading-[48px] text-center m-0">
                Nuestras Líneas de Producción
              </h2>
              <p className="text-[#554339] font-['Inter'] text-[18px] leading-[28px] text-center m-0">
                Tecnología avanzada aplicada a la conservación de la frescura natural.
              </p>
            </div>

            {/* Grid */}
            <div className="absolute top-[156px] left-0 w-[1330px] h-[600px] flex gap-[32px]">
              
              {/* IQF Frozen Card (763x600) */}
              <motion.div 
                className="relative w-[763px] h-[600px] bg-white rounded-[8px] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1635328849767-422fc9b08f43?q=80&w=800&auto=format&fit=crop')" }}
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(0deg, rgba(24, 24, 27, 0.9) 0%, rgba(24, 24, 27, 0.2) 50%, rgba(24, 24, 27, 0) 100%)" }}
                />
                
                <div className="absolute left-[40px] top-[386px] w-[683px] h-[174px] flex flex-col gap-[16px] z-10">
                  <h3 className="text-[#FFFFFF] font-['Manrope'] text-[36px] font-[800] leading-[40px] m-0">
                    Congelados IQF
                  </h3>
                  <p className="w-[438px] text-[#FFFFFF] font-['Inter'] text-[16px] leading-[26px] m-0">
                    Sistema de Congelación Rápida Individual que preserva la<br/>estructura celular, el sabor y los nutrientes de cada pieza<br/>sin aditivos.
                  </p>
                  <div className="flex items-center gap-[8px] cursor-pointer mt-auto">
                    <span className="text-[#FFB68B] font-['Inter'] text-[16px] font-[700] leading-[24px]">Explorar detalles</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.3335 8H12.6668" stroke="#FFB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#FFB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Canned Card (536x600) */}
              <motion.div 
                className="relative w-[536px] h-[600px] bg-white rounded-[8px] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599307767316-776abeddebc8?q=80&w=600&auto=format&fit=crop')" }}
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(0deg, rgba(24, 24, 27, 0.9) 0%, rgba(24, 24, 27, 0.2) 50%, rgba(24, 24, 27, 0) 100%)" }}
                />
                
                <div className="absolute left-[40px] top-[386px] w-[456px] h-[174px] flex flex-col gap-[16px] z-10">
                  <h3 className="text-[#FFFFFF] font-['Manrope'] text-[36px] font-[800] leading-[40px] m-0">
                    Conservas
                  </h3>
                  <p className="w-[296px] text-[#FFFFFF] font-['Inter'] text-[16px] leading-[26px] m-0">
                    Enlatados de alta calidad con procesos<br/>térmicos controlados para máxima<br/>durabilidad y frescura.
                  </p>
                  <div className="flex items-center gap-[8px] cursor-pointer mt-auto">
                    <span className="text-[#FFB68B] font-['Inter'] text-[16px] font-[700] leading-[24px]">Ver catálogo</span>
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

        {/* 4. Stats Section: Minimalist & Clean (1426x277) */}
        <section className="relative w-[1426px] h-[277px] bg-[#FBF9F8] border-t border-[rgba(219,193,180,0.2)] shrink-0">
          <div className="absolute top-[97px] left-0 w-[1426px] h-[84px] flex justify-between px-[48px]">
            
            <div className="flex flex-col items-center justify-between w-[297px] h-[84px]">
              <span className="text-[#954500] font-['Manrope'] text-[60px] font-[900] leading-[60px] m-0">
                50k
              </span>
              <span className="text-[#554339] font-['Inter'] text-[12px] font-[700] leading-[16px] tracking-widest m-0 uppercase">
                TN ANUALES
              </span>
            </div>

            <div className="flex flex-col items-center justify-between w-[297px] h-[84px]">
              <span className="text-[#954500] font-['Manrope'] text-[60px] font-[900] leading-[60px] m-0">
                12
              </span>
              <span className="text-[#554339] font-['Inter'] text-[12px] font-[700] leading-[16px] tracking-widest m-0 uppercase">
                PAÍSES DESTINO
              </span>
            </div>

            <div className="flex flex-col items-center justify-between w-[297px] h-[84px]">
              <span className="text-[#954500] font-['Manrope'] text-[60px] font-[900] leading-[60px] m-0">
                100%
              </span>
              <span className="text-[#554339] font-['Inter'] text-[12px] font-[700] leading-[16px] tracking-widest m-0 uppercase">
                TRAZABILIDAD
              </span>
            </div>

            <div className="flex flex-col items-center justify-between w-[297px] h-[84px]">
              <span className="text-[#954500] font-['Manrope'] text-[60px] font-[900] leading-[60px] m-0">
                HACCP
              </span>
              <span className="text-[#554339] font-['Inter'] text-[12px] font-[700] leading-[16px] tracking-widest m-0 uppercase">
                CERTIFICACIÓN
              </span>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
