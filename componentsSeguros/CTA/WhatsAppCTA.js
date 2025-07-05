// componentsSeguros/CTA/WhatsAppCTA.js

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp, FaCar, FaMotorcycle, FaCalendarCheck } from 'react-icons/fa';
import { gsap } from 'gsap';

// --- Componente auxiliar para exibir um serviço com o estilo de card interativo ---
const ServiceDisplayCard = ({ icon, title, index }) => {
    const cardRef = useRef(null);
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };
     const handleMouseLeave = (e) => {
         // Opcional: Redefinir a posição do gradiente ao sair, ou manter a última posição
     };

    // Variantes para a animação de entrada no scroll (staggered)
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: index * 0.1 } },
    };

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            className="flex flex-col items-center p-6 rounded-lg relative overflow-hidden h-full"
             style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.04), transparent 80%)',
                backdropFilter: 'blur(0px)',
                boxShadow: 'none',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.08)' }}
        >
            {/* Conteúdo do card */}
            {/* CORRIGIDO: Alterado text-lo-peach para text-white */}
            <div className="mb-4 text-white relative z-10">
                {icon}
            </div>
            <span className="text-xl font-bold text-white relative z-10">{title}</span>
        </motion.div>
    );
};


const WhatsAppCTAGeneral = () => {
  const buttonRef = useRef(null);
  const whatsappNumber = '5521993519090';
  const whatsappMessage = encodeURIComponent('Olá, gostaria de solicitar informações sobre os seguros e planos da Loyds Seguros.');

  useEffect(() => {
    const buttonEl = buttonRef.current;
    let tlButton;

    if (buttonEl) {
       tlButton = gsap.to(buttonEl, {
        scale: 1.03,
        boxShadow: '0 0 15px rgba(34, 197, 94, 0.5), 0 0 25px rgba(34, 197, 94, 0.3)',
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

     return () => {
       if (tlButton) {
         tlButton.kill();
       }
     };
  }, []);

  const services = [
    { icon: <FaCar size={40} />, title: 'Seguro Auto' },
    { icon: <FaMotorcycle size={40} />, title: 'Seguro Moto' },
    { icon: <FaCalendarCheck size={40} />, title: 'Seguro Mensal ' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'circOut',
      },
    },
  };

  const gridContainerVariants = {
     hidden: { opacity: 0 },
     visible: {
        opacity: 1,
        transition: {
           staggerChildren: 0.15,
        },
     },
  };


  return (
    <section className="py-24 sm:py-32" style={{ backgroundColor: '#121313' }}>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-lo-dark-blue/50 backdrop-blur-lg rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/20 flex flex-col items-center relative"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Encontre a proteção ideal para você!
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12">
            Fale com um de nossos consultores especializados via WhatsApp e descubra as melhores soluções em seguros
            e planos de assistência para seu veículo ou necessidade. Cotação rápida e consultoria transparente.
          </p>

          <motion.div
             className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12"
             variants={gridContainerVariants}
             initial="hidden"
             animate="visible"
          >
            {services.map((service, index) => (
              <ServiceDisplayCard
                 key={index}
                 icon={service.icon}
                 title={service.title}
                 index={index}
              />
            ))}
          </motion.div>

           <Link
             href={`https://wa.me/5521982854688?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20informa%C3%A7%C3%B5es%20sobre%20os%20seguros%20e%20planos%20da%20Loyds%20Seguros.`}
             passHref
             legacyBehavior
           >
             <motion.a
               ref={buttonRef}
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 text-white rounded-full font-bold shadow-lg transition-transform duration-300 hover:scale-105"
               whileTap={{ scale: 0.98 }}
             >
               <FaWhatsapp size={24} /> Fale com um Consultor
             </motion.a>
           </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppCTAGeneral;