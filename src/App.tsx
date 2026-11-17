import { useState } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Tracks } from './components/Tracks';
import { Highlights } from './components/Highlights';
import { Timeline } from './components/Timeline';
import { Prizes } from './components/Prizes';
import { Sponsors } from './components/Sponsors';
import { FAQ } from './components/FAQ';
import { Registration } from './components/Registration';
import { Footer } from './components/Footer';
import { HorizontalTransition } from './components/HorizontalTransition';
import { ChapterIndicator } from './components/ChapterIndicator';
import { RegistrationModal } from './components/RegistrationModal';
import { useScrollSpy } from './hooks/useScrollSpy';

export function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { activeSection, scrollProgress } = useScrollSpy();

  const activeIndex = parseInt(activeSection.number, 10) || 0;

  return (
    <div className="relative min-h-screen bg-[#030511] text-white selection:bg-[#00E5FF]/30 selection:text-white font-sans overflow-x-hidden">
      {/* 1. Underlying Looping Sci-Fi Motion Video Background */}
      <BackgroundVideo />

      {/* 2. 3D Interactive Three.js Scene (Camera moves with section scroll) */}
      <ThreeBackground activeSectionIndex={activeIndex} />

      {/* 3. Floating Sticky Navigation Bar with Real-Time Active Section Pill */}
      <Navbar
        activeSectionId={activeSection.id}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
      />

      {/*
        ═════════════════════════════════════════════════════════════════════
        CONTINUOUS SINGLE-PAGE SCROLLING LAYOUT
        Clicking any section (e.g. Sponsors) smoothly scrolls down the page,
        crossing all intermediate sections with laser transitions before landing!
        ═════════════════════════════════════════════════════════════════════
      */}
      <main className="relative z-10 w-full">
        {/* Section 00: Hero & Holographic Chronometer */}
        <Hero onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />

        {/* Laser Cyber Transition to Section 01 */}
        <HorizontalTransition label="ABOUT // BEYOND LIMITS" chapterNumber="01" />

        {/* Section 01: About & Innovation Pillars */}
        <About />

        {/* Laser Cyber Transition to Section 02 */}
        <HorizontalTransition label="HACKATHON TRACKS" chapterNumber="02" />

        {/* Section 02: Innovation Tracks */}
        <Tracks />

        {/* Laser Cyber Transition to Section 03 */}
        <HorizontalTransition label="EVENT HIGHLIGHTS" chapterNumber="03" />

        {/* Section 03: Highlights & Stats */}
        <Highlights />

        {/* Laser Cyber Transition to Section 04 */}
        <HorizontalTransition label="EVENT ROADMAP" chapterNumber="04" />

        {/* Section 04: Timeline Milestones */}
        <Timeline />

        {/* Laser Cyber Transition to Section 05 */}
        <HorizontalTransition label="PRIZES & REWARDS" chapterNumber="05" />

        {/* Section 05: Prizes Podium & Special Awards */}
        <Prizes />

        {/* Laser Cyber Transition to Section 06 */}
        <HorizontalTransition label="POWERED BY INNOVATION" chapterNumber="06" />

        {/* Section 06: Sponsors & Industry Partners */}
        <Sponsors />

        {/* Laser Cyber Transition to Section 07 */}
        <HorizontalTransition label="FREQUENTLY ASKED QUESTIONS" chapterNumber="07" />

        {/* Section 07: FAQ Accordion */}
        <FAQ />

        {/* Laser Cyber Transition to Section 08 */}
        <HorizontalTransition label="REGISTRATION INITIATIVE" chapterNumber="08" />

        {/* Section 08: Final Registration CTA */}
        <Registration onOpenRegisterModal={() => setIsRegisterModalOpen(true)} />

        {/* Comprehensive Futuristic Footer */}
        <Footer />
      </main>

      {/* Floating Bottom-Left Chapter HUD & Top Scroll Progress Bar */}
      <ChapterIndicator
        activeSection={activeSection}
        scrollProgress={scrollProgress}
      />

      {/* Registration Portal / Coming Soon Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}

export default App;
