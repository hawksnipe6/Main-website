'use client';
import { useEffect, useRef, useState } from 'react';
import type { NavKey } from '@/lib/content';

import NavBar                                            from '@/components/NavBar';
import HeroSection                                       from '@/components/HeroSection';
import PortfolioSection                                  from '@/components/PortfolioSection';
import { IntroSection, ProcessSection, BenefitsSection } from '@/components/MidSections';
import TestimonialsSection                               from '@/components/TestimonialsSection';
import PricingSection                                    from '@/components/PricingSection';
import FAQSection                                        from '@/components/FAQSection';
import { CTABanner, Footer }                             from '@/components/CTAAndFooter';
import CTAModal                                          from '@/components/CTAModal';

export default function Home() {
  const [modal, setModal] = useState<{ open: boolean; source: string }>({
    open: false,
    source: 'cta',
  });

  const refs = useRef<Record<NavKey, HTMLElement | null>>({
    Work: null, About: null, Process: null, Pricing: null, FAQ: null,
  });

  const scrollTo = (key: NavKey) => {
    refs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openModal = (source: string) => setModal({ open: true, source });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  // Global scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const obs = new IntersectionObserver(
      es => es.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.1 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <NavBar onNavigate={scrollTo} onCTA={() => openModal('cta_nav')} />

      <main>
        <HeroSection onCTA={() => openModal('cta_hero')} />

        <div ref={el => { refs.current.Work = el; }}>
          <PortfolioSection />
        </div>

        <div ref={el => { refs.current.About = el; }}>
          <IntroSection />
        </div>

        <div ref={el => { refs.current.Process = el; }}>
          <ProcessSection />
        </div>

        <BenefitsSection />
        <TestimonialsSection />

        <div ref={el => { refs.current.Pricing = el; }}>
          <PricingSection onCTA={() => openModal('cta_pricing')} />
        </div>

        <div ref={el => { refs.current.FAQ = el; }}>
          <FAQSection />
        </div>

        <CTABanner onPress={() => openModal('cta_banner')} />
      </main>

      <Footer onCTA={() => openModal('cta_footer')} />

      {modal.open && (
        <CTAModal source={modal.source} onClose={closeModal} />
      )}
    </>
  );
}
