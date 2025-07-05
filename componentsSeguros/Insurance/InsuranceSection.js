import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCar, FaMotorcycle, FaCalendarAlt } from 'react-icons/fa';

const MonochromeCard = ({ icon, title, description, href, delay }) => {
    const cardRef = useRef(null);
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay * 0.15 } }
    };

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            onMouseMove={handleMouseMove}
            className="group relative w-full h-[400px] rounded-2xl p-8 flex flex-col items-center text-center overflow-hidden"
            style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08), transparent 80%)',
                backdropFilter: 'blur(12px)',
            }}
        >
            <Link href={href} passHref legacyBehavior>
                {/* Tornando a área de conteúdo o link clicável */}
                <motion.a
                    className="relative z-10 flex flex-col h-full items-center w-full cursor-pointer" // Adicionado cursor-pointer
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <div className="text-5xl text-white/80 group-hover:text-white transition-colors duration-300 mb-6">{icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                    <p className="text-white/60 mb-8 flex-grow">{description}</p>
                    <div className="mt-auto inline-flex items-center text-white/80 font-semibold transition-all duration-300 group-hover:text-white group-hover:tracking-wider">
                        Simular Agora
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>
                </motion.a>
            </Link>
        </motion.div>
    );
};

const InsuranceSection = () => {
  // Descrições e links atualizados conforme a posição da Loyds (corretora) e URLs solicitadas
  const insuranceTypes = [
    {
      icon: <FaCar />,
      title: 'Seguro Auto',
      description: 'Consultoria especializada para encontrar a melhor opção de Seguro Auto entre as principais seguradoras. Coberturas flexíveis para seu perfil',
      href: '/auto' // Link confirmado
    },
    {
      icon: <FaMotorcycle />,
      title: 'Seguro Moto',
      description: 'Intermediamos as melhores soluções em Seguro Moto com seguradoras parceiras. Cotações personalizadas para sua necessidade, cobrindo roubo, colisão.',
      href: '/moto' // Link confirmado
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Seguro Mensal',
      description: 'Seguro Mensal em todo território nacional sem contrato de seguro tradicional. Conte com guincho, pane elétrica/mecânica, troca de pneus e chaveiro.',
      href: '/mensal' // Link confirmado
    },
  ];

  return (
    <section
      className="pb-24 sm:pb-32" // Apenas padding no final agora
      style={{ backgroundColor: '#121313' }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {insuranceTypes.map((insurance, index) => (
            <MonochromeCard
              key={index}
              delay={index}
              icon={insurance.icon}
              title={insurance.title}
              description={insurance.description}
              href={insurance.href}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InsuranceSection;