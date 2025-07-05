// pages/seguros/moto.js

import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
// Ícones específicos (ajustados)
import {
    FaWhatsapp, FaCar, FaMotorcycle, FaCalendarCheck,
    FaLock, FaUsers, FaPlusCircle, FaCloudShowersHeavy, FaFire,
    FaTruckPickup, FaTools, FaCheckCircle, // Ícone para "Por Que Escolher"
} from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- IMPORTAÇÕES DE COMPONENTES GERAIS ---
import Header from '../componentsSeguros/Header/Header.js';
import Footer from '../componentsSeguros/Footer/Footer.js';
import PartnerLogos from '@/componentsSeguros/PartnerLogos/PartnerLogos.js';
import WhatsAppCTAGeneral from '@/componentsSeguros/CTA/WhatsappOnly.js';

// --- Componente para o Card de Cobertura/Condição (Estilo Moderno com Ícones) ---
// Mantido igual
const CoverageCard = ({ item, index }) => {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: index * 0.07 } },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      className="flex flex-col items-start gap-3 p-6 rounded-lg border border-white/10 text-white/80 h-full relative overflow-hidden" // items-start para alinhar no topo, h-full para grid uniforme
      style={{
         background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.04), transparent 80%)',
         backdropFilter: 'blur(0px)',
         boxShadow: 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.08)' }}
    >
      <div className="mb-2 text-lo-peach relative z-10">
          {React.cloneElement(item.icon, { size: 30 })}
      </div>
      <span className="flex-grow relative z-10 text-sm font-semibold text-left w-full">{item.text}</span>
    </motion.div>
  );
};

// --- Componente para o Card de Link Direto (Porto/Azul - Logos Maiores) ---
// Mantido igual
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

// --- Componente para o Card de Outro Seguro (Estilo Moderno e Clicável) ---
// Mantido igual
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

// --- Componente para os Itens da Seção "Por Que Escolher" (Estilo Card Moderno) ---
const WhyChooseItem = ({ icon, text, index }) => {
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

     const itemVariants = {
        hidden: { opacity: 0, y: 30 }, // Animação similar aos outros cards
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: index * 0.1 } },
    };

    return (
        <motion.div
            ref={cardRef}
            variants={itemVariants}
            className="flex flex-col items-center text-center gap-3 p-6 rounded-lg border border-white/10 text-white/80 h-full relative overflow-hidden" // Estilo de card
             style={{
                 background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.04), transparent 80%)',
                 backdropFilter: 'blur(0px)',
                 boxShadow: 'none',
             }}
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
             whileHover={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.08)' }} // Sombra sutil no hover
        >
            <div className="mb-2 text-lo-peach relative z-10">
                {React.cloneElement(icon, { size: 30 })} {/* Ícone com tamanho */}
            </div>
            <span className="text-sm relative z-10 font-semibold">{text}</span> {/* Texto do item */}
        </motion.div>
    );
};


