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
    { name: 'Seguro para Carros', href: '/seguros/carro' },
    { name: 'Seguro para Motos', href: '/seguros/moto' },
    { name: 'Seguro Mensal', href: '/seguros/mensal' },
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
          {/* Logo */}
          <Link href="/seguros" className="text-2xl font-bold text-lo-white">
            Loyds<span className="text-lo-peach"> </span>Seguros
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-lo-white/80 hover:text-lo-peach transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <Link
              href="#nossos-seguros"
              className="px-5 py-2.5 text-sm font-bold text-lo-dark-blue bg-lo-peach rounded-lg shadow-md hover:bg-opacity-90 transition-all"
            >
              Simule Agora
            </Link>
          </div>

          {/* Menu Mobile (Hamburger) */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-lo-white z-50">
              {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Painel do Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-lo-dark-blue/90 backdrop-blur-lg z-40 flex items-center justify-center"
          >
            <motion.nav
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex flex-col items-center gap-y-10"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-bold text-lo-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#nossos-seguros"
                className="mt-6 px-8 py-4 text-lg font-bold text-lo-dark-blue bg-lo-peach rounded-lg shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Simule Agora
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
