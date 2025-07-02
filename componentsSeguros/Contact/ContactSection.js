// componentsSeguros/Contact/ContactSection.js (VERSÃO "CONEXÃO DIRETA")

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const ContactSection = () => {
  const buttonRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'circOut' } },
  };

  const socialLinks = [
    {
      icon: <FaWhatsapp size={24} />,
      href: 'https://wa.me/5521982854688?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20informa%C3%A7%C3%B5es%20sobre%20os%20seguros%20e%20planos%20da%20Loyds%20Seguros.',
      name: 'WhatsApp'
    },
  ];

  return (
    <section
      id="contato"
      className="py-24 sm:py-32"
      style={{ backgroundColor: '#121313' }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-lo-dark-blue/50 backdrop-blur-lg rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Lado Esquerdo */}
          <div className="flex flex-col justify-center text-white text-center lg:text-left">
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold mb-4">
              Fale Conosco
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-white/70 mb-8">
              Estamos prontos para te ajudar! Entre em contato para tirar dúvidas, solicitar uma simulação personalizada ou agendar uma conversa.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <FaPhone className="text-white/80" />
                <a href="tel:+5521982854688" className="text-white/80 hover:text-white transition-colors duration-300">
                  (21) 98285-4688
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <FaEnvelope className="text-white/80" />
                <a href="mailto:cálculo@loydseguros.com.br " className="text-white/80 hover:text-white transition-colors duration-300">
                  cálculo@loydseguros.com.br 
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start gap-6">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} passHref legacyBehavior>
                  <motion.a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}
                  >
                    {social.icon}
                  </motion.a>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Lado Direito */}
          <motion.div
            variants={itemVariants}
            ref={buttonRef}
            className="relative p-6 rounded-2xl border border-white/10 flex items-center justify-center min-h-[250px] cursor-pointer"
            style={{
              background: 'radial-gradient(circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.05), transparent 80%)',
              boxShadow: '0 0 0px transparent'
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }}
            whileHover={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)' }}
          >
            <Link
              href="mailto:contato@loydsseguros.com?subject=Contato%20via%20Site%20Loyds%20Seguros&body=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20seguros."
              passHref
              legacyBehavior
            >
              <motion.a
                className="relative z-10 flex flex-col items-center gap-y-4 text-white/90 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <FaEnvelope size={60} />
                <span className="text-xl font-bold">Enviar um E-mail</span>
                <span className="text-sm text-white/70">contato@loydsseguros.com</span>
              </motion.a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
