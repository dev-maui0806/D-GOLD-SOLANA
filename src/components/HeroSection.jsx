import { useState, useEffect } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

// Adjustable target date for countdown (day, month 1–12, year)
const TARGET_DATE_DAY = 9;
const TARGET_DATE_MONTH = 2; // February
const TARGET_DATE_YEAR = 2026;
const MONTH_NAMES = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const TARGET_DATE_LABEL = `${TARGET_DATE_DAY} ${MONTH_NAMES[TARGET_DATE_MONTH - 1]}, ${TARGET_DATE_YEAR}`;
const TARGET_LOCATION = 'SOLANA'; // placeholder: change to your location/event

const AnimatedDot = ({ duration, delay, left, scale }) => {
  return (
    <div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: `${left}%`,
        bottom: '0',
        background: 'rgb(255, 69, 0)',
        boxShadow: `rgb(255, 69, 0) 0px 0px 10px 0px, rgb(255, 215, 0) 0px 0px 20px 0px`,
        animation: `floatUp ${duration}s linear ${delay}s infinite`,
        opacity: 0,
        transform: `scale(${scale})`,
      }}
    />
  );
};

const TimeBlock = ({ value, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
        fontWeight: '700',
        color: 'rgb(255, 255, 255)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {String(value).padStart(2, '0')}
    </div>
    <div
      style={{
        fontSize: '12px',
        color: 'rgb(163, 158, 143)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginTop: '4px',
      }}
    >
      {label}
    </div>
  </div>
);

export default function HeroSection({ onOpenPresale }) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { ref, isInView } = useInViewAnimation();

  useEffect(() => {
    const targetDate = new Date(TARGET_DATE_YEAR, TARGET_DATE_MONTH - 1, TARGET_DATE_DAY, 0, 0, 0).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generated with varied durations and delays for natural movement
  const dotConfigs = [
    { duration: 3.94333, delay: 0.308317, left: 18.1834, scale: 0.820648 },
    { duration: 4.54387, delay: 1.77272, left: 27.8553, scale: 0.642229 },
    { duration: 3.89923, delay: 0.401448, left: 73.3156, scale: 0.653805 },
    { duration: 4.45431, delay: 0.746478, left: 8.13497, scale: 0.995929 },
    { duration: 4.57225, delay: 1.52407, left: 60.8167, scale: 0.685465 },
    { duration: 4.00319, delay: 0.657713, left: 63.9094, scale: 0.549032 },
    { duration: 4.03849, delay: 1.74742, left: 59.2673, scale: 0.852127 },
    { duration: 4.42678, delay: 0.275117, left: 1.43958, scale: 0.78291 },
    { duration: 2.01255, delay: 0.899716, left: 98.6888, scale: 0.520422 },
    { duration: 2.9829, delay: 1.1137, left: 61.8638, scale: 0.921881 },
    { duration: 4.28617, delay: 1.54534, left: 58.9423, scale: 0.579737 },
    { duration: 4.07039, delay: 0.325015, left: 9.65897, scale: 0.899961 },
    { duration: 4.39692, delay: 1.24192, left: 1.28301, scale: 0.678931 },
    { duration: 4.09557, delay: 1.78442, left: 23.5236, scale: 0.70133 },
    { duration: 3.53753, delay: 0.357491, left: 99.1162, scale: 0.739594 },
    { duration: 3.96556, delay: 0.187428, left: 63.8531, scale: 0.580848 },
    { duration: 3.1286, delay: 0.987036, left: 32.604, scale: 0.903617 },
    { duration: 3.60157, delay: 0.476955, left: 69.1914, scale: 0.904456 },
    { duration: 4.78109, delay: 1.09169, left: 22.2809, scale: 0.659648 },
    { duration: 2.95336, delay: 1.07875, left: 21.1675, scale: 0.833793 },
  ];

  const dots = dotConfigs.map((config, i) => ({ id: i, ...config }));

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-animated {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
      <section
        ref={ref}
        className={`relative flex items-center justify-center overflow-hidden pt-20 md:pt-0 ${isInView ? 'hero-animated' : ''}`}
        style={{ minHeight: '100vh', backgroundColor: 'rgb(13, 13, 13)' }}
      >
        {/* Background layer */}
        <div className="absolute inset-0 bg-black z-0"></div>

        {/* Animated dots background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[10]">
          <div className="relative w-full h-full">
            {dots.map((dot) => (
              <AnimatedDot key={dot.id} duration={dot.duration} delay={dot.delay} left={dot.left} scale={dot.scale} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center flex flex-col items-center w-full py-16 md:py-0">
          {/* Countdown section (from inspo – at top) */}
          <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '-24px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(16px, 4vw, 32px)',
                flexWrap: 'wrap',
              }}
            >
              <TimeBlock value={timeLeft.days} label="Days" />
              <span style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', color: 'rgb(163, 158, 143)' }}>:</span>
              <TimeBlock value={timeLeft.hours} label="Hours" />
              <span style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', color: 'rgb(163, 158, 143)' }}>:</span>
              <TimeBlock value={timeLeft.minutes} label="Minutes" />
              <span style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', color: 'rgb(163, 158, 143)' }}>:</span>
              <TimeBlock value={timeLeft.seconds} label="Seconds" />
            </div>
            <p
              style={{
                color: 'rgb(163, 158, 143)',
                marginTop: '16px',
                fontSize: '14px',
              }}
            >
              Until Launch Date — <span style={{ color: 'rgb(255, 191, 0)', fontWeight: '600' }}>Private Presale Live</span>
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <span
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  color: 'rgb(163, 158, 143)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {TARGET_DATE_LABEL} | {TARGET_LOCATION}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="font-black text-transparent bg-clip-text mb-2 sm:mb-4"
            style={{
              fontSize: 'clamp(1.8rem, 7.2vw, 7.2rem)',
              backgroundImage: 'linear-gradient(to right in oklab, rgb(255, 215, 0) 0%, rgb(255, 140, 0) 50%, rgb(255, 215, 0) 100%)',
              fontFamily: 'Cinzel, serif',
              letterSpacing: 'clamp(-2.4px, -0.3vw, -4.8px)',
              filter: 'drop-shadow(rgba(0, 0, 0, 0.15) 0px 1px 2px)',
              lineHeight: '1.2',
            }}
          >
            D-GOLD
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-2xl font-light text-gray-400 mb-6 sm:mb-8" style={{ color: 'rgb(163, 158, 143)', fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}>
            Digital Gold on Solana — Solana Memecoin
          </p>

          {/* Quote */}
          <p
            className="text-base sm:text-lg font-bold italic uppercase mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-yellow-500/30"
            style={{
              color: 'rgb(255, 191, 0)',
              letterSpacing: 'clamp(0.5px, 1.5vw, 1.8px)',
              fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
            }}
          >
            " Born in fire. Forged in gold. Pumped on Solana. "
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-2 sm:px-0">
            <button
              type="button"
              onClick={() => typeof onOpenPresale === 'function' && onOpenPresale()}
              className="w-full sm:w-[300px] px-4 sm:px-6 py-3 sm:py-4 font-bold text-white rounded transition-all duration-150 whitespace-nowrap text-sm sm:text-base"
              style={{
                backgroundImage: 'linear-gradient(to right, rgb(255, 191, 0) 0%, oklch(0.666 0.179 58.318) 100%)',
                boxShadow: isButtonHovered
                  ? 'rgba(255, 215, 0, 0.6) 0px 0px 30px 0px, rgba(255, 215, 0, 0.4) 0px 0px 20px 0px'
                  : 'rgba(255, 215, 0, 0.4) 0px 0px 20px 0px',
                filter: isButtonHovered ? 'brightness(1.15)' : 'brightness(1)',
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              Participate in Presale
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:block" style={{ color: 'oklab(0.999994 0.0000455678 0.0000200868 / 0.3)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </section>
    </>
  );
}
