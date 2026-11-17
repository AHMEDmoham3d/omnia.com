
import React, { useEffect } from 'react';

interface NewYearBookingModalProps {
  open: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '201009058159';

const WHATSAPP_MESSAGE =
  'مرحباً، أريد حجز New Year Reading 2027. من فضلكم أرسلوا لي التفاصيل والمواعيد المتاحة.';

const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const NewYearBookingModal: React.FC<NewYearBookingModalProps> = ({
  open,
  onClose
}) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(15, 8, 25, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <div
        dir="rtl"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          padding: '45px 28px 35px',
          textAlign: 'center',
          borderRadius: '24px',
          border: '1px solid rgba(222, 157, 224, 0.5)',
          background: 'linear-gradient(145deg, #211629, #30203d, #422744)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.65)',
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          animation: 'newYearPopupAppear 0.4s ease-out'
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.08)',
            color: '#ffffff',
            fontSize: '23px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>

        <div
          style={{
            fontSize: '52px',
            marginBottom: '15px'
          }}
        >
          ✨
        </div>

        <p
          style={{
            color: '#e8a8df',
            fontSize: '13px',
            letterSpacing: '3px',
            marginBottom: '15px'
          }}
        >
          NEW YEAR SPECIAL
        </p>

        <h2
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
            lineHeight: 1.5,
            color: '#f2c5ed',
            margin: '0 0 18px'
          }}
        >
          🎉🎅🏻New Year Reading 2027🎉
        </h2>

        <p
          style={{
            color: '#eee2f0',
            fontSize: '15px',
            lineHeight: 2,
            margin: '0 auto 28px',
            maxWidth: '340px'
          }}
        >
          .

          متاح الان قراءات السنة الجديدة 2027

          استقبل السنة الجديدة برؤية أوضح لطاقتك، واكتشف أهم الفرص والتحديات والتغييرات المحتملة خلال عام 2027 🪄

          القراءة شاملة ومفصلة لطاقتك ومختلف جوانب حياتك من 💼 العمل والمال❤️ الحب والعلاقات🌿 الصحة ✈️ السفر ✨ الفرص⚡ التحديات والتحذيرات🔮 والنصائح الخاصه بك

          ✨ ابدأ 2027 بوعى ورؤية أعمق لنفسك وللطاقات المحيطة بك
          .
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            maxWidth: '300px',
            margin: '0 auto',
            padding: '16px 20px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #edb2e5, #b78bdc, #9674c9)',
            color: '#24152e',
            fontSize: '16px',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 8px 25px rgba(190, 130, 210, 0.3)',
            boxSizing: 'border-box'
          }}
        >
          <span style={{ fontSize: '21px' }}>☘</span>
         Book now
        </a>

        <button
          type="button"
          onClick={onClose}
          style={{
            display: 'block',
            margin: '22px auto 0',
            border: 'none',
            background: 'transparent',
            color: '#c9b6d1',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
         Later
        </button>
      </div>

      <style>
        {`
          @keyframes newYearPopupAppear {
            from {
              opacity: 0;
              transform: translateY(25px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NewYearBookingModal;
