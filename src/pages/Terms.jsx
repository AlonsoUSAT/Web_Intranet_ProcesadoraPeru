import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';

export default function Terms() {
  const { t } = useLanguage();

  return (
    <section className="bg-white text-[#18181B] py-20 px-6 md:px-12">
      <Helmet>
        <title>{t.terminosCondiciones.titulo} | Procesadora Perú</title>
      </Helmet>

      <div className="max-w-[800px] mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4 text-[#954500]">
          {t.terminosCondiciones.titulo}
        </h1>
        <p className="text-[#52525B] text-sm font-medium mb-10 border-b border-[#E4E4E7] pb-6">
          {t.terminosCondiciones.actualizacion}
        </p>

        <div className="space-y-8 font-sans text-base leading-relaxed text-[#3F3F46]">
          <p className="font-medium text-lg">
            {t.terminosCondiciones.intro}
          </p>

          {t.terminosCondiciones.secciones.map((seccion, index) => (
            <div key={index} className="pt-4">
              <h2 className="font-heading text-xl font-bold text-[#18181B] mb-3">
                {seccion.subtitulo}
              </h2>
              <p>
                {seccion.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}