// componentsSeguros/PartnerLogos/PartnerLogos.js

import React, { useRef, useEffect } from 'react'; // Importar React
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Caminho para a sua única imagem sprite contendo todos os logos
const SPRITE_IMAGE_SRC = '/icons/icons.png'; // Confirmado o nome do arquivo e pasta

const PartnerLogos = () => {
  const sectionRef = useRef(null);
  // Referência para o contêiner da imagem, onde aplicaremos a animação
  const imageContainerRef = useRef(null);

  React.useEffect(() => { // Use React.useEffect explicitamente
    const sectionEl = sectionRef.current;
    const imageEl = imageContainerRef.current;

    if (!imageEl || !sectionEl) return; // Sai se os elementos não existirem

    // Definir um ID para o ScrollTrigger para poder limpá-lo explicitamente
    const triggerId = "partner-logos-animation";

    // Matar ScrollTrigger existente com este ID antes de criar um novo
    ScrollTrigger.getById(triggerId)?.kill();

    // Definir o estado final visível como padrão para a imagem (caso a animação não rode)
    gsap.set(imageEl, { opacity: 1, y: 0, clearProps: "opacity,y" });


    // Criar a timeline de animação e associar ao ScrollTrigger
    const tl = gsap.timeline({
         scrollTrigger: {
            id: triggerId, // Usar o ID
            trigger: sectionEl,
            start: 'top 80%', // Começa a animação quando 80% do topo do trigger entra na tela
            toggleActions: 'play none none reverse', // Play on enter, reverse on leave
            // once: true, // Descomente se quiser que a animação rode apenas uma vez
            // markers: true, // Opcional: para depuração visual
            // Refresh ScrollTrigger metrics on update (e.g., after layout changes)
            // Esto pode ser útil em algumas SPAs, mas pode causar flickering se o layout muda constantemente
            // refreshPriority: 1, // Prioridade para refresh
        }
    });

    // Adicionar a animação from() à timeline
    // A animação from() define o estado inicial (invisível e deslocado) no momento que a animação começa
    tl.from(imageEl, {
        opacity: 0, // Começa com opacidade 0
        y: 20, // Começa 20px abaixo
        duration: 0.8, // Duração da animação
        ease: 'power2.out', // Curva de animação
    }, 0); // O '0' garante que esta animação comece no início da timeline

    return () => {
      // Cleanup: Matar o ScrollTrigger quando o componente desmonta ou o efeito é re-executado
      ScrollTrigger.getById(triggerId)?.kill();
      // Limpar animações GSAP específicas no elemento da imagem
      gsap.killTweensOf(imageEl);
    };

  }, []); // Empty dependency array for mount effect

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: '#121313' }} // Fundo escuro da seção principal
    >
      <div className="container mx-auto px-4 text-center">
        {/* Título e texto introdutório */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Parcerias de Confiança para o Seu Seguro
        </h2>
        {/* Texto introdutório */}
        <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12">
          Intermediamos soluções com seguradoras reconhecidas e regulamentadas pela SUSEP, com confiança e agilidade.
          Trabalhamos com parceiras sólidas para garantir as melhores opções para o seu perfil.
        </p>

        {/* Contêiner para a imagem sprite inteira com o mesmo fundo escuro */}
        {/* Aplicaremos a ref e a animação GSAP a este div */}
        {/* IMPORTANT: A sombra é aplicada aqui para destacar este bloco da imagem */}
        <div
          ref={imageContainerRef}
          className="w-full flex justify-center py-8" // Flexbox para centralizar, padding vertical
          // O fundo já é #121313 pela section pai
          // style={{ backgroundColor: '#121313' }} // Não precisa definir de novo se herda corretamente
        >
          {/* Contêiner interno para o Next/Image com a sombra */}
          {/* Ajuste max-w e h conforme a proporção e tamanho desejado da sua imagem */}
          {/* ADICIONADA CLASSE DE SOMBRA AQUI */}
          {/* ALTURA AUMENTADA AQUI: h-24 md:h-32 mudou para h-32 md:h-48 */}
          <div className="relative w-full max-w-5xl h-32 md:h-48 shadow-xl">
             <Image
                src={SPRITE_IMAGE_SRC}
                alt="Nossos parceiros seguradores" // Alt text descritivo
                fill // Preenche o contêiner pai
                style={{ objectFit: 'contain' }} // Mantém a proporção, garantindo que a imagem inteira seja visível
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px" // Otimização Next/Image
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;