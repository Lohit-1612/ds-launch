import { useState, useEffect } from 'react';
import type { FC, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  activeSectionId: string;
  onOpenRegisterModal: () => void;
  onSectionClick?: (sectionId: string, sectionName: string) => void;
}

export const Navbar: FC<NavbarProps> = ({
  activeSectionId,
  onOpenRegisterModal,
  onSectionClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Tracks', href: '#tracks', id: 'tracks' },
    { name: 'Timeline', href: '#timeline', id: 'timeline' },
    { name: 'Prizes', href: '#prizes', id: 'prizes' },
    { name: 'Sponsors', href: '#sponsors', id: 'sponsors' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string, name: string, id: string) => {
    e.preventDefault();
    soundManager.playClick();
    setMobileMenuOpen(false);

    if (onSectionClick) {
      onSectionClick(id, name);
    }

    const target = document.querySelector(href);
    if (target) {
      const navHeight = 70;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: 'smooth',
      });
    }
  };

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playClick();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#050817]/85 backdrop-blur-xl border-b border-[#00E5FF]/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero', 'Home', 'hero')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] via-[#287BFF] to-[#8755FF] p-0.5 shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.8)] transition-all duration-300">
              <div className="w-full h-full bg-[#050817] rounded-[10px] flex items-center justify-center">
                <span className="font-heading font-black text-sm tracking-tighter text-[#00E5FF]">
                  DS
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black tracking-wider text-lg text-white group-hover:text-[#00E5FF] transition-colors">
                  {eventConfig.name}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30">
                  {eventConfig.version}
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-[#A7B1CC] font-mono hidden sm:block uppercase">
                Panimalar Engg College
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Smooth Horizontal Sliding Indicator */}
          <nav
            onMouseLeave={() => setHoveredTab(null)}
            className="relative hidden lg:flex items-center gap-1 bg-[#0A1025]/85 px-4 py-2 rounded-full border border-[#00E5FF]/25 backdrop-blur-xl shadow-[0_0_25px_rgba(0,229,255,0.1)]"
          >
            {navLinks.map((link) => {
              const isActive = activeSectionId === link.id;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => {
                    soundManager.playTick();
                    setHoveredTab(link.id);
                  }}
                  onClick={(e) => handleLinkClick(e, link.href, link.name, link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-colors duration-200 select-none ${
                    isActive
                      ? 'text-[#00E5FF] font-bold'
                      : 'text-[#A7B1CC] hover:text-white'
                  }`}
                >
                  {/* Fluid Horizontal Sliding Active Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.35)] -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 32,
                      }}
                    >
                      {/* Cyan Glowing Dot attached to sliding pill */}
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
                    </motion.div>
                  )}

                  {/* Subtle Horizontal Hover Indicator */}
                  {hoveredTab === link.id && !isActive && (
                    <motion.div
                      layoutId="hoverNavPill"
                      className="absolute inset-0 rounded-full bg-white/5 border border-white/10 -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute Futuristic UI Audio' : 'Mute Audio'}
              className="p-2 rounded-xl bg-[#0A1025] border border-[#00E5FF]/20 text-[#A7B1CC] hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all duration-200 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00E5FF]" />}
            </button>

            {/* Register CTA */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenRegisterModal();
              }}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#287BFF] to-[#00E5FF] text-[#050817] font-heading font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-[#0A1025] border border-[#00E5FF]/20 text-[#A7B1CC]"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00E5FF]" />}
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-lg bg-[#0A1025] border border-[#00E5FF]/20 text-white hover:text-[#00E5FF]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#050817]/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 border-b border-[#00E5FF]/20 animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSectionId === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.name, link.id)}
                  className={`px-4 py-3 rounded-xl font-heading text-lg transition-all ${
                    isActive
                      ? 'bg-[#00E5FF]/10 text-[#00E5FF] font-bold border-l-4 border-[#00E5FF]'
                      : 'text-[#A7B1CC] hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-[#00E5FF]/15 flex flex-col gap-4">
            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(false);
                onOpenRegisterModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#287BFF] to-[#00E5FF] text-[#050817] font-heading font-bold text-sm tracking-wider shadow-[0_0_25px_rgba(0,229,255,0.4)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>REGISTER NOW</span>
            </button>

            <p className="text-center text-xs text-[#A7B1CC] font-mono">
              {eventConfig.organizer.college}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
