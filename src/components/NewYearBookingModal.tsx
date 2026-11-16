
import React, { useEffect } from 'react';
import {
  CalendarDays,
  Sparkles,
  X,
  MessageCircle
} from 'lucide-react';

type NewYearBookingModalProps = {
  open: boolean;
  onClose: () => void;
};

const WHATSAPP_NUMBER = '201009058159';

const WHATSAPP_MESSAGE =
  'مرحباً، أريد حجز سيشن رأس السنة. من فضلكم أرسلوا لي التفاصيل والمواعيد المتاحة.';

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const NewYearBookingModal = ({
  open,
  onClose
}: NewYearBookingModalProps) => {

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-year-booking-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-gray-950 via-gray-900 to-amber-950/80 p-7 text-center text-white shadow-2xl shadow-amber-950/40 sm:p-10">

        {/* Background Effects */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:bg-white/15 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10">

          <CalendarDays className="h-8 w-8 text-amber-300" />

          <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-amber-200" />

        </div>

        {/* Subtitle */}
        <p className="relative mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          مناسبة مميزة
        </p>

        {/* Title */}
        <h2
          id="new-year-booking-title"
          className="relative text-3xl font-bold leading-tight text-white sm:text-4xl"
        >
          احجز سيشن رأس السنة
        </h2>

        {/* Description */}
        <p className="relative mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-300 sm:text-base">
          استقبل السنة الجديدة بتجربة مميزة. تواصل معنا عبر واتساب لمعرفة التفاصيل والمواعيد المتاحة للحجز.
        </p>

        {/* WhatsApp Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 px-7 py-4 font-semibold text-gray-950 shadow-lg shadow-amber-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-amber-300 hover:to-yellow-500 sm:w-auto"
        >
          <MessageCircle className="h-5 w-5" />

          احجز عبر واتساب
        </a>

        {/* Maybe Later */}
        <button
          type="button"
          onClick={onClose}
          className="relative mt-4 block w-full text-sm text-gray-400 transition hover:text-white"
        >
          لاحقاً
        </button>

      </div>
    </div>
  );
};

export default NewYearBookingModal;
