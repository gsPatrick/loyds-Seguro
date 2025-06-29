// componentsSeguros/Footer/Footer.js (VERSÃO "CORPORATE ANCHOR" CORRIGIDA)

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
        { icon: <FaPhoneAlt size={18} />, text: '+55 11 99999-8888', href: 'tel:+5511999998888' },
        { icon: <FaWhatsapp size={18} />, text: 'Atendimento WhatsApp', href: 'https://wa.me/5511999998888' },
        { icon: <FaEnvelope size={18} />, text: 'contato@loydsseguros.com', href: 'mailto:contato@loydsseguros.com' },
        { icon: <FaMapMarkerAlt size={18} />, text: 'Rua Exemplo, 123 - São Paulo/SP', href: '#' },
        { icon: <FaLinkedin size={18} />, text: 'Loyds Seguros no LinkedIn', href: 'https://linkedin.com/company/loyds-seguros' },
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
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.div variants={itemVariants} className="text-3xl font-extrabold text-white">
                            Loyds<span className="font-light opacity-70"> Seguros</span>
                        </motion.div>
                        <motion.p variants={itemVariants} className="mt-4 text-sm text-white/60 max-w-xs">
                            Modernizando a proteção para sua jornada. Simples, digital e transparente.
                        </motion.p>
                    </div>

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

                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.h3 variants={itemVariants} className="text-lg font-bold text-white mb-4">
                            Informações Legais
                        </motion.h3>
                        <motion.p variants={itemVariants} className="text-sm text-white/60">
                            CNPJ: XX.XXX.XXX/XXXX-XX
                        </motion.p>
                        <motion.p variants={itemVariants} className="mt-2 text-sm text-white/60">
                            Horário de Atendimento: <br /> Seg. a Sex. das 9h às 18h
                        </motion.p>
                        <ul className="mt-4 space-y-2">
                            <motion.li variants={itemVariants}>
                                <Link
                                    href="#"
                                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                                >
                                    Política de Privacidade
                                </Link>
                            </motion.li>
                            <motion.li variants={itemVariants}>
                                <Link
                                    href="#"
                                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                                >
                                    Termos de Uso
                                </Link>
                            </motion.li>
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
