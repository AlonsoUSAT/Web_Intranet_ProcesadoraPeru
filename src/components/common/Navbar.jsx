import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Productos', path: '/productos' },
    { name: 'Linea Etica', path: '/libro-reclamaciones' }, // Simulando enlace a ética/reclamaciones
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 h-[93px] bg-[#FBF9F8]/80 backdrop-blur-md border-b border-[#F4F4F5] flex flex-col justify-end"
    >
      <div className="max-w-[1280px] w-full mx-auto px-12 h-[92px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-[#18181B] font-heading text-2xl font-extrabold tracking-tight">
            PROCESADORA PERÚ SAC
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-heading text-base font-bold pb-1 transition-colors ${
                  isActive ? 'text-[#C2410C]' : 'text-[#52525B] hover:text-[#C2410C]'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#C2410C]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Call to Action Button */}
        <div>
          <button className="bg-primary text-white font-heading text-base font-semibold px-6 py-2.5 rounded shadow-sm hover:shadow-md transition-shadow hover:bg-[#803a00]">
            Acceso Intranet
          </button>
        </div>
      </div>
    </motion.header>
  );
}
