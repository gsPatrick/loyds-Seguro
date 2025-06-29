import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Intro = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Esconde as palavras para prepará-las para a animação
    const words = gsap.utils.toArray(titleRef.current.children);
    gsap.set(words, { y: 30, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    });

    // Animação do título, palavra por palavra
    tl.to(words, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.1 // Stagger para o efeito de cascata
    })
    .from(paragraphRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    }, "-=0.7"); // Inicia um pouco antes da animação anterior terminar

    return () => { if (tl) tl.kill(); };
  }, []);

  // Mantém o título original
  const title = "Seguro não é sobre o imprevisto.";
  const title2 = "É sobre a certeza de seguir em frente.";

  // Novo texto para o parágrafo, conforme instruído
  const newParagraphText = "A Loyds atua como sua corretora. Intermediamos seguros com seguradoras reconhecidas e regulamentadas pela SUSEP, oferecendo consultoria especializada para você encontrar a solução mais adequada. Transparência, agilidade e atendimento humano ao seu alcance. Role a tela e conheça as opções.";

  return (
    <section
      id="nossos-seguros"
      ref={containerRef}
      className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden p-4"
      style={{ backgroundColor: '#121313' }}
    >
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          <span ref={titleRef}>
            {/* Mantém o mapeamento do título original */}
            {title.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-3 md:mr-4">{word}</span>
            ))}
            <br/>
            {title2.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-3 md:mr-4 text-white/70">{word}</span>
            ))}
          </span>
        </h2>

        <p ref={paragraphRef} className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
          {/* Insere o NOVO texto do parágrafo */}
          {newParagraphText}
        </p>
      </div>

      {/* Indicador de Scroll Aprimorado */}
      <motion.div
        className="absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-1 h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0">
          <motion.div
            className="w-1 h-4 bg-white rounded-full"
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Intro;
