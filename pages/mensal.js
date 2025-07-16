// pages/mensal.js

import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
// Ícones específicos
import {
    FaWhatsapp, FaCar, FaMotorcycle, FaCalendarCheck,
    FaLock, FaUsers, FaPlusCircle, FaCloudShowersHeavy, FaFire,
    FaTruckPickup, FaTools, FaCheckCircle, FaRoad, FaEnvelope
} from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import WhatsAppCTAGeneral from '@/componentsSeguros/CTA/WhatsappOnly.js'; // Componente de CTA flutuante

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- IMPORTAÇÕES DE COMPONENTES GERAIS ---
import Header from '../componentsSeguros/Header/Header.js';
import Footer from '../componentsSeguros/Footer/Footer.js';
import PartnerLogos from '@/componentsSeguros/PartnerLogos/PartnerLogos.js';

// --- Componente para o Card de Link Direto (Copiado de auto.js para uso aqui) ---
const DirectQuoteCard = ({ logoSrc, logoAlt, title, description, href }) => {
    const cardRef = React.useRef(null);
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };
     const handleMouseLeave = (e) => {
         e.currentTarget.style.setProperty('--mouse-x', `50%`);
         e.currentTarget.style.setProperty('--mouse-y', `50%`);
     };

    return (
        <Link href={href} passHref legacyBehavior>
            <motion.a
                ref={cardRef}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden cursor-pointer"
                 style={{
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08), transparent 80%)',
                    backdropFilter: 'blur(0px)',
                    boxShadow: 'none'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.98 }}
                 onMouseMove={handleMouseMove}
                 onMouseLeave={handleMouseLeave}
            >
                {/* Aumentado o tamanho da div para a logo */}
                <div className="relative w-40 h-20 md:w-48 md:h-24 mb-4">
                     <Image
                        src={logoSrc}
                        alt={logoAlt}
                        fill
                        style={{ objectFit: 'contain' }}
                         sizes="(max-width: 768px) 160px, 192px"
                    />
                </div>
                <span className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors duration-300 relative z-10">{title}</span>
                <span className="text-sm text-white/60 relative z-10">{description}</span>

                 <div className="mt-auto inline-flex items-center text-white/80 font-semibold transition-all duration-300 group-hover:text-white group-hover:tracking-wider pt-4 relative z-10">
                        Calcular Online
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
            </motion.a>
        </Link>
    );
};


// --- Componente para o Card de Outra Modalidade (Estilo Moderno e Clicável) ---
const InteractiveServiceLinkCard = ({ icon, title, href, index }) => {
    const cardRef = React.useRef(null);
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };
     const handleMouseLeave = (e) => {
         e.currentTarget.style.setProperty('--mouse-x', `50%`);
         e.currentTarget.style.setProperty('--mouse-y', `50%`);
     };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 } },
    };

    return (
        <Link key={index} href={href} passHref legacyBehavior>
             <motion.a
                ref={cardRef}
                className="group relative w-full rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden cursor-pointer"
                 style={{
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08), transparent 80%)',
                    backdropFilter: 'blur(0px)',
                    boxShadow: 'none'
                }}
                variants={cardVariants}
                 whileHover={{ y: -8, scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.15)' }}
                 whileTap={{ scale: 0.98 }}
                 onMouseMove={handleMouseMove}
                 onMouseLeave={handleMouseLeave}
            >
                 <div className="mb-4 text-lo-peach relative z-10 group-hover:text-white transition-colors duration-300">
                   {React.cloneElement(icon, { size: 40 })}
                 </div>
                 <span className="text-xl font-bold text-white mb-2 relative z-10">{title}</span>
                 <span className="text-sm text-white/60 relative z-10">Saiba mais sobre {title}</span>

                  <div className="mt-auto inline-flex items-center text-white/80 font-semibold transition-all duration-300 group-hover:text-white group-hover:tracking-wider pt-4 relative z-10">
                        Ver Detalhes
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
            </motion.a>
        </Link>
    );
};


