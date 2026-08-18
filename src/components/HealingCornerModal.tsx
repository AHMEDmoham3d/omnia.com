import React, { useEffect } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';

type HealingCornerModalProps = {
  open: boolean;
  onClose: () => void;
};

const HealingCornerModal = ({ open, onClose }: HealingCornerModalProps) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Healing Corner"
      onMouseDown={(e) => {
        // close when clicking overlay (not the modal content)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-[92vw] max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden">
          {/* Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-r from-purple-500/25 to-pink-500/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-r from-pink-500/15 to-purple-500/20 blur-2xl" />

          <div className="p-4 sm:p-6 max-h-[88vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-purple-300 animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping" />
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Healing Corner
                  </h2>
                  {/* <p className="text-gray-300 mt-2 text-sm sm:text-[15px] leading-relaxed">
                    مساحة صغيرة فيها إرشاد + ممارسات + محتوى (فيديو/مقالات) — مناسبة لكل الأحجام، مع سكروول مريح.
                  </p> */}
                </div>
              </div>

              <button
                onClick={onClose}
                className="shrink-0 rounded-full p-2.5 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick intro strip */}
            <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  {/* <div className="text-sm uppercase tracking-wider text-purple-300 font-semibold">Tack your ,asseg</div> */}
                  <div className="mt-1 text-lg sm:text-xl font-semibold">Pick a card 🔮</div>
                  <a
                    href="https://cart-one-navy.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 px-6 py-2.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4" />
                    Lets start
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex gap-2">
                  {/* <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                    <span className="text-sm font-medium text-purple-100">Today: 2 minutes</span>
                    <ArrowRight className="w-4 h-4 text-pink-300" />
                  </div> */}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
              {/* <div className="text-gray-400 text-sm">
                Same style as the site • designed for mobile + desktop
              </div> */}
              {/* <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Got it! ✨
              </button> */}
            </div>
          </div>
        </div>

        {/* local animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        `}</style>
      </div>

      {/* Use animation on mount */}
      <style>{`
        .fixed.inset-0 { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default HealingCornerModal;

