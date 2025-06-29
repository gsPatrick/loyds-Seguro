// componentsSeguros/CTA/WhatsAppCTAGeneral.js

import React, { useRef, useEffect } from 'react'; // Import React for useRef
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp, FaCar, FaMotorcycle, FaCalendarCheck } from 'react-icons/fa';
import { gsap } from 'gsap';

const WhatsAppCTAGeneral = () => {
  const buttonRef = useRef(null);
  // Usando o segundo número de WhatsApp fornecido (21) 99351-9090
  const whatsappNumber = '5521993519090';
  // Mensagem inicial genérica para o WhatsApp
  const whatsappMessage = encodeURIComponent('Olá, gostaria de solicitar informações sobre os seguros e planos da Loyds Seguros.');

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'circOut',
        when: "beforeChildren", // Anima o container antes dos filhos
      },
    },
  };

  const serviceItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const services = [
    { icon: <FaCar size={40} />, title: 'Seguro Auto' },
    { icon: <FaMotorcycle size={40} />, title: 'Seguro Moto' },
    { icon: <FaCalendarCheck size={40} />, title: 'Plano Mensal 24h' },
  ];

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
            Encontre a proteção ideal para você!
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12">
            Fale com um de nossos consultores especializados via WhatsApp e descubra as melhores soluções em seguros
            e planos de assistência 24h para seu veículo ou necessidade. Cotação rápida e consultoria transparente.
          </p>

          {/* Grid mostrando os serviços (sem serem links diretos ao WhatsApp) */}
          <motion.div
             className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12" // Adicionado mb-12 para espaçar o botão
             variants={{ // Usamos um novo set de variants apenas para o stagger dos filhos
                visible: { transition: { staggerChildren: 0.2 } },
             }}
             initial="hidden" // Herda do pai ou define hidden inicial se quiser
             whileInView="visible" // Anima os cards quando o container entra na view
             viewport={{ once: true, amount: 0.3 }}
          >
            {services.map((service, index) => (
              <motion.div
                 key={index}
                 variants={serviceItemVariants} // Variants para cada card de serviço
                 className="flex flex-col items-center p-6 rounded-lg"
                 style={{
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     backgroundColor: 'rgba(255, 255, 255, 0.05)', // Levemente diferente do container principal
                 }}
                 // Adiciona animações de hover, mas o item NÃO é um link direto ao WhatsApp
                 whileHover={{ y: -3, scale: 1.01, boxShadow: '0 5px 15px rgba(255,255,255,0.05)' }}
              >
                 <div className="mb-4 text-lo-peach">
                   {service.icon}
                 </div>
                 <span className="text-xl font-bold text-white">{service.title}</span>
                 {/* Você pode adicionar um texto de apoio aqui se quiser */}
                 {/* <span className="text-sm text-white/60 mt-2">Saiba mais</span> */}
              </motion.div>
            ))}
          </motion.div>

           {/* Botão principal de CTA para o WhatsApp */}
           <Link
             href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
             passHref
             legacyBehavior
           >
             <motion.a
               ref={buttonRef} // Anexa a ref para a animação GSAP
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