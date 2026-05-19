import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [captchaState, setCaptchaState] = useState('idle');

  const handleCaptchaClick = () => {
    if (captchaState !== 'idle') return;
    setCaptchaState('loading');

    setTimeout(() => {
      setCaptchaState('verified');
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#659C35] text-white pt-12 pb-16 relative">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* COLUMNA 1: Logo y Libro de Reclamaciones */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex flex-col items-center mb-6">
            <svg className="w-16 h-16 mb-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
              <path d="M2 12h20"></path>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <h2 className="text-2xl font-bold tracking-wide">Procesadora Perú</h2>
          </div>

          <p className="text-sm mb-4 font-medium">{t.footer.desde}</p>

          <Link to="/libro-reclamaciones" className="flex items-center gap-3 hover:opacity-80 transition-opacity" onClick={scrollToTop}>
            <div className="bg-white text-black p-1 rounded-sm w-[60px] h-[45px] flex flex-col justify-center items-center shadow-sm">
              <span className="text-[#0055A4] text-[8px] font-bold leading-none mb-[2px]">{t.footer.libro1}</span>
              <span className="text-[#0055A4] text-[8px] font-bold leading-none mb-1">{t.footer.libro2}</span>
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
            </div>
            <span className="font-bold text-sm tracking-wide">{t.footer.libro3}</span>
          </Link>
        </div>

        {/* COLUMNA 2: Contacto Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left pt-2">
          <h3 className="text-lg font-bold mb-6 tracking-wider">{t.footer.contactoTitulo}</h3>

          <ul className="space-y-5 text-sm mb-8 font-medium">
            <li className="flex items-start gap-4">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>{t.footer.direccion}</span>
            </li>
            <li className="flex items-center gap-4">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>074 - 201981</span>
            </li>
            <li className="flex items-center gap-4">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <a href="mailto:exports@procesadoraperu.com" className="hover:underline">exports@procesadoraperu.com</a>
            </li>
          </ul>

          {/* Redes Sociales */}
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/80 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
            <a href="#" className="hover:text-white/80 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a>
          </div>
        </div>

        {/* COLUMNA 3: CTA Creativo y Captcha Funcional */}
        <div className="w-full pt-2">
          <h3 className="text-lg font-bold mb-4 tracking-wider">{t.footer.ayudaTitulo}</h3>
          <p className="text-sm font-medium mb-6 text-white/90">
            {t.footer.ayudaDesc}
          </p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input type="email" placeholder={t.footer.placeholderCorreo} className="w-full bg-transparent border-b border-white py-2 pl-1 pr-8 text-white placeholder-white/70 focus:outline-none focus:border-white transition text-sm font-medium" />
              <svg className="w-4 h-4 absolute right-1 top-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>

            {/* Captcha Interactivo Funcional */}
            <div className="mt-4">
              <div className="bg-[#F9F9F9] border border-[#D3D3D3] rounded-[3px] shadow-sm flex items-center justify-between px-3 py-2 w-[300px] h-[74px]">
                <div className="flex items-center gap-3">
                  <div
                    onClick={handleCaptchaClick}
                    className={`w-7 h-7 flex items-center justify-center rounded-[2px] cursor-pointer transition-all ${captchaState === 'idle' ? 'border-[2px] border-[#C1C1C1] bg-white hover:border-[#B2B2B2]' :
                        captchaState === 'loading' ? 'bg-white' : 'bg-white'
                      }`}
                  >
                    {captchaState === 'loading' && (
                      <svg className="animate-spin w-5 h-5 text-[#4A90E2]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {captchaState === 'verified' && (
                      <svg className="w-6 h-6 text-[#009E5F] drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    )}
                  </div>
                  <span className="text-[#282828] text-[14px] font-sans">{t.footer.noRobot}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-8 opacity-80" />
                  <div className="text-[#555555] text-[10px] mt-1 flex flex-col items-center leading-tight font-sans">
                    <span>reCAPTCHA</span>
                    <div className="flex gap-1 text-[8px] mt-[2px]">
                      <a href="#" className="hover:underline">{t.footer.privacidad}</a> -
                      <Link to="/terminos" onClick={scrollToTop} className="hover:underline">
                        {t.footer.terminos}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fila con el botón de suscribir y el link a Contacto */}
            <div className="flex items-center gap-4 mt-4">
              <button
                type="submit"
                disabled={captchaState !== 'verified'}
                className={`px-6 py-2.5 font-bold transition duration-300 shadow-sm text-sm tracking-wider rounded ${captchaState === 'verified'
                    ? 'bg-[#E07A5F] hover:bg-[#D46B4F] text-white cursor-pointer'
                    : 'bg-[#E07A5F]/50 text-white/70 cursor-not-allowed'
                  }`}
              >
                {t.footer.btnEnviar}
              </button>

              <Link
                to="/contacto"
                onClick={scrollToTop}
                className="text-sm font-bold border-b border-transparent hover:border-white transition-colors flex items-center gap-1"
              >
                {t.footer.irContacto} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Botón flotante para ir arriba de la página */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 bottom-6 bg-[#E07A5F] text-white p-3 rounded-full shadow-lg hover:bg-[#D46B4F] transition-transform hover:-translate-y-1"
        aria-label="Volver arriba"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
      </button>
    </footer>
  );
}