export default function SeguroMotoPage() {
  const whatsappRef = React.useRef(null);
  const whatsappNumber = '5521993519090';
  const whatsappMessage = encodeURIComponent('Olá, gostaria de solicitar informações sobre Seguro Moto pela Loyds Seguros.');

  // Placeholder para o link da Porto Seguro MOTO
  // !!! SUBSTITUA ESTE LINK PELO LINK CORRETO DA PORTO SEGURO PARA MOTO !!!
  const portoMotoLink = "https://www.portoseguro.com.br/loja/seguro-auto?new_plan=1&social_media=OTHERS&link_uuid=16f87675-6d8c-4d88-838d-1f10387736d4&origem=SITE_CORRETOR&cod=01d8cd706dba47cb9f4d53043fdfdbda"; // Exemplo: "https://www.portoseguro.com.br/sua-loja/cotar-moto?susep=40ZE3J..."


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
    { title: 'Seguro Mensal', href: '/mensal', icon: <FaCalendarCheck /> },
  ];

  // Lista de coberturas e condições para os cards (com ícones)
  const coverages = [
    { icon: <FaMotorcycle />, text: "BATIDA PARCIAL OU TOTAL" },
    { icon: <FaLock />, text: "ROUBO E FURTO" },
    { icon: <FaUsers />, text: "COBERTURA A TERCEIROS (Danos Materiais e Corporais)" },
    { icon: <FaPlusCircle />, text: "AUMENTO DE COBERTURA A TERCEIROS" },
    { icon: <FaCloudShowersHeavy />, text: "ALAGAMENTO" },
    { icon: <FaFire />, text: "INCÊNDIO" },
    { icon: <FaTruckPickup />, text: "REBOQUE, CHAVEIRO, TROCA DE PNEU, AUXÍLIO MECÂNICO, etc." },
    { icon: <FaTools />, text: "REPAROS PARA VIDROS, FARÓIS E RETROVISORES" },
    { icon: <FaCalendarCheck />, text: "DEMAIS SERVIÇOS E COBERTURAS ADICIONAIS" },
  ];

    const whyChooseItems = [
        { icon: <FaCheckCircle />, text: "Agilidade e eficiência no serviço realizado" },
        { icon: <FaCheckCircle />, text: "Equipe altamente qualificada no que faz" },
        { icon: <FaCheckCircle />, text: "Soluções de acordo com a sua necessidade" },
        { icon: <FaCheckCircle />, text: "Qualidade comprovada por nossos clientes" },
    ];


  return (
    <>
      <Head>
        <title>Loyds Seguros | Cotação e Consultoria de Seguro Moto</title>
        <meta name="description" content="Simule seu seguro de moto online com a Loyds Seguros, corretora parceira da Porto Seguro. Obtenha consultoria especializada via WhatsApp." />
      </Head>

      <Header />

      <main style={{ backgroundColor: '#121313' }} className="pt-[73px]">
        {/* --- SEÇÃO HERO/INTRO DO SEGURO MOTO --- */}
        <section className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center text-center overflow-hidden" style={{ backgroundColor: '#121313' }}>
            <div className="container mx-auto px-4 max-w-5xl">
                
                < WhatsAppCTAGeneral />

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'circOut' }}
                  className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
                >
                    Seguro Moto <span className="text-white/70">com a consultoria que você merece.</span>
                </motion.h1>
                <motion.p
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, ease: 'circOut', delay: 0.2 }}
                   className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto"
                >
                   Encontre a proteção ideal para a sua moto com agilidade e transparência. Na Loyds Seguros, intermediamos as melhores opções entre as principais seguradoras do mercado.
                </motion.p>

                {/* --- SEÇÃO DE LINK DIRETO PARA COTAÇÃO (PORTO - CARD MODERNO) --- */}
                <motion.div
                    className="mt-16 max-w-md mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } },
                    }}
                >
                    {/* Apenas o card da Porto Seguro para Moto */}
                    <DirectQuoteCard
                         logoSrc="/icons/porto1.jpeg" // Caminho do seu logo Porto Seguro P/B
                         logoAlt="Logo Porto Seguro"
                         title="Cote na Porto Seguro"
                         description="Simule online diretamente com a Porto Seguro via Loyds."
                         href={portoMotoLink} // USANDO LINK PLACEHOLDER - SUBSTITUA!
                    />
                </motion.div>
                 <motion.p
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, amount: 0.3 }}
                   transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
                   className="mt-12 text-sm text-white/50 max-w-3xl mx-auto"
                >
                  Ao clicar, você será redirecionado para o site da seguradora parceira para simulação.
                </motion.p>
            </div>
        </section>

        {/* --- SEÇÃO PARTNER LOGOS --- */}
