import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts } from '../services/api';
// 1. Importamos el contexto de idioma
import { useLanguage } from '../context/LanguageContext';

// Mapeo temporal de imágenes Unsplash para los productos mockeados
const productImages = {
  1: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=800&auto=format&fit=crop', // Mango
  2: 'https://plus.unsplash.com/premium_photo-1722691370600-18315542e96c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Maracuyá
  3: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=800&auto=format&fit=crop', // Fresa
  4: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=800&auto=format&fit=crop', // Arándano
  5: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Palta
  6: 'https://plus.unsplash.com/premium_photo-1725384940646-ef6aa8c2a091?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  // Frijol de Palo
};

// Mapeo temporal de variedades para los botones
const productVarieties = {
  1: [{ name: 'Mango', id: '1' }],
  2: [{ name: 'Maracuyá', id: '2' }],
  3: [{ name: 'Fresa', id: '3' }],
  4: [{ name: 'Arándano', id: '4' }],
  5: [{ name: 'Palta', id: '5' }],
  6: [{ name: 'Frijol de Palo', id: '6' }]
};

export default function Products() {
  // 2. Inicializamos la traducción
  const { t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProductId, setSelectedProductId] = useState('all');

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  // Derived state - SOLO filtra por categoría para el Grid
  const filteredProducts = products.filter(p => {
    return activeCategory === 'Todos' || p.category === activeCategory;
  });

  // El showcase mostrará el producto seleccionado en el dropdown, o el primero por defecto
  const showcaseProduct = products.find(p => p.id.toString() === selectedProductId) || products[0];

  return (
    <>
      <Helmet>
        <title>{t.productos.pageTitle}</title>
        <meta name="description" content={t.productos.metaDesc} />
      </Helmet>

      {/* Main Wrapper */}
      <div className="w-full bg-[#FAFAFA] min-h-screen pt-[30px] pb-16 font-body">

        {/* --- CONTROLES SUPERIORES (Filtros y Selector Premium) --- */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-12 flex flex-col lg:flex-row justify-between items-center gap-6">

          {/* Categorías */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full lg:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  const firstProductOfCategory = products.find(p =>
                    category === 'Todos' ? true : p.category === category
                  );
                  if (firstProductOfCategory) {
                    setSelectedProductId(firstProductOfCategory.id.toString());
                  }
                }}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all ${activeCategory === category
                  ? 'bg-[#954500] text-white'
                  : 'bg-white text-[#554339] border border-gray-200 hover:border-[#954500]'
                  }`}
              >
                {category === 'Todos' ? t.productos.all : (t.productos[`cat${category}`] || category)}
              </button>
            ))}
          </div>

          {/* Selector Premium (Dropdown) */}
          <div className="relative group w-full lg:min-w-[320px] lg:w-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                document.getElementById('showcase-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full appearance-none bg-white border border-[#E4E4E7] text-[#1B1C1C] font-semibold text-base md:text-sm rounded-full py-4 md:py-3 pl-12 pr-10 outline-none transition-all focus:border-[#954500] focus:ring-2 focus:ring-[#954500]/20 shadow-sm cursor-pointer"
            >
              <option value="all">{t.productos.searchPlaceholder}</option>
              {products
                .filter(p => activeCategory === 'Todos' || p.category === activeCategory)
                .map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>

        {/* --- CATÁLOGO GRID (Ahora arriba del Showcase) --- */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-16 md:mb-24">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-[#F4F4F5] border-t-[#954500] rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-[#1B1C1C] font-heading text-xl md:text-2xl font-bold">
                  {/* CAMBIO DE TEXTO AQUÍ */}
                  {t.productos.ourProducts || 'Nuestros Productos'}
                </h2>
                <div className="h-px bg-[#E4E4E7] flex-1"></div>
              </div>

              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-[#E4E4E7] rounded-xl overflow-hidden group hover:shadow-xl transition-all cursor-pointer flex flex-col"
                      onClick={() => {
                        setSelectedProductId(product.id.toString());
                        setQuantity(1);
                        // MAGIA AQUÍ: Ahora hace scroll hacia abajo, directo al detalle del producto
                        document.getElementById('showcase-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {/* Image Container */}
                      <div className="h-[240px] w-full overflow-hidden relative shrink-0">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('${productImages[product.id] || product.image}')`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1B1C1C] text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider shadow-sm">
                          {t.productos[`cat${product.category}`] || product.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <h3 className="text-[#1B1C1C] font-heading text-lg md:text-xl font-bold mb-2 group-hover:text-[#954500] transition-colors">
                          {/* Dependiendo del idioma, elige el nombre en ES o EN */}
                          {language === 'en' ? product.name_en : product.name_es}
                        </h3>
                        <p className="text-[#554339] font-body text-sm mb-4 line-clamp-2 flex-grow">
                          {language === 'en' ? product.description_en : product.description_es}
                        </p>
                        <div className="flex items-center gap-2 pt-4 border-t border-[#F4F4F5] mt-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          <span className="text-[#71717A] font-body text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                            {language === 'en' ? product.origin_en : product.origin_es}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {!isLoading && filteredProducts.length === 0 && (
                <div className="text-center py-24 bg-white rounded-xl border border-[#E4E4E7]">
                  <p className="text-[#71717A] text-base md:text-lg font-body">{t.productos.noProducts}</p>
                  <button
                    onClick={() => { setActiveCategory('Todos'); setSelectedProductId('all'); }}
                    className="mt-4 text-[#954500] font-bold hover:underline"
                  >
                    {t.productos.viewAll}
                  </button>
                </div>
              )}
            </>
          )}
        </div>


        {/* --- SHOWCASE DEL PRODUCTO (Detalles Ampliados) --- */}
        {!isLoading && showcaseProduct && (
          <motion.div
            id="showcase-section" // <--- Agregamos este ID para que el clic baje hasta aquí
            key={showcaseProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-12"
          >
            {/* 1. Header Showcase */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Imagen Izquierda */}
              <div className="w-full lg:w-3/5 relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-sm">

                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${productImages[showcaseProduct.id] || showcaseProduct.image}')` }}
                />

                <div className="absolute bottom-4 right-4 bg-[#AEF27A] rounded-lg shadow-md px-4 py-2 md:px-5 md:py-3 flex items-center gap-2 z-10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#377000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-[#377000] font-heading font-bold text-xs md:text-sm leading-tight block">
                    {t.productos.exportGrade}
                  </span>
                </div>

              </div>

              {/* Contenido Derecha */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center pt-8 md:pt-0">
                <div className="bg-[#AEF27A] text-[#377000] font-body text-xs font-bold px-3 py-1.5 rounded-sm w-fit uppercase tracking-wider mb-4 md:mb-6 shadow-sm">
                  {t.productos.premiumHarvest}
                </div>
                <h1 className="text-[#1B1C1C] font-heading text-[40px] md:text-[48px] lg:text-[56px] font-extrabold leading-[1.1] mb-4 md:mb-6 tracking-tight">
                  {language === 'en' ? showcaseProduct.name_en : showcaseProduct.name_es}
                </h1>
                <p className="text-[#554339] font-body text-base md:text-lg leading-relaxed mb-8">
                  {language === 'en' ? showcaseProduct.description_en : showcaseProduct.description_es} {t.productos.cultivatedText}
                </p>

                {/* Pricing Card */}
                <div className="bg-[#F6F3F2] rounded-xl p-6 md:p-8 border border-[#E4E4E7]">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[#71717A] font-body text-[10px] md:text-xs font-bold tracking-widest uppercase">{t.productos.wholesale1}<br />{t.productos.wholesale2}</span>
                    <div className="text-right">
                      <span className="text-[#954500] font-heading text-xl md:text-2xl font-extrabold block">{t.productos.contactPrice}</span>
                      <span className="text-[#71717A] font-body text-xs">{t.productos.fobCif}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-[#1B1C1C] font-body text-[10px] md:text-xs font-bold tracking-wider uppercase mb-3 block">{t.productos.varietySelection}</span>
                    <div className="grid grid-cols-2 gap-3">

                      {productVarieties[showcaseProduct.id]?.map((variedad, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedProductId(variedad.id);
                            setQuantity(1);
                          }} className={`py-3 md:py-2.5 rounded-sm font-semibold shadow-sm transition-colors ${showcaseProduct.id.toString() === variedad.id
                            ? 'border-2 border-[#954500] text-[#954500] bg-white'
                            : 'border border-[#D4D4D8] text-[#52525B] bg-white hover:border-[#954500]'
                            }`}
                        >
                          {variedad.name}
                        </button>
                      ))}

                    </div>
                  </div>
                  <div className="mb-8">
                    <span className="text-[#1B1C1C] font-body text-[10px] md:text-xs font-bold tracking-wider uppercase mb-3 block">{t.productos.quantity}</span>
                    <div className="flex items-center justify-between bg-white border border-[#D4D4D8] rounded-sm py-3 md:py-2 px-4 shadow-sm">
                      <button
                        onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                        className="text-[#954500] font-bold text-2xl md:text-xl hover:scale-110 transition-transform w-10 h-10 flex items-center justify-center cursor-pointer"
                      >
                        −
                      </button>

                      <span className="font-heading font-bold text-lg">{quantity}</span>

                      <button
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="text-[#954500] font-bold text-2xl md:text-xl hover:scale-110 transition-transform w-10 h-10 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button className="w-full bg-[#954500] text-white font-bold py-4 rounded-sm flex justify-center items-center gap-2 hover:bg-[#7a3800] transition-colors shadow-md text-lg md:text-base">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                    {t.productos.addToQuote}
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Technical Data Sheet */}
            <div className="bg-[#EBEBEB] rounded-2xl p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="w-full lg:w-1/3">
                <h2 className="text-[#1B1C1C] font-heading text-[28px] md:text-[32px] font-extrabold mb-4">{t.productos.techDataSheet}</h2>
                <p className="text-[#554339] font-body text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                  {t.productos.techDesc}
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between border-b border-[#D4D4D8] pb-3">
                    <span className="font-bold text-[#1B1C1C] text-sm">{t.productos.techRow1Lbl}</span>
                    <span className="text-[#554339] text-sm text-right">{t.productos.techRow1Val}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D4D4D8] pb-3">
                    <span className="font-bold text-[#1B1C1C] text-sm">{t.productos.techRow2Lbl}</span>
                    <span className="text-[#554339] text-sm text-right">{t.productos.techRow2Val}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D4D4D8] pb-3">
                    <span className="font-bold text-[#1B1C1C] text-sm">{t.productos.techRow3Lbl}</span>
                    <span className="text-[#554339] text-sm text-right">{t.productos.techRow3Val}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D4D4D8] pb-3">
                    <span className="font-bold text-[#1B1C1C] text-sm">{t.productos.techRow4Lbl}</span>
                    <span className="text-[#554339] text-sm text-right">{t.productos.techRow4Val}</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-2/3 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Packaging Options */}
                  <div className="flex-1 bg-white rounded-xl p-6 md:p-8 shadow-sm">
                    <svg className="mb-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    <h3 className="font-heading font-bold text-lg mb-4 text-[#1B1C1C]">{t.productos.packagingOptions}</h3>
                    <ul className="text-sm text-[#554339] space-y-3">
                      <li className="flex items-start gap-2"><span className="text-[#954500] mt-1">•</span> {t.productos.packOpt1}</li>
                      <li className="flex items-start gap-2"><span className="text-[#954500] mt-1">•</span> {t.productos.packOpt2}</li>
                      <li className="flex items-start gap-2"><span className="text-[#954500] mt-1">•</span> {t.productos.packOpt3}</li>
                    </ul>
                  </div>
                  {/* Storage */}
                  <div className="flex-1 bg-white rounded-xl p-6 md:p-8 shadow-sm">
                    <svg className="mb-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
                    <h3 className="font-heading font-bold text-lg mb-4 text-[#1B1C1C]">{t.productos.storageLogistics}</h3>
                    <p className="text-sm text-[#554339] leading-relaxed">
                      {t.productos.storageDesc}
                    </p>
                  </div>
                </div>

                {/* Seasonal Availability */}
                <div className="w-full bg-white rounded-xl p-6 md:p-8 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 mb-6">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <h3 className="font-heading font-bold text-lg text-[#1B1C1C]">{t.productos.seasonalAvail}</h3>
                  </div>
                  {/* Scrollable container for mobile */}
                  <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex justify-between items-center min-w-[500px] w-full">
                      {t.productos.months.map((month, i) => (
                        <div key={month} className="flex flex-col items-center gap-3 min-w-[40px]">
                          <span className="text-[10px] font-bold text-[#1B1C1C] uppercase">{month}</span>
                          <div className={`w-6 h-6 rounded-full ${[2, 3, 4, 5].includes(i) ? 'bg-[#954500]' : (i === 1 || i === 6) ? 'bg-[#D4A373]' : 'bg-[#E4E4E7]'}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-[#A1A1AA] mt-2 italic">{t.productos.seasonalNote}</p>
                </div>
              </div>
            </div>

            {/* 3. Industrial Precision Section */}
            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center pt-8">
              <div className="w-full lg:w-1/2">
                <h2 className="text-[#1B1C1C] font-heading text-[28px] md:text-[32px] lg:text-[40px] font-extrabold leading-tight mb-6">
                  {t.productos.industrialPrecision}
                </h2>
                <p className="text-[#554339] font-body text-sm md:text-base leading-relaxed mb-6">
                  {/* MAGIA AQUÍ: Reemplaza el comodín {name} con el nombre traducido dinámicamente */}
                  {t.productos.industrialDesc1?.replace('{name}', language === 'en' ? showcaseProduct.name_en : showcaseProduct.name_es) || `En Procesadora Perú SAC, nuestras variedades de ${language === 'en' ? showcaseProduct.name_en : showcaseProduct.name_es} representan la cúspide de la tecnología agroindustrial.`}
                </p>
                <p className="text-[#554339] font-body text-sm md:text-base leading-relaxed mb-8 md:mb-10">
                  {t.productos.industrialDesc2}
                </p>

                <div className="flex gap-8 md:gap-12">
                  <div>
                    <span className="text-[#377000] font-heading font-black text-2xl md:text-3xl block mb-1">100%</span>
                    <span className="text-[#1B1C1C] font-body text-[10px] md:text-xs font-bold uppercase tracking-wider">{t.productos.organicCert}</span>
                  </div>
                  <div>
                    <span className="text-[#377000] font-heading font-black text-2xl md:text-3xl block mb-1">Global</span>
                    <span className="text-[#1B1C1C] font-body text-[10px] md:text-xs font-bold uppercase tracking-wider">{t.productos.globalGap}</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div
                  className="w-full h-[250px] md:h-[350px] rounded-2xl bg-cover bg-center shadow-lg"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595841696677-647d7c1775a7?q=80&w=1000&auto=format&fit=crop')" }}
                />
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </>
  );
}