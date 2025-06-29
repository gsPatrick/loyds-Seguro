// pages/seguros/index.js

import Head from 'next/head';
import Header from '../../componentsSeguros/Header/Header.js';
import Hero from '../../componentsSeguros/Hero/Hero.js';
import Intro from '../../componentsSeguros/Intro/Intro.js'; // 1. Importar o Intro
import InsuranceSection from '../../componentsSeguros/Insurance/InsuranceSection.js';
import Bridge from '@/componentsSeguros/Bridge/Bridge.js';
import ContactSection from '../../componentsSeguros/Contact/ContactSection.js'; // 1. Importar
import Footer from '../../componentsSeguros/Footer/Footer.js'; // 1. Importar
import PartnerLogos from '@/componentsSeguros/PartnerLogos/PartnerLogos.js';
import WhatsAppCTA
 from '@/componentsSeguros/CTA/WhatsAppCTA.js';
 import WhatsAppOnly from '@/componentsSeguros/CTA/WhatsappOnly.js';
export default function LoydsSegurosPage() {
  return (
    <>
      <Head>
        <title>Loyds Seguros | Proteção Descomplicada para sua Jornada</title>
        <meta name="description" content="Seguros para carros, motos e planos mensais. Calcule e contrate online com a Loyds Seguros." />
      </Head>
      
      <Header />
      
      <main style={{ backgroundColor: '#121313' }}>
        <Hero />
        < WhatsAppOnly />
        < PartnerLogos />
        < WhatsAppCTA />
                <Bridge />

        {/* 2. Adicionar a nova seção Intro ANTES dos cards */}
        <Intro />

        <InsuranceSection />
        < WhatsAppOnly />
                <ContactSection />

      </main>
      
              <Footer />

    </>
  );
}