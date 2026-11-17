import { useState, useEffect } from 'react';

export interface SectionMeta {
  id: string;
  number: string;
  label: string;
  title: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: 'hero', number: '00', label: 'WELCOME', title: 'Experiences, Engineered' },
  { id: 'about', number: '01', label: 'ABOUT', title: 'Beyond Data. Beyond Limits.' },
  { id: 'tracks', number: '02', label: 'TRACKS', title: 'Choose Your Innovation Track' },
  { id: 'highlights', number: '03', label: 'HIGHLIGHTS', title: 'Every Second Counts' },
  { id: 'timeline', number: '04', label: 'TIMELINE', title: 'Event Roadmap' },
  { id: 'prizes', number: '05', label: 'PRIZES', title: 'Build Something. Win Something' },
  { id: 'sponsors', number: '06', label: 'SPONSORS', title: 'Powered By Innovation' },
  { id: 'faq', number: '07', label: 'FAQ', title: "Questions? We've Got Answers" },
  { id: 'register', number: '08', label: 'REGISTER', title: 'Your Next Big Idea Starts Here' },
];

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState<SectionMeta>(SECTIONS[0]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollProgress(progress);

      const viewportOffset = window.innerHeight * 0.35;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportOffset) {
            setActiveSection(SECTIONS[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection, scrollProgress, sections: SECTIONS };
}