< WhatsAppCTAGeneral />
         <PartnerLogos />


        {/* --- SEÇÃO COBERTURAS E CONDIÇÕES (COM CARDS MODERNOS E ÍCONES) --- */}
        <section className="py-16 sm:py-24" style={{ backgroundColor: '#121313' }}>
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'circOut' }}
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter text-center mb-12"
            >
              Coberturas Essenciais
            </motion.h2>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, amount: 0.2 }}
                 variants={{
                    visible: { transition: { staggerChildren: 0.08 } },
                 }}
            >
              {/* Mapeia a lista de coberturas */}
              {coverages.map((item, index) => (
                <CoverageCard key={index} item={item} index={index} />
              ))}
               {/* Adiciona cards vazios para alinhamento no grid (2 ou 3 colunas) */}
               {/* Removi as divs vazias e ajustei o grid. Flexbox pode ser uma alternativa mais robusta ou garantir que o número de itens seja divisível pelas colunas. Mantendo grid por enquanto. */}
                {coverages.length % 2 !== 0 && <div className="hidden md:block col-span-1"></div>}
                {coverages.length % 3 === 1 && <div className="hidden lg:block col-span-1"></div>}
                {coverages.length % 3 === 2 && <div className="hidden lg:block col-span-1"></div>}

            </motion.div>

            {/* --- CTA WHATSAPP PULSANTE APÓS OS CARDS --- */}
             <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: coverages.length * 0.07 + 0.3, ease: 'circOut' }}
              className="mt-16 text-center flex flex-col items-center"
            >
              <p className="text-white/70 text-lg mb-8">
                Tem dúvidas, precisa de ajuda com a cotação ou deseja consultoria personalizada?
              </p>
               <p className="text-lo-peach font-bold mb-6">
                 Fale com um consultor Loyds Seguros agora mesmo!
              </p>
              <Link href={`https://wa.me/5521982854688?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20informa%C3%A7%C3%B5es%20sobre%20os%20seguros%20e%20planos%20da%20Loyds%20Seguros.`} passHref legacyBehavior>
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

          </div>
        </section>

        {/* --- SEÇÃO MOTIVAÇÃO / QUEM SOMOS (Fundo Integrado Melhorado) --- */}
        <section className="py-16 sm:py-24" style={{ backgroundColor: '#121313' }}>
            <div className="container mx-auto px-4">
                <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, amount: 0.3 }}
                   transition={{ duration: 0.8, ease: 'circOut' }}
                   className="bg-lo-dark-blue/30 backdrop-blur-lg rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/20 text-white"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-8">O sucesso de nossos clientes é o que nos motiva...</h2>
                    <p className="text-white/70 text-lg leading-relaxed text-center max-w-4xl mx-auto mb-8">Visamos construir relacionamentos de longo prazo, tendo como base a ética profissional. Estamos comprometidas com o sucesso de cada um de nossos clientes, pois acreditamos que o crescimento deles também será seu e de seus colaboradores.</p>
                     <p className="text-white/70 text-lg leading-relaxed text-center max-w-4xl mx-auto mb-12">Quando nossos clientes ganham, nós também ganhamos. Fomos reconhecidos por nossas conquistas em categorias como diversidade, ética, excelência, inovação e integridade.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div><h3 className="text-2xl font-bold text-lo-peach mb-4">Missão</h3><p className="text-white/70">Entregar soluções de qualidade na comercialização de prestação de nossos serviços. Proporcionar realização, satisfação no relacionamento com nossos clientes e colaboradores.</p></div>
                        <div><h3 className="text-2xl font-bold text-lo-peach mb-4">Visão</h3><p className="text-white/70">Nossa VISÃO é que se trabalharmos duro, sermos competentes, nos esforçarmos diariamente e honestamente para atender às mais diversas necessidades de nossos Clientes, todos os Fornecedores, Parceiros e Funcionários.</p></div>
                        <div><h3 className="text-2xl font-bold text-lo-peach mb-4">Valores</h3><ul className="list-disc list-inside text-white/70 space-y-2">
                            <li><strong className="text-white/90">Responsabilidade:</strong> Ser responsável por suas ações e decisões, em comprometimento com os objetivos da empresa.</li>
                            <li><strong className="text-white/90">Inovação:</strong> Buscar novas soluções, visando a eficiência.</li>
                            <li><strong className="text-white/90">Competência:</strong> Executar suas atribuições profissionais com o suporte do conhecimento, habilidades e atitudes assertivas.</li>
                            <li><strong className="text-white/90">Comprometimento:</strong> Agir de forma dedicada e comprometida com os princípios, os valores, a visão e a missão da empresa.</li>
                            <li><strong className="text-white/90">Profissionalismo:</strong> Exercer suas atribuições com dedicação, ética e respeito.</li>
                            <li><strong className="text-white/90">Transparência:</strong> Atuar e informar de forma clara e verdadeira.</li>
                            <li><strong className="text-white/90">Ética:</strong> Agir de acordo com valores que norteiam uma conduta íntegra, transparente e honesta.</li>
                        </ul></div>
                    </div>
                </motion.div>
            </div>
        </section>

        < WhatsAppCTAGeneral />

         {/* --- SEÇÃO: POR QUE ESCOLHER A NOSSA EMPRESA? (Estilo Card Moderno) --- */}
         <section className="py-16 sm:py-24" style={{ backgroundColor: '#121313' }}>
            <div className="container mx-auto px-4 text-center">
                 <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: 'circOut' }}
                    className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter text-center mb-12"
                >
                    Por Que Escolher a Loyds Seguros?
                </motion.h2>
                 <motion.p
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, amount: 0.3 }}
                   transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                   className="text-lg text-white/70 max-w-3xl mx-auto mb-12"
                >
                   Entregamos os resultados que você busca e porque consideramos que as nossas pessoas são o nosso maior patrimônio.
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.3 }}
                     variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {whyChooseItems.map((item, index) => (
                        <WhyChooseItem key={index} item={item} index={index} icon={item.icon} text={item.text}/>
                    ))}
                     {/* Adiciona card vazio invisível se o número de itens for ímpar */}
                     {whyChooseItems.length % 2 !== 0 && (
                        <div className="hidden md:block col-span-1"></div>
                    )}
                </motion.div>

                 {/* Link para visitar (assumindo link para a seção de contato) */}
                 <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, amount: 0.3 }}
                   transition={{ duration: 0.8, delay: whyChooseItems.length * 0.1 + 0.3, ease: 'circOut' }}
                   className="mt-16 text-center"
                 >
                    <Link href="#contato" passHref legacyBehavior>
                         <motion.a
                             className="inline-flex flex-col items-center font-semibold text-lo-peach hover:text-white transition-colors duration-300"
                             whileHover={{ y: -3 }}
                        >
                            <div>
                                <p className="text-white/70 text-lg mb-2">Gostaria de nos fazer uma visita?</p>
                                <span className="inline-flex items-center">
                                     Clique aqui e confira nosso endereço e o mapa de como chegar até a nós.
                                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </span>
                            </div>
                        </motion.a>
                    </Link>
                 </motion.div>
            </div>
         </section>


        {/* --- SEÇÃO DE OUTROS SEGUROS (CARDS MODERNOS E CLICÁVEIS) --- */}
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
                    {otherInsuranceLinks.map((item, index) => (
                       <InteractiveServiceLinkCard
                           key={index}
                           icon={item.icon}
                           title={item.title}
                           href={item.href}
                           index={index}
                       />
                    ))}
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