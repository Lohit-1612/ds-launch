import type { FC } from 'react';
import { X, ExternalLink, AlertCircle, CheckCircle, Bell, ArrowRight } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';
import { soundManager } from '../utils/audio';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const hasConfiguredUrl = !!eventConfig.registration.url && eventConfig.registration.url.trim() !== '';
  const isRegistrationOpen = eventConfig.registration.isOpen;

  const handleProceed = () => {
    soundManager.playClick();
    if (hasConfiguredUrl && isRegistrationOpen) {
      window.open(eventConfig.registration.url, '_blank', 'noopener,noreferrer');
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050817]/90 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full rounded-3xl bg-[#0A1025] border-2 border-[#00E5FF]/40 p-8 sm:p-10 shadow-[0_0_60px_rgba(0,229,255,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#050817] border border-[#00E5FF]/20 text-[#A7B1CC] hover:text-white hover:border-[#00E5FF] transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {hasConfiguredUrl && isRegistrationOpen ? (
          <div>
            {/* Ready State */}
            <div className="w-14 h-14 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center mb-6 text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              <ExternalLink className="w-7 h-7" />
            </div>

            <span className="font-mono text-xs text-[#00E5FF] font-semibold tracking-wider uppercase">
              OFFICIAL REGISTRATION PORTAL
            </span>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1 mb-3">
              Redirecting to Application
            </h3>

            <p className="text-sm text-[#A7B1CC] leading-relaxed mb-6">
              You are about to be redirected to our verified application portal ({eventConfig.registration.platform}) to complete your team submission for DATASCAPE 2.0.
            </p>

            <div className="space-y-2 mb-8 p-4 rounded-xl bg-[#050817] border border-[#00E5FF]/15 text-xs text-[#E0E8FF] font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00E5FF]" />
                <span>Eligibility: Undergraduate & Postgraduate students</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00E5FF]" />
                <span>Team Size: {eventConfig.team.minMembers} - {eventConfig.team.maxMembers} Members</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Registration Fee: {eventConfig.registration.fee}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleProceed}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#287BFF] to-[#00E5FF] text-[#050817] font-heading font-bold text-sm tracking-wider shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>PROCEED TO APPLICATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#050817] border border-white/10 text-xs font-mono text-[#A7B1CC] hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Coming Soon State */}
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mb-6 text-amber-400">
              <AlertCircle className="w-7 h-7" />
            </div>

            <span className="font-mono text-xs text-amber-400 font-semibold tracking-wider uppercase">
              STATUS: APPLICATIONS COMING SOON
            </span>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1 mb-3">
              Portal Opening Soon
            </h3>

            <p className="text-sm text-[#A7B1CC] leading-relaxed mb-6">
              Official candidate registrations for DATASCAPE 2.0 will go live shortly. Check back soon or join our community to get instant notifications when submissions unlock.
            </p>

            <div className="p-4 rounded-xl bg-[#050817] border border-white/10 mb-6 text-xs font-mono text-[#A7B1CC] space-y-1">
              <div>Target Opening: March 01, 2026</div>
              <div>Organizer: {eventConfig.organizer.college}</div>
              <div>Contact: {eventConfig.contact.email}</div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                window.location.href = `mailto:${eventConfig.contact.email}?subject=Notify%20me%20for%20DATASCAPE%202.0`;
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] font-heading font-bold text-xs tracking-wider hover:bg-[#00E5FF]/25 transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span>REQUEST EMAIL NOTIFICATION</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
