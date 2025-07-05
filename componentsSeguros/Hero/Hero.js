// componentsSeguros/Hero/Hero.js (VERSÃO "IMERSÃO TOTAL DA MARCA")

import { useEffect, useRef, useState } from 'react'; // Importação correta dos hooks
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { gsap } from 'gsap';
import { FaCar, FaMotorcycle, FaCalendarCheck } from 'react-icons/fa'; // Ícones para os seguros

// Componente para a animação gráfica dos veículos com transição (sem mudanças)
const VehicleGraphic = () => {
    const icons = [
        <FaCar key="car" />,
        <FaMotorcycle key="motorcycle" />,
        <FaCalendarCheck key="monthly" />
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % icons.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [icons.length]);

    return (
        <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
        >
            <motion.div
                className="absolute w-[80%] h-[80%] rounded-full bg-white/5 filter blur-2xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
            />
            <motion.svg className="absolute w-full h-full" viewBox="0 0 500 500">
                <motion.path d="M 100 250 C 200 150, 300 150, 400 250" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 1.5, ease: 'easeInOut' }} />
                <motion.path d="M 100 250 C 200 350, 300 350, 400 250" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }} />
            </motion.svg>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
                    transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
                    className="text-white text-7xl md:text-8xl"
                >
                    {icons[currentIndex]}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};


const Hero = () => {
    const containerRef = useRef(null);

    // Usar useEffect diretamente, pois já foi importado
    useEffect(() => {
        const elements = gsap.utils.toArray(".hero-element");
        if (elements.length === 0) return;

        // Limpar quaisquer animações GSAP existentes nos elementos ao montar
        gsap.killTweensOf(elements);

        // Definir o estado inicial dos elementos imediatamente visíveis
        // Isso garante que se a animação não rodar por qualquer motivo (ex: navegação de volta sem remount), eles estejam visíveis por padrão.
        // A animação 'from' sobrescreverá isso no início, se rodar.
        gsap.set(elements, { opacity: 1, y: 0, clearProps: "opacity,y" });


        // Criar a timeline de animação para animar *do* estado inicial (invisível) *para* o estado atual (visível)
        // Usar .from para animar DESSES valores para os valores atuais do CSS
        const tl = gsap.timeline({ delay: 0.3 });
        tl.from(elements, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
        });

        return () => {
            // Opcional: Matar a timeline ao desmontar para evitar vazamento de memória,
            // embora o seletor '.hero-element' deva ser suficiente se os elementos forem removidos.
             if (tl) tl.kill();
             // Limpar animações GSAP nos elementos ao desmontar
             gsap.killTweensOf(elements);
        };
    }, []); // Empty dependency array for mount effect


    const insuranceLinks = [
        { name: 'Seguro Auto', href: '/auto', icon: <FaCar className="mr-2"/> },
        { name: 'Seguro Moto', href: '/moto', icon: <FaMotorcycle className="mr-2"/> },
        { name: 'Seguro Mensal', href: '/mensal', icon: <FaCalendarCheck className="mr-2"/> }, // Ajustado o nome para bater com a estrutura
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col overflow-hidden"
            style={{ backgroundColor: '#121313' }} // Fundo principal da seção
        >
            {/* O Header global do _app.js ficará por cima, se existir */}
            {/* Conteúdo principal da Hero Section */}
            <div
                className="relative w-full flex-grow flex items-center pt-20" // Padding top para o header que está fixo
            >
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 flex-grow">
                    {/* Lado Esquerdo: Conteúdo */}
                    <div className="flex flex-col justify-center text-left p-6 py-12 md:py-6">
                        <div className="hero-element">
                            {/* Título atualizado para incluir o nome da empresa e o título solicitado */}
                            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">
                                <span className="text-white/60">Loyds Seguros: </span>
                                Seguro Auto, Moto e saireguro Mensal com quem entende
                            </h1>
                        </div>
                        <div className="hero-element mt-6">
                            {/* Subtítulo atualizado conforme solicitado */}
                            <p className="text-lg text-white/70 max-w-md">
                                A Loyds é uma corretora registrada na SUSEP. Atuamos intermediando soluções de seguradoras oficiais e oferecendo consultoria especializada para você encontrar a opção ideal.
                            </p>
                        </div>

                        {/* Links Rápidos para Seguros (mantidos conforme estrutura original) */}
                        {/* NOTA: A instrução pedia um CTA "Solicite sua cotação via WhatsApp" aqui. Mantive os links originais que levam para tipos de seguro, pois a instrução é "sem alterar nada, apenas mudando a COPY", e a estrutura de links já estava presente. Um botão direto para WhatsApp precisaria de alteração estrutural. */}
                        <div className="hero-element mt-10 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                            {insuranceLinks.map((link) => (
                                <Link key={link.name} href={link.href} passHref legacyBehavior>
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="group flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-white/20 rounded-lg text-white/80 hover:text-white hover:border-white/40 transition-all duration-300"
                                    >
                                        {link.icon}
                                        {link.name}
                                    </motion.a>
                                </Link>
                            ))}
                        </div>

                        {/* Este div parece ser apenas espaçamento na estrutura original */}
                        <div className="hero-element mt-12">

                        </div>
                    </div>

                    {/* Lado Direito: Animação */}
                    <div className="relative flex items-center justify-center h-full min-h-[300px] md:min-h-0">
                        <VehicleGraphic />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;