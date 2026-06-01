import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import ValueProposition from '../components/sections/ValueProposition';
import CallToAction from '../components/sections/CallToAction';

export default function Home() {

  return (
    <>
      <Helmet>
        <title>Inicio - Procesadora Perú</title>
        <meta name="description" content="Procesadora Perú SAC - Especialistas en procesamiento y logística global de mangos y legumbres." />
      </Helmet>
      <div className="flex flex-col w-full">
        <Hero />
        <FeaturedProducts />
        <ValueProposition />
        <CallToAction />
      </div>
    </>
  );
}