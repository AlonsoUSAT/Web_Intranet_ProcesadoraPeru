import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t.nosotros.pageTitle}</title>
        <meta name="description" content={t.nosotros.metaDesc} />
      </Helmet>

      {/* Main Wrapper: ¡Le quitamos el pt-[93px] de aquí! */}
      <div className="w-full flex flex-col items-center overflow-x-hidden">

        {/* 1. Hero Editorial Section */}
        {/* Aquí la sección vuelve a ocupar el 100% del alto, pasando por debajo del Navbar */}
        <section className="relative w-full min-h-[100vh] lg:h-[819px] flex items-center bg-[#FBF9F8]">
          
          {/* Image & Gradient (Estos se pegan al techo de la pantalla) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1426&auto=format&fit=crop')" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, #FBF9F8 0%, rgba(251, 249, 248, 0.7) 50%, rgba(251, 249, 248, 0) 100%)" }}
          />

          {/* Text Container: ¡Le agregamos el pt-[93px] AQUÍ para proteger los textos! */}
          <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 relative z-10 pt-[93px]">
            <motion.div
              className="max-w-[763px] flex flex-col items-start gap-6 md:gap-[32px] py-12 md:py-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* NUESTRA IDENTIDAD Badge */}
              <div className="bg-[#AEF27A] rounded-[12px] px-4 py-1.5 flex items-center shadow-sm">
                <span className="text-[#377000] font-heading text-xs md:text-[14px] font-[600] tracking-widest uppercase">
                  {t.nosotros.heroBadge}
                </span>
              </div>

              {/* Heading 1 */}
              <h1 className="text-[#1B1C1C] font-heading text-[40px] md:text-[72px] font-[800] leading-[1.1] m-0">
                {t.nosotros.heroTitle1}<br className="hidden md:block" /> 
                {t.nosotros.heroTitle2}
                <span className="text-[#B55C1C]">{t.nosotros.heroTitleHighlight}</span>
              </h1>

              {/* Paragraph */}
              <p className="text-[#554339] font-body text-lg md:text-[20px] font-normal leading-relaxed m-0 max-w-[664px]">
                {t.nosotros.heroDesc}
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
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop')" }}
              />
              <motion.div
                className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 w-[220px] md:w-[276px] bg-[#B55C1C] rounded-[8px] shadow-lg p-6 md:p-10 z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-[#FFFBFF] font-heading text-[40px] md:text-[48px] font-[900] leading-none mb-2">
                  25+
                </div>
                <div className="text-[#FFFBFF] font-body text-[10px] md:text-[14px] font-[600] tracking-widest uppercase leading-tight">
                  {t.nosotros.yearsExcellence}
                </div>
              </motion.div>
            </div>

            {/* Right Column (Text) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between items-start pt-8 md:pt-0">

              {/* Heading & Paragraph */}
              <div className="flex flex-col items-start mb-12">
                <h2 className="text-[#1B1C1C] font-heading text-[32px] md:text-[36px] font-[800] leading-tight m-0 mb-4">
                  {t.nosotros.historyTitle}
                </h2>
                <div className="w-[64px] h-[4px] bg-[#B55C1C] mb-6" />
                <p className="text-[#554339] font-body text-base md:text-[18px] font-normal leading-relaxed m-0 max-w-[600px]">
                  {t.nosotros.historyDesc}
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 w-full">
                {/* Mission Column */}
                <div className="flex-1 flex flex-col items-start gap-3">
                  <h3 className="text-[#B55C1C] font-heading text-lg md:text-[20px] font-[700] m-0">
                    {t.nosotros.missionTitle}
                  </h3>
                  <p className="text-[#554339] font-body text-sm md:text-[14px] font-normal leading-relaxed m-0">
                    {t.nosotros.missionDesc}
                  </p>
                </div>

                {/* Vision Column */}
                <div className="flex-1 flex flex-col items-start gap-3">
                  <h3 className="text-[#B55C1C] font-heading text-lg md:text-[20px] font-[700] m-0">
                    {t.nosotros.visionTitle}
                  </h3>
                  <p className="text-[#554339] font-body text-sm md:text-[14px] font-normal leading-relaxed m-0">
                    {t.nosotros.visionDesc}
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
              <h2 className="text-[#1B1C1C] font-heading text-[32px] md:text-[48px] font-[900] leading-tight text-center md:text-left lg:text-center m-0">
                {t.nosotros.servicesTitle}
              </h2>
              <p className="text-[#554339] font-body text-base md:text-[18px] text-center md:text-left lg:text-center m-0">
                {t.nosotros.servicesDesc}
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
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop')" }} />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(0deg, rgba(24, 24, 27, 0.9) 0%, rgba(24, 24, 27, 0.4) 50%, rgba(24, 24, 27, 0) 100%)" }}
                />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col gap-4 z-10">
                  <h3 className="text-[#FFFFFF] font-heading text-[28px] md:text-[36px] font-[800] leading-tight m-0">
                    {t.nosotros.iqfTitle}
                  </h3>
                  <p className="text-[#FFFFFF] font-body text-sm md:text-[16px] leading-relaxed m-0 max-w-[480px]">
                    {t.nosotros.iqfDesc}
                  </p>
                  <div className="flex items-center gap-2 cursor-pointer mt-2 md:mt-4">
                    <span className="text-[#FFB68B] font-body text-sm md:text-[16px] font-[700]">{t.nosotros.exploreLink}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.3335 8H12.6668" stroke="#FFB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#FFB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606859191214-25806e8e2423?q=80&w=800&auto=format&fit=crop')" }} />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(0deg, rgba(24, 24, 27, 0.9) 0%, rgba(24, 24, 27, 0.4) 50%, rgba(24, 24, 27, 0) 100%)" }}
                />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col gap-4 z-10">
                  <h3 className="text-[#FFFFFF] font-heading text-[28px] md:text-[36px] font-[800] leading-tight m-0">
                    {t.nosotros.cannedTitle}
                  </h3>
                  <p className="text-[#FFFFFF] font-body text-sm md:text-[16px] leading-relaxed m-0 max-w-[320px]">
                    {t.nosotros.cannedDesc}
                  </p>
                  <div className="flex items-center gap-2 cursor-pointer mt-2 md:mt-4">
                    <span className="text-[#FFB68B] font-body text-sm md:text-[16px] font-[700]">{t.nosotros.catalogLink}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.3335 8H12.6668" stroke="#FFB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#FFB68B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
              <span className="text-[#954500] font-heading text-[40px] md:text-[60px] font-[900] leading-none m-0">
                50k
              </span>
              <span className="text-[#554339] font-body text-[10px] md:text-[12px] font-[700] tracking-widest uppercase m-0">
                {t.nosotros.stat1Label}
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[#954500] font-heading text-[40px] md:text-[60px] font-[900] leading-none m-0">
                12
              </span>
              <span className="text-[#554339] font-body text-[10px] md:text-[12px] font-[700] tracking-widest uppercase m-0">
                {t.nosotros.stat2Label}
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[#954500] font-heading text-[40px] md:text-[60px] font-[900] leading-none m-0">
                100%
              </span>
              <span className="text-[#554339] font-body text-[10px] md:text-[12px] font-[700] tracking-widest uppercase m-0">
                {t.nosotros.stat3Label}
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[#954500] font-heading text-[32px] md:text-[60px] font-[900] leading-none m-0">
                HACCP
              </span>
              <span className="text-[#554339] font-body text-[10px] md:text-[12px] font-[700] tracking-widest uppercase m-0">
                {t.nosotros.stat4Label}
              </span>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}