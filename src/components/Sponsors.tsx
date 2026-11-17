import type { FC } from 'react';
import { ExternalLink, Mail, Download } from 'lucide-react';
import { sponsorTiers } from '../data/sponsors';
import type { SponsorItem } from '../data/sponsors';
import { eventConfig } from '../config/eventConfig';
import { soundManager } from '../utils/audio';

interface SponsorCardProps {
  sponsor: SponsorItem;
  size?: 'large' | 'medium' | 'small';
}

export const SponsorCard: FC<SponsorCardProps> = ({ sponsor, size = 'medium' }) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <div
      onMouseEnter={() => soundManager.playTick()}
      className={`group relative rounded-2xl bg-[#0A1025]/80 border border-[#00E5FF]/20 hover:border-[#00E5FF]/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_35px_rgba(0,229,255,0.2)] flex flex-col justify-between overflow-hidden ${
        isLarge ? 'p-8 sm:p-10' : isSmall ? 'p-5' : 'p-6'
      }`}
    >
      {/* Background glow accent */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: sponsor.accent }}
      />

      <div>
        {/* Monogram / Logo Container */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`rounded-xl bg-[#050817] border border-[#00E5FF]/30 flex items-center justify-center font-heading font-black tracking-widest text-[#00E5FF] shadow-inner group-hover:scale-105 group-hover:border-[#00E5FF] transition-all duration-300 ${
              isLarge ? 'w-20 h-20 text-2xl' : isSmall ? 'w-12 h-12 text-sm' : 'w-16 h-16 text-lg'
            }`}
          >
            {sponsor.logoPlaceholder}
          </div>

          <span className="font-mono text-[10px] sm:text-xs text-[#A7B1CC] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
            {sponsor.category}
          </span>
        </div>

        {/* Sponsor Name */}
        <h4
          className={`font-heading font-black text-white group-hover:text-[#00E5FF] transition-colors ${
            isLarge ? 'text-2xl sm:text-3xl mb-2' : isSmall ? 'text-base mb-1' : 'text-lg sm:text-xl mb-1.5'
          }`}
        >
          {sponsor.name}
        </h4>

        {/* Tagline */}
        <p className={`text-[#A7B1CC] ${isSmall ? 'text-xs' : 'text-xs sm:text-sm'}`}>
          {sponsor.tagline}
        </p>
      </div>

      {/* Role Pill */}
      <div className="mt-6 pt-4 border-t border-[#00E5FF]/10 flex items-center justify-between">
        <span className="font-mono text-[11px] text-[#00E5FF] font-semibold tracking-wider">
          {sponsor.role}
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-[#A7B1CC] group-hover:text-white transition-colors" />
      </div>
    </div>
  );
};

export const Sponsors: FC = () => {
  return (
    <section id="sponsors" className="relative py-28 overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#287BFF]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1025] border border-[#00E5FF]/30 mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest font-semibold">
              [06] SPONSORS & PARTNERS
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white max-w-4xl leading-[1.05]">
            Powered By{' '}
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#287BFF] to-[#8755FF] bg-clip-text text-transparent">
              Innovation.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-xl text-[#A7B1CC] max-w-2xl">
            Supported by leading tech enterprises, cloud infrastructure providers, and engineering communities empowering the next wave of builders.
          </p>
        </div>

        {/* Sponsor Tiers Showcase */}
        <div className="space-y-16 mb-20">
          {sponsorTiers.map((tier) => (
            <div key={tier.id}>
              {/* Tier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-[#00E5FF]/15">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    {tier.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#A7B1CC]">
                  {tier.description}
                </span>
              </div>

              {/* Grid of Sponsors */}
              <div
                className={`grid gap-6 ${
                  tier.id === 'title'
                    ? 'grid-cols-1 max-w-xl mx-auto'
                    : tier.id === 'gold'
                    ? 'grid-cols-1 md:grid-cols-2'
                    : tier.id === 'silver'
                    ? 'grid-cols-1 md:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}
              >
                {tier.sponsors.map((sp, idx) => (
                  <SponsorCard
                    key={idx}
                    sponsor={sp}
                    size={tier.id === 'title' ? 'large' : tier.id === 'gold' ? 'medium' : 'small'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Become a Sponsor Callout Banner */}
        <div className="rounded-3xl bg-[#0A1025]/90 border border-[#00E5FF]/30 backdrop-blur-xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#287BFF]/10 via-[#00E5FF]/10 to-[#8755FF]/10 pointer-events-none" />

          <h3 className="relative font-heading font-black text-2xl sm:text-4xl text-white mb-3">
            Interested in Sponsoring DATASCAPE 2.0?
          </h3>

          <p className="relative text-sm sm:text-base text-[#A7B1CC] max-w-xl mx-auto mb-8">
            Connect your brand directly with 500+ elite student engineers, recruit top technical talent, and showcase your developer tooling.
          </p>

          <div className="relative flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${eventConfig.contact.email}?subject=DATASCAPE%202.0%20Sponsorship%20Inquiry`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#287BFF] to-[#00E5FF] text-[#050817] font-heading font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>CONTACT PARTNERSHIPS</span>
            </a>

            <a
              href={`mailto:${eventConfig.contact.email}?subject=Request%20Sponsorship%20Deck`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#050817] border border-[#00E5FF]/30 text-white font-mono text-xs hover:border-[#00E5FF] transition-all duration-300"
            >
              <Download className="w-4 h-4 text-[#00E5FF]" />
              <span>Request Sponsor Kit</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
