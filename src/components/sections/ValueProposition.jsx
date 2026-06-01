import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Truck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ValueProposition() {
  const { t } = useLanguage();

  const propositions = [
    {
      title: t.home.valProp1Title,
      description: t.home.valProp1Desc,
      icon: <Cpu size={32} className="text-[#954500]" />
    },
    {
      title: t.home.valProp2Title,
      description: t.home.valProp2Desc,
      icon: <ShieldCheck size={32} className="text-[#954500]" />
    },
    {
      title: t.home.valProp3Title,
      description: t.home.valProp3Desc,
      icon: <Truck size={32} className="text-[#954500]" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="bg-[#F6F3F2] py-16 md:py-32 w-full">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {propositions.map((prop, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col gap-4 md:gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                {prop.icon}
              </div>
              <div>
                <h3 className="text-[#1B1C1C] font-heading text-xl md:text-2xl font-bold mb-2 md:mb-4">
                  {prop.title}
                </h3>
                <p className="text-[#554339] font-body text-sm md:text-base leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}