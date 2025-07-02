// componentsSeguros/Footer/Footer.js (VERSÃO FINAL ATUALIZADA)

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    const devCreditRef = useRef(null);

    const handleMouseMoveDevCredit = (e) => {
        if (!devCreditRef.current) return;
        const rect = devCreditRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        devCreditRef.current.style.setProperty('--mouse-x', `${x}px`);
        devCreditRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const contactInfo = [
        { icon: <FaPhoneAlt size={18} />, text: '(21) 98285-4688', href: 'tel:+5521982854688' },
        {
            icon: <FaWhatsapp size={18} />,
            text: 'Atendimento WhatsApp',
            href: 'https://wa.me/5521982854688?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20informa%C3%A7%C3%B5es%20sobre%20os%20seguros%20e%20planos%20da%20Loyds%20Seguros.'
        },
        { icon: <FaEnvelope size={18} />, text: 'cálculo@loydseguros.com.br', href: 'mailto:cálculo@loydseguros.com.br' },
        { icon: <FaMapMarkerAlt size={18} />, text: 'Travessa do Ouvidor, 5 - 2º andar. Centro - Rio de Janeiro - 20.040-040.', href: '#' },
    ];

    return (
        <motion.footer
            className="w-full py-16 overflow-hidden"
            style={{ backgroundColor: '#121313' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-6 sm:px-8 flex flex-col gap-y-12">

                <motion.div variants={itemVariants} className="w-full h-px bg-white/10" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Coluna 1 */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.div variants={itemVariants} className="text-3xl font-extrabold text-white">
                            Loyds<span className="font-light opacity-70"> Seguros</span>
                        </motion.div>
                        <motion.p variants={itemVariants} className="mt-4 text-sm text-white/60 max-w-xs">
                            A Loyds Corretora de Seguros é habilitada na Susep para operar todos os tipos de Seguros.
                        </motion.p>
                    </div>

                    {/* Coluna 2 */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.h3 variants={itemVariants} className="text-lg font-bold text-white mb-4">
                            Contato e Suporte
                        </motion.h3>
                        <ul className="space-y-3">
                            {contactInfo.map((item, index) => (
                                <motion.li key={index} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center justify-center md:justify-start gap-3 text-white/60 hover:text-white transition-colors duration-300"
                                        target={item.href.startsWith('http') ? '_blank' : '_self'}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        {item.icon}
                                        <span className="text-sm">{item.text}</span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna 3 */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.h3 variants={itemVariants} className="text-lg font-bold text-white mb-4">
                            Informações Legais
                        </motion.h3>
                        <motion.p variants={itemVariants} className="text-sm text-white/60">
                            CNPJ: 41.311.114/0001-30
                        </motion.p>
                        <motion.p variants={itemVariants} className="mt-1 text-sm text-white/60">
                            SUSEP: 21.211.25.55
                        </motion.p>
                        <motion.p variants={itemVariants} className="mt-2 text-sm text-white/60">
                            Horário de Atendimento: <br /> Seg. a Sex. das 9h às 18h
                        </motion.p>
                        <ul className="mt-4 space-y-2">
                        </ul>
                    </div>
                </div>

                <motion.div variants={itemVariants} className="w-full h-px bg-white/10" />

                <div className="w-full flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
                    <motion.p variants={itemVariants} className="text-sm text-white/40">
                        © {new Date().getFullYear()} Loyds Seguros. Todos os direitos reservados.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        ref={devCreditRef}
                        className="relative z-10 p-2 rounded-lg cursor-pointer transition-shadow duration-300"
                        onMouseMove={handleMouseMoveDevCredit}
                        onMouseLeave={() => {
                            if (devCreditRef.current) {
                                devCreditRef.current.style.background = 'none';
                                devCreditRef.current.style.boxShadow = 'none';
                            }
                        }}
                        whileHover={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' }}
                        style={{
                            background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.05), transparent 80%)'
                        }}
                    >
                        <Link
                            href="https://codebypatrick.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/50 text-sm hover:text-white transition-colors duration-300"
                        >
                            Desenvolvido por <span className="font-semibold">Patrick.Developer</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
