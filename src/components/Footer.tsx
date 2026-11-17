import type { FC } from 'react';
import { ArrowUp, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';
import { soundManager } from '../utils/audio';

export const Footer: FC = () => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050817] border-t border-[#00E5FF]/20 pt-20 pb-12 overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-t from-[#287BFF]/10 via-[#00E5FF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#00E5FF]/15">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] via-[#287BFF] to-[#8755FF] p-0.5 shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                <div className="w-full h-full bg-[#050817] rounded-[10px] flex items-center justify-center">
                  <span className="font-heading font-black text-sm text-[#00E5FF]">DS</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-2xl text-white tracking-wider">
                  {eventConfig.name}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30">
                  {eventConfig.version}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#A7B1CC] max-w-sm leading-relaxed mb-6">
              {eventConfig.tagline} {eventConfig.description}
            </p>

            <div className="text-xs font-mono text-[#00E5FF] space-y-1">
              <div>{eventConfig.organizer.college}</div>
              <div className="text-[#A7B1CC]">{eventConfig.organizer.department}</div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-[#A7B1CC]">
              {['Hero', 'About', 'Tracks', 'Highlights', 'Timeline', 'Prizes', 'Sponsors', 'FAQ', 'Register'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => soundManager.playClick()}
                    className="hover:text-[#00E5FF] transition-colors"
                  >
                    → {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] font-semibold mb-4">
              Campus & Inquiries
            </h4>

            <div className="space-y-3.5 text-xs text-[#A7B1CC]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span>{eventConfig.organizer.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#287BFF] shrink-0" />
                <a href={`mailto:${eventConfig.contact.email}`} className="hover:text-white transition-colors">
                  {eventConfig.contact.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8755FF] shrink-0" />
                <span>{eventConfig.contact.phone}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {/* Instagram SVG */}
              <a
                href={eventConfig.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0A1025] border border-[#00E5FF]/20 flex items-center justify-center text-[#A7B1CC] hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a
                href={eventConfig.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0A1025] border border-[#00E5FF]/20 flex items-center justify-center text-[#A7B1CC] hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* GitHub SVG */}
              <a
                href={eventConfig.contact.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0A1025] border border-[#00E5FF]/20 flex items-center justify-center text-[#A7B1CC] hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* Discord */}
              <a
                href={eventConfig.contact.discord}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0A1025] border border-[#00E5FF]/20 flex items-center justify-center text-[#A7B1CC] hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A7B1CC]/70">
          <div>
            © {new Date().getFullYear()} {eventConfig.name} {eventConfig.version} • {eventConfig.organizer.college}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-[#00E5FF] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
