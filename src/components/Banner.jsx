export default function Banner() {
  const message = "LAUNCHING ON PUMP.FUN • FAIR LAUNCH • PRESALE • SOLANA • ";

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        backgroundColor: 'rgb(255, 191, 0)',
        borderTop: '1px solid oklch(0.666 0.179 58.318)',
        borderBottom: '1px solid oklch(0.666 0.179 58.318)',
        color: 'rgb(0, 0, 0)',
        position: 'relative',
        zIndex: '20',
        paddingTop: '12px',
        paddingBottom: '12px',
      }}
    >
      <div
        className="flex items-center gap-8 whitespace-nowrap"
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '18px',
          fontWeight: '700',
          letterSpacing: '1.8px',
          lineHeight: '28px',
          textTransform: 'uppercase',
          animation: 'scrollLeft 30s linear infinite',
        }}
      >
        {/* Create multiple copies for seamless looping */}
        {[...Array(4)].map((_, idx) => (
          <span key={idx} className="flex items-center gap-8">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                color: 'oklch(0.577 0.245 27.325)',
                flexShrink: 0,
              }}
            >
              <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"></path>
            </svg>
            {message}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </div>
  );
}