export default function SeguroMensalPage() {
  const whatsappRef = React.useRef(null); // Usado para o botão CTA principal
  const whatsappContactNumber = '5521982854688'; // Número principal da Loyds
  const whatsappMessageLoyds = encodeURIComponent('Olá, gostaria de solicitar informações sobre os seguros e planos da Loyds Seguros.');

  // Link para a Azul Seguros
  const azulLink = "https://assinatura.azulseguros.com.br/?susep=40ZE3J&origem=SITECORRETOR";

  React.useEffect(() => {
    const buttonEl = whatsappRef.current;
    let tl;

    if (buttonEl) {
       tl = gsap.to(buttonEl, {
        scale: 1.05,
        boxShadow: '0 0 15px rgba(34, 197, 94, 0.6), 0 0 25px rgba(34, 197, 94, 0.4)',
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

     return () => {
       if (tl) {
         tl.kill();
       }
     };
  }, []);

  const otherInsuranceLinks = [
    { title: 'Seguro Auto', href: '/auto', icon: <FaCar /> },
    { title: 'Seguro Moto', href: '/moto', icon: <FaMotorcycle /> },
  ];

  // Coberturas específicas para o layout da imagem
  const azulCoverages = [
    "TERCEIROS COM ASSISTÊNCIA 24 HORAS.",
    "ROUBO, FURTO, TERCEIROS E ASSISTÊNCIA 24 HORAS.",
    "SEGURO TOTAL QUE ENGLOBA AS COBERTURAS ACIMA, MAIS COLISÃO.",
    "O CLIENTE PAGA COM PIX OU CARTÃO MENSALMENTE (NÃO TIRA O LIMITE DO CARTÃO).",
    "SEGURO DIGITAL, INCLUSIVE A VISTORIA.",
    "SOMENTE VEÍCULOS DE PASSEIO ATÉ R$ 150.000,00.",
    "Não aceita uber, táxi, utilitários e blindados."
  ];

  return (
    <>
      <Head>
        <title>Loyds Seguros | Cotação Seguro Popular Porto/Azul</title>
        <meta name="description" content="Simule seu Seguro Popular Porto/Azul com a Loyds Seguros. Coberturas essenciais e assistência para seu veículo." />
      </Head>

      <Header />

      <main style={{ backgroundColor: '#121313' }} className="pt-[73px]">
        {/* --- SEÇÃO HERO/INTRO COM CADASTRO SIMPLIFICADO E DETALHES --- */}
        <section className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center text-center overflow-hidden" style={{ backgroundColor: '#121313' }}>
            <div className="container mx-auto px-4 max-w-6xl">

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'circOut' }}
                  className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-12"
                >
                    Seguro Popular <span className="text-white/70">Porto/Azul</span>
                </motion.h1>

                {/* --- LAYOUT DE 2 COLUNAS COM COTAÇÃO DIRETA E FORMULÁRIO (POSIÇÕES INVERTIDAS) --- */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start text-left">
                    {/* Coluna da Esquerda (AGORA): Cotação Online */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'circOut', delay: 0.2 }}
                        className="flex flex-col items-center md:items-start w-full"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6 text-center md:text-left">CALCULE E CONTRATE ONLINE SEU SEGURO NO GRUPO PORTO</h2>
                        <div className="w-full flex flex-col gap-8">
                            <DirectQuoteCard
                                logoSrc="/icons/icon.png" // Logo da Azul Seguros
                                logoAlt="Logo Azul Seguros"
                                title="Cote na Azul Seguros"
                                description="Simule online diretamente com a Azul Seguros via Loyds."
                                href={azulLink}
                            />
                        </div>
                        <p className="mt-8 text-sm text-white/50 w-full text-center md:text-left">
                          Ao clicar, você será redirecionado para o site da seguradora parceira para simulação.
                        </p>
                    </motion.div>

        {/* Coluna da Direita (AGORA): Formulário */}
<motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: 'circOut', delay: 0.4 }}
    className="flex flex-col items-center md:items-start w-full"
>
    <h2 className="text-3xl font-bold text-white mb-6 text-center md:text-left">Dúvidas, Esclarecimentos e Apoio, preencha os dados abaixo e vamos esclarecer qualquer situação</h2>
    {/* --- INÍCIO DA MODIFICAÇÃO --- */}
    <form
        action="https://formspree.io/f/meozqvjp"
        method="POST"
        className="w-full max-w-md space-y-6 text-white"
    >
        {/* --- NOVOS CAMPOS OCULTOS --- */}
        <input type="hidden" name="_subject" value="Novo Contato - Seguro Mensal/Popular" />
        <input type="hidden" name="tipo_seguro" value="Seguro Mensal/Popular" />
        {/* --- FIM DOS CAMPOS OCULTOS --- */}

        <div>
            <label htmlFor="name" className="block text-white/70 text-sm font-semibold mb-2">
                Nome:
            </label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite o seu nome"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lo-peach"
                required
            />
        </div>
        <div>
            <label htmlFor="phone" className="block text-white/70 text-sm font-semibold mb-2">
                Telefone/Whatsapp:
            </label>
            <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Digite o seu telefone"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lo-peach"
                required
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center justify-center gap-2"
        >
            <FaEnvelope size={18} /> Enviar
        </button>
    </form>
    {/* --- FIM DA MODIFICAÇÃO --- */}
</motion.div>
                </div>
            </div>
        </section>

        {/* --- SEÇÃO COBERTURAS (MOVIDA PARA FORA DO HERO) --- */}
        <section className="py-16 sm:py-24" style={{ backgroundColor: '#121313' }}>
            <div className="container mx-auto px-4 max-w-6xl text-left">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: 'circOut' }}
                    className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter text-center mb-12"
                >
                    Coberturas e Condições
                </motion.h2>
                <div className="flex flex-col items-center md:items-start w-full text-white">
                    <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Detalhes do Seguro Popular:</h3>
                    <ul className="list-disc list-inside text-white/80 space-y-3 mb-10 w-full max-w-md mx-auto text-left">
                        {azulCoverages.map((coverage, index) => (
                            <li key={index} className="text-sm md:text-base">
                                {coverage}
                            </li>
                        ))}
                    </ul>

                    <p className="text-white/70 text-base md:text-lg mb-4 text-center md:text-left max-w-lg mx-auto">
                        Estamos a disposição no whatsapp desta página ou através do <span className="font-bold text-lo-peach">(21) 98285-4688</span>, CONSULTE-NOS EM CASO DE DÚVIDAS.
                    </p>
                    <p className="text-white/70 text-base md:text-lg text-center md:text-left max-w-lg mx-auto">
                        (Estamos a disposição no whatsapp desta página ou através do <span className="font-bold text-lo-peach">(21) 98285-4688</span>.)
                    </p>
                </div>
            </div>
        </section>

        <PartnerLogos />
        {/* CTA flutuante do WhatsApp agora após os logos dos parceiros */}
        <WhatsAppCTAGeneral />


        {/* --- CTA WHATSAPP PULSANTE (AGORA ABAIXO DO CONTEÚDO PRINCIPAL) --- */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'circOut' }}
            className="mt-16 text-center flex flex-col items-center px-4"
        >
            <p className="text-white/70 text-lg mb-8">
                Tem dúvidas, precisa de ajuda com a cotação ou deseja consultoria personalizada?
            </p>
            <p className="text-lo-peach font-bold mb-6">
                Fale com um consultor Loyds Seguros agora mesmo!
            </p>
            <Link href={`https://wa.me/${whatsappContactNumber}?text=${whatsappMessageLoyds}`} passHref legacyBehavior>
                <motion.a
                    ref={whatsappRef}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-bold shadow-lg transition-transform duration-300 hover:scale-105"
                    whileTap={{ scale: 0.98 }}
                >
                    <FaWhatsapp size={24} /> Converse no WhatsApp
                </motion.a>
            </Link>
        </motion.div>

         {/* --- SEÇÃO DE OUTRAS MODALIDADES --- */}
         <section className="py-16 sm:py-24" style={{ backgroundColor: '#121313' }}>
            <div className="container mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: 'circOut' }}
                    className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter text-center mb-12"
                >
                    Explore outras modalidades de proteção:
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.3 }}
                     variants={{
                        visible: { transition: { staggerChildren: 0.15 } },
                    }}
                >
                    {/* Mapeia os links de outros seguros */}
                    {otherInsuranceLinks.map((item, index) => (
                       <InteractiveServiceLinkCard
                           key={index}
                           icon={item.icon}
                           title={item.title}
                           href={item.href}
                           index={index}
                       />
                    ))}
                    {/* Adiciona card vazio invisível se o número de itens for ímpar */}
                    {otherInsuranceLinks.length % 2 !== 0 && (
                        <div className="hidden md:block col-span-1"></div>
                    )}
                </motion.div>
            </div>
        </section>

      </main>

      <Footer />
    </>
  );
}