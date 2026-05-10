import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#F4F4F5] w-full pt-16 pb-8 border-t border-[#E4E4E7]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-12">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0">
            <div className="flex flex-col gap-6 md:gap-8">
              <h2 className="text-[#18181B] font-heading text-xl md:text-2xl font-bold">
                PROCESADORA PERÚ SAC
              </h2>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <Link to="/privacidad" className="text-[#71717A] font-body text-xs hover:text-[#C2410C] transition-colors">
                  POLÍTICA DE PRIVACIDAD
                </Link>
                <Link to="/terminos" className="text-[#71717A] font-body text-xs hover:text-[#C2410C] transition-colors">
                  TÉRMINOS DE SERVICIO
                </Link>
                <Link to="/sostenibilidad" className="text-[#71717A] font-body text-xs hover:text-[#C2410C] transition-colors">
                  SOSTENIBILIDAD
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center w-full gap-6 md:gap-0">
              <p className="text-[#71717A] font-body text-xs">
                © 2024 PROCESADORA PERÚ SAC. LIDERAZGO AGRO-INDUSTRIAL.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-[#E4E4E7] flex items-center justify-center hover:bg-[#D4D4D8] transition-colors text-[#52525B]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#E4E4E7] flex items-center justify-center hover:bg-[#D4D4D8] transition-colors text-[#52525B]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
