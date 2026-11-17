import { useState } from 'react';
import type { FC } from 'react';
import { Plus, Minus, MessageSquare } from 'lucide-react';
import { faqsData } from '../data/faqs';
import { eventConfig } from '../config/eventConfig';
import { soundManager } from '../utils/audio';

export const FAQ: FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);

  const toggleFAQ = (id: string) => {
    soundManager.playClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-28 overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00E5FF]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1025] border border-[#00E5FF]/30 mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest font-semibold">
              [07] FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-6xl tracking-tight text-white max-w-4xl leading-[1.05]">
            Questions?{' '}
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#287BFF] to-[#8755FF] bg-clip-text text-transparent">
              We've Got Answers.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#A7B1CC] max-w-2xl">
            Everything you need to know about eligibility, team composition, logistics, and evaluation at DATASCAPE 2.0.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-xl ${
                  isOpen
                    ? 'bg-[#0A1025]/95 border-[#00E5FF]/50 shadow-[0_0_30px_rgba(0,229,255,0.15)]'
                    : 'bg-[#0A1025]/60 border-[#00E5FF]/15 hover:border-[#00E5FF]/35'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-mono text-xs text-[#00E5FF]/70 font-semibold shrink-0">
                      {(index + 1).toString().padStart(2, '0')}.
                    </span>
                    <span className="font-heading font-bold text-base sm:text-lg text-white">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#00E5FF] text-[#050817] rotate-180'
                        : 'bg-[#050817] text-[#00E5FF] border border-[#00E5FF]/30'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[#A7B1CC] leading-relaxed border-t border-[#00E5FF]/10 animate-in fade-in duration-200">
                    <p className="mt-2">{faq.answer}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#00E5FF]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                      <span>Category: {faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0A1025]/50 border border-[#00E5FF]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-[#00E5FF]" />
            <span className="text-sm text-[#A7B1CC]">
              Still have queries not covered here? Reach out directly.
            </span>
          </div>

          <a
            href={`mailto:${eventConfig.contact.email}?subject=DATASCAPE%202.0%20Query`}
            className="px-5 py-2 rounded-xl bg-[#050817] border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF] hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors shrink-0"
          >
            {eventConfig.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
};
