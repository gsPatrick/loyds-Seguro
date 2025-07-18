// componentsSeguros/Header/Header.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Seguro para Auto', href: '/auto' },
    { name: 'Seguro para Motos', href: '/moto' },
    { name: 'Seguro Mensal', href: '/mensal' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-lo-dark-blue shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo - CORRIGIDO: Usando text-white */}
          <Link href="/" className="text-2xl font-bold text-white">
            Loyds<span className="text-lo-peach"> </span>Seguros
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-lo-peach transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            {/* O link do botão CTA desktop foi ajustado para usar o ID da seção de seguros, conforme a home (index.js) */}

          </div>

          {/* Menu Mobile (Hamburger) - CORRIGIDO: Usando text-white para o ícone */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white z-50">
              {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Painel do Menu Mobile - CORRIGIDO: Usando bg-lo-dark-blue/50 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-lo-dark-blue/50 backdrop-blur-lg z-40 flex items-center justify-center"
          >
            <motion.nav
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex flex-col items-center gap-y-10"
            >
              {/* Links do Menu Mobile - CORRIGIDO: Usando text-white */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-bold text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* CTA do Menu Mobile - O link do botão CTA mobile foi ajustado para usar o ID da seção de seguros, conforme a home (index.js) */}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;