import { useInViewAnimation } from '../hooks/useInViewAnimation';

export default function LegendSection() {
  const { ref, isInView } = useInViewAnimation();

  const features = [
    {
      id: 1,
      title: 'Fire Horse Energy: Unstoppable momentum',
      icon: 'M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4',
    },
    {
      id: 2,
      title: 'Golden Fortune: Prosperity for the bold',
      icon: 'M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4',
    },
    {
      id: 3,
      title: 'Solana Speed: Chaos at light speed',
      icon: 'M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4',
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .legend-animated {
          animation: fadeInRight 0.8s ease-out forwards;
        }
      `}</style>
      <section
        ref={ref}
        className={`w-full ${isInView ? 'legend-animated' : ''}`}
        style={{
          backgroundColor: 'rgb(0, 0, 0)',
          paddingTop: 'clamp(64px, 10vw, 128px)',
          paddingBottom: 'clamp(64px, 10vw, 128px)',
          position: 'relative',
        }}
      >
        <div className="max-w-[1536px] mx-auto px-4 relative z-10 w-full">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(32px, 8vw, 48px)',
              alignItems: 'start',
            }}
            className="responsive-grid"
          >
            {/* Left Column: Content */}
            <div>
              <h2
                style={{
                  color: 'rgb(255, 255, 255)',
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(28px, 6vw, 60px)',
                  fontWeight: '700',
                  lineHeight: 'clamp(32px, 7vw, 60px)',
                  marginBottom: '24px',
                }}
              >
                Digital Gold on Solana
                <br />
                <span style={{ color: 'rgb(255, 191, 0)' }}>D-GOLD</span>
              </h2>

              <p
                style={{
                  color: 'rgb(163, 158, 143)',
                  fontSize: 'clamp(14px, 4vw, 18px)',
                  lineHeight: '1.62',
                  marginBottom: '24px',
                }}
              >
                2026 is the year of the Fire Horse (D-GOLD). In Chinese element theory, this occurs only
                once every 60 years. The Fire Horse is independent, wild, and burns brighter than any other
                sign in the zodiac.
              </p>

              <p
                style={{
                  color: 'rgb(163, 158, 143)',
                  fontSize: 'clamp(14px, 4vw, 18px)',
                  lineHeight: '1.62',
                  marginBottom: '24px',
                }}
              >
                We're bringing this chaotic, prosperous energy to the Solana blockchain. No utility, just
                pure memetic power forged in the fires of degen culture.
              </p>

              {/* Feature Boxes */}
              <div
                style={{
                  display: 'grid',
                  gap: '16px',
                  marginTop: 'clamp(24px, 6vw, 32px)',
                }}
              >
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: 'clamp(12px, 3vw, 16px)',
                      backgroundColor: 'oklab(0.999994 0.0000455678 0.0000200868 / 0.05)',
                      borderLeft: '2px solid rgb(255, 191, 0)',
                      borderRadius: '4px',
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        color: 'rgb(255, 191, 0)',
                        flexShrink: 0,
                      }}
                    >
                      <path d={feature.icon}></path>
                    </svg>
                    <span
                      style={{
                        fontFamily: '"Space Mono", monospace',
                        color: 'rgb(255, 255, 255)',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                      }}
                    >
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Card */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  aspectRatio: '1 / 1',
                  backgroundImage:
                    'linear-gradient(to right bottom, oklab(0.407846 0.0920354 0.0597759 / 0.4) 0%, rgb(0, 0, 0) 100%)',
                  border: '1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  padding: '4px',
                  position: 'relative',
                }}
              >
                {/* Background texture */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
                    opacity: 0.1,
                    pointerEvents: 'none',
                  }}
                />

                {/* Card Content */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    padding: 'clamp(16px, 6vw, 32px)',
                    textAlign: 'center',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.05)',
                    borderRadius: '6px',
                    position: 'relative',
                    zIndex: 10,
                  }}
                >
                  {/* Background large text */}
                  <h3
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'oklab(0.999994 0.0000455678 0.0000200868 / 0.05)',
                      fontFamily: 'Cinzel, serif',
                      fontSize: 'clamp(64px, 20vw, 128px)',
                      lineHeight: 'clamp(64px, 20vw, 128px)',
                      fontWeight: '700',
                      userSelect: 'none',
                      margin: 0,
                    }}
                  >
                    丙午
                  </h3>

                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <p
                      style={{
                        color: 'rgb(255, 191, 0)',
                        fontFamily: 'Cinzel, serif',
                        fontSize: 'clamp(16px, 5vw, 24px)',
                        lineHeight: 'clamp(24px, 6vw, 32px)',
                        marginBottom: '8px',
                        margin: '0 0 8px 0',
                      }}
                    >
                      Digital Gold on Solana
                    </p>
                    <p
                      style={{
                        color: 'rgb(255, 255, 255)',
                        fontSize: 'clamp(36px, 10vw, 60px)',
                        fontWeight: '700',
                        lineHeight: 'clamp(36px, 10vw, 60px)',
                        marginBottom: '16px',
                        margin: '0 0 16px 0',
                      }}
                    >
                      2026
                    </p>
                    <p
                      style={{
                        color: 'rgb(163, 158, 143)',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: 'clamp(10px, 2.5vw, 14px)',
                        letterSpacing: '1.4px',
                        lineHeight: 'clamp(16px, 3vw, 20px)',
                        textTransform: 'uppercase',
                        margin: 0,
                      }}
                    >
                      Coming to Consume Liquidity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
