// componentsSeguros/CTA/WhatsAppCTAAllSeguros.js

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { gsap } from 'gsap';

const WhatsAppCTAAllSeguros = () => {
  const buttonRef = useRef(null);
  // Usando o segundo número de WhatsApp fornecido (21) 99351-9090
  const whatsappNumber = '5521993519090';
  const whatsappMessage = encodeURIComponent('Olá, gostaria de solicitar informações sobre os seguros oferecidos pela Loyds Seguros.');

  useEffect(() => {
    const buttonEl = buttonRef.current;
    if (buttonEl) {
      // Animação sutil de pulsação ou brilho no botão do WhatsApp
      gsap.to(buttonEl, {
        scale: 1.03, // Leve aumento de escala
        boxShadow: '0 0 15px rgba(34, 197, 94, 0.5), 0 0 25px rgba(34, 197, 94, 0.3)', // Sombra esverdeada
        duration: 1.5, // Duração da animação
        ease: 'power1.inOut', // Suavidade da animação
        repeat: -1, // Repetir infinitamente
        yoyo: true, // Voltar ao estado original suavemente
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'circOut' } },
  };

  return (
    <section className="py-24 sm:py-32" style={{ backgroundColor: '#121313' }}>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-lo-dark-blue/50 backdrop-blur-lg rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/20 flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
             Simule agora via WhatsApp!
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Fale com um de nossos consultores e encontre a melhor solução em Seguro Auto, Moto ou Plano Mensal.
            Processo rápido, personalizado e sem compromisso.
          </p>

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
              <FaWhatsapp size={24} /> Falar com Consultor
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppCTAAllSeguros;