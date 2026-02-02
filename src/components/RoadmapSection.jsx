import { useInViewAnimation } from '../hooks/useInViewAnimation';

export default function RoadmapSection() {
  const { ref, isInView } = useInViewAnimation();

  const phases = [
    {
      title: 'MONTH 1',
      items: ['Official DGOLD launch on Solana DEX', 'Liquidity added', 'Staking platform goes live',
        'Marketing partnerships already secured with major crypto influencers on X', 
        'Community expansion across Telegram and Discord'
      ],
    },
    {
      title: 'MONTHS 1–3',
      items: ['Governance features introduced', 'Strategic partnerships within the Solana ecosystem', 
        'Expanded staking and reward mechanisms', 'Continued marketing and exposure'],
    },
    {
      title: 'MONTHS 3–6',
      items: ['Ecosystem expansion including NFTs and integrations', 'Mass adoption campaigns', 'Exploration of cross-chain opportunities'],
    },
    {
      title: 'MONTHS 6-12',
      items:['Large-scale partnerships', 'Full ecosystem maturity', 'Long-term positioning as a leading Solana asset']
    }
  ];

  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .roadmap-animated {
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>
      <section
        ref={ref}
        className={`${isInView ? 'roadmap-animated' : ''}`}
        id="roadmap"
        style={{
          backgroundColor: 'rgb(10, 10, 10)',
          paddingBottom: '80px',
          paddingTop: '80px',
        }}
      >
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1536px',
            paddingLeft: '16px',
            paddingRight: '16px',
            width: '100%',
          }}
        >
          <h2
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(28px, 6vw, 48px)',
              fontWeight: '700',
              lineHeight: 'clamp(32px, 7vw, 56px)',
              marginBottom: 'clamp(32px, 8vw, 64px)',
              textAlign: 'center',
              color: 'white',
            }}
          >
            ROADMAP
          </h2>

          <div
            style={{
              display: 'grid',
              gap: 'clamp(24px, 6vw, 32px)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            }}
          >
            {phases.map((phase, index) => (
              <div
                key={index}
                style={{
                  borderColor: 'rgba(255, 191, 0, 0.3)',
                  borderLeft: '2px solid rgba(255, 191, 0, 0.3)',
                  paddingBottom: 'clamp(8px, 2vw, 16px)',
                  paddingLeft: 'clamp(16px, 4vw, 24px)',
                  paddingTop: 'clamp(8px, 2vw, 16px)',
                  position: 'relative',
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    backgroundColor: 'rgb(0, 0, 0)',
                    border: '2px solid rgb(255, 191, 0)',
                    borderRadius: '50%',
                    height: '16px',
                    left: '-9px',
                    position: 'absolute',
                    top: '0px',
                    width: '16px',
                  }}
                />

                {/* Phase title */}
                <h3
                  style={{
                    color: 'rgb(255, 191, 0)',
                    fontFamily: 'Cinzel, serif',
                    fontSize: 'clamp(18px, 4.5vw, 24px)',
                    fontWeight: '700',
                    lineHeight: 'clamp(24px, 5.5vw, 32px)',
                    marginBottom: 'clamp(12px, 3vw, 16px)',
                  }}
                >
                  {phase.title}
                </h3>

                {/* Items list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {phase.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      style={{
                        alignItems: 'center',
                        color: 'rgb(163, 158, 143)',
                        display: 'flex',
                        gap: 'clamp(6px, 1.5vw, 8px)',
                        marginBottom: 'clamp(8px, 2vw, 12px)',
                        fontSize: 'clamp(13px, 3vw, 14px)',
                        lineHeight: 'clamp(18px, 4vw, 20px)',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: 'rgba(255, 191, 0, 0.5)',
                          borderRadius: '50%',
                          height: '6px',
                          width: '6px',
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
