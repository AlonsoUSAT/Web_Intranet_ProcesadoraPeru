import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Esto fuerza a la ventana a ir a las coordenadas (0, 0) o sea, arriba del todo
    window.scrollTo(0, 0);
  }, [pathname]); // Se ejecuta cada vez que el "pathname" (la ruta) cambia

  return null; // Es un componente invisible, no renderiza nada en pantalla
}