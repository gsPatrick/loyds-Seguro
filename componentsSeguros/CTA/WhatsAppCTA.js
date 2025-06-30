// componentsSeguros/CTA/WhatsAppCTA.js

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp, FaCar, FaMotorcycle, FaCalendarCheck } from 'react-icons/fa';
import { gsap } from 'gsap';

// --- Componente auxiliar para exibir um serviço com o estilo de card interativo ---
// Este componente agora só define as VARIANTS e o estilo, sem whileInView/initial próprios
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
    // initial={{ opacity: 0, y: 30 }} e animate={{ opacity: 1, y: 0 }}
    // Serão aplicados IMPLICITAMENTE pelo staggerChildren do pai
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: index * 0.1 } }, // Usa o index para o delay
    };

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants} // Aplica as variantes de animação
             // REMOVIDO: initial="hidden" e whileInView="visible" daqui
            className="flex flex-col items-center p-6 rounded-lg relative overflow-hidden h-full" // Adicionado h-full para uniformidade, relative overflow-hidden
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
            <div className="mb-4 text-lo-peach relative z-10">
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
    { icon: <FaCalendarCheck size={40} />, title: 'Plano Mensal 24h' },
  ];

  // As variants Framer Motion para o contêiner principal (a caixa com blur)
  // Esta div controlará QUANDO a animação da seção começa
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'circOut',
        // Removendo 'when: "beforeChildren"' para simplificar, o stagger já gerencia a ordem
      },
    },
  };

  // Variants para o contêiner do grid (apenas para o stagger dos filhos)
  // Esta div controlará COMO os filhos (os cards) animam em relação a ela
  const gridContainerVariants = {
     hidden: { opacity: 0 }, // Estado inicial padrão para os filhos antes do stagger começar
     visible: {
        opacity: 1, // Garante que o grid esteja visível
        transition: {
           staggerChildren: 0.15, // Atraso entre a animação de cada card ServiceDisplayCard
        },
     },
  };


  return (
    <section className="py-24 sm:py-32" style={{ backgroundColor: '#121313' }}>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          variants={containerVariants} // Animação de entrada do contêiner principal
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
            e planos de assistência 24h para seu veículo ou necessidade. Cotação rápida e consultoria transparente.
          </p>

          {/* Grid mostrando os serviços - AGORA USA O NOVO COMPONENTE ServiceDisplayCard */}
          {/* Este contêiner controla o stagger dos cards internos */}
          <motion.div
             className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12"
             variants={gridContainerVariants} // Usa as variants para o stagger
             initial="hidden" // Define o estado inicial do grid (e seus filhos) como hidden
             animate="visible" // Anima o grid (e seus filhos via stagger) para visible
             // REMOVIDO: whileInView e viewport daqui. A animação agora é disparada quando o contêiner PAI entra na view.
             // Pode ser necessário adicionar whileInView e viewport AQUI se quiser que APENAS o grid anime
             // quando ele mesmo entra na view, independente do pai.
             // Mantendo a animação disparada pelo pai por enquanto, parece ser a intenção.
             // Se quiser que o grid anime *independente* do pai, adicione whileInView={{ opacity: 1 }} e viewport={{ once: true, amount: 0.3 }} aqui.
          >
            {services.map((service, index) => (
              <ServiceDisplayCard
                 key={index}
                 icon={service.icon}
                 title={service.title}
                 index={index} // Passa o index para o delay do stagger no componente filho
              />
            ))}
          </motion.div>

           {/* Botão principal de CTA para o WhatsApp */}
           <Link
             href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
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