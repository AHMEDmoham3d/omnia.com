import React, { useEffect } from 'react';
import { ArrowRight, BookOpen, Headphones, Sparkles, X, Zap } from 'lucide-react';

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

  const items = [
    {
      icon: <Zap className="w-5 h-5 text-purple-300" />,
      title: '2-Min Reset',
      desc: 'تنفّس + تهدئة جسمك بسرعة قبل ما تبدأ يومك.'
    },
    {
      icon: <Headphones className="w-5 h-5 text-pink-300" />,
      title: 'Guided Audio',
      desc: 'جلسات قصيرة تهدي الجهاز العصبي (قريبًا).'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-purple-300" />,
      title: 'Articles & Notes',
      desc: 'مقالات عملية عن المشاعر، التوتر، والوعي (قريبًا).'
    }
  ];

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
                  <p className="text-gray-300 mt-2 text-sm sm:text-[15px] leading-relaxed">
                    مساحة صغيرة فيها إرشاد + ممارسات + محتوى (فيديو/مقالات) — مناسبة لكل الأحجام، مع سكروول مريح.
                  </p>
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
                  <div className="text-sm uppercase tracking-wider text-purple-300 font-semibold">Weekly Theme</div>
                  <div className="mt-1 text-lg sm:text-xl font-semibold">Release • Reset • Reconnect</div>
                  <p className="text-gray-300 mt-1 text-sm leading-relaxed">
                    اختاري حاجة واحدة اليوم: <span className="text-purple-200 font-medium">دعّي التوتر يهدأ</span> ثم اكتبي جملة واحدة تساعدك.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                    <span className="text-sm font-medium text-purple-100">Today: 2 minutes</span>
                    <ArrowRight className="w-4 h-4 text-pink-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((it) => (
                <div key={it.title} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/15 to-pink-500/10 border border-purple-400/20 flex items-center justify-center">
                      {it.icon}
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-wider text-purple-300 font-semibold">Tool</div>
                      <div className="text-lg font-semibold">{it.title}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-3 text-sm leading-relaxed">{it.desc}</p>
                </div>
              ))}

              {/* Mini practice */}
              <div className="md:col-span-2 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 p-5 sm:p-6">
                <div className="text-sm uppercase tracking-wider text-purple-200 font-semibold">Mini Practice</div>
                <div className="mt-2 text-lg sm:text-xl font-semibold">2 minutes reset (no audio)</div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="text-purple-200 text-sm font-semibold">1) Breath</div>
                    <div className="text-gray-200/90 text-sm mt-2 leading-relaxed">Inhale 4 • Hold 2 • Exhale 6</div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="text-purple-200 text-sm font-semibold">2) Soften</div>
                    <div className="text-gray-200/90 text-sm mt-2 leading-relaxed">Jaw unclench • shoulders drop</div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="text-purple-200 text-sm font-semibold">3) Intention</div>
                    <div className="text-gray-200/90 text-sm mt-2 leading-relaxed">
                      Whisper: “I am safe with myself.”
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-gray-300 text-sm leading-relaxed">
                  كرّري 3 مرات، ثم لاحظِي حاجة واحدة تقدريها في اللحظة دي.
                </div>
              </div>

              {/* Guided audio + articles */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm uppercase tracking-wider text-purple-300 font-semibold">Guided Audio</div>
                    <div className="mt-1 text-lg font-semibold">Coming Soon</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/15 border border-purple-400/25 flex items-center justify-center">
                    <Headphones className="w-5 h-5 text-pink-200" />
                  </div>
                </div>

                <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                  فيديوهات/صوت قصير يساعد على إطلاق المشاعر، تهدئة الجهاز العصبي، وفتح مساحة للوعي.
                </p>

                <div className="mt-4 space-y-2">
                  {["Release Anxiety", "Emotional Clearing", "Grounding Session"].map((t) => (
                    <div
                      key={t}
                      className="flex items-center justify-between rounded-xl bg-black/20 border border-white/10 px-4 py-3"
                    >
                      <span className="text-sm text-gray-100">{t}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-400/20">
                        New
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                    <span className="text-sm font-medium text-purple-100">We’re preparing it</span>
                    <ArrowRight className="w-4 h-4 text-pink-300" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm uppercase tracking-wider text-purple-300 font-semibold">Articles</div>
                    <div className="mt-1 text-lg font-semibold">Coming Soon</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/15 border border-purple-400/25 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-200" />
                  </div>
                </div>

                <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                  مقالات قصيرة ولطيفة: كيف نلاحظ المشاعر؟ كيف نهدّي التوتر؟ وكيف نرجع لأنفسنا خطوة بخطوة.
                </p>

                <div className="mt-4 space-y-2">
                  {["The Nervous System", "Release & Re-center", "Self-trust Notes"].map((t) => (
                    <div
                      key={t}
                      className="flex items-center justify-between rounded-xl bg-black/20 border border-white/10 px-4 py-3"
                    >
                      <span className="text-sm text-gray-100">{t}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-pink-500/10 text-pink-200 border border-pink-400/20">
                        Soon
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                    <span className="text-sm font-medium text-purple-100">Read with care</span>
                    <ArrowRight className="w-4 h-4 text-pink-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
              <div className="text-gray-400 text-sm">
                Same style as the site • designed for mobile + desktop
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Got it! ✨
              </button>
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

