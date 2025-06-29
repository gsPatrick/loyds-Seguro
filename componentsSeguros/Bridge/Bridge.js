// componentsSeguros/Bridge/Bridge.js

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Bridge = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const textEl = textRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top center',
        end: 'bottom center',
        scrub: 1, // Animação suave conectada ao scroll
      }
    });

    // A animação de "morphing"
    tl.fromTo(textEl,
      { // Estado Inicial
        letterSpacing: '1rem',
        filter: 'blur(12px)',
        opacity: 0.3,
        scale: 1.2
      },
      { // Estado Final
        letterSpacing: '0rem',
        filter: 'blur(0px)',
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      }
    );

    // Adiciona um brilho sutil no texto no momento do foco
    tl.to(textEl, {
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
      duration: 0.5,
      yoyo: true, // Faz o brilho ir e voltar
      repeat: 1,
    }, "-=0.5");

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionEl) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#121313' }}
    >
      <div className="relative z-10 text-center">
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase"
        >
          {/* Frase de impacto atualizada para ser mais curta e focar na consultoria oficial */}
          O seguro ideal para você.
          <br/>
          Com a <span className="font-light italic"></span> Loyds Seguros
        </h2>
      </div>
    </section>
  );
};

export default Bridge;
