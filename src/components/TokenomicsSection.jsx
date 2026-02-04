import { useInViewAnimation } from '../hooks/useInViewAnimation';

const TIERS = [
  {
    id: 'diamond',
    tierLabel: 'Tier 1',
    name: 'Diamond',
    price: '50 SOL',
    popular: true,
    icon: 'crown',
    benefits: [
      'Maximum allocation priority',
      '50% bonus tokens',
      'Exclusive Diamond NFT Badge',
      'Private Discord access',
      'Direct team communication',
      'Early feature access',
    ],
    buttonStyle: 'filled',
    buttonText: 'Select Diamond',
  },
  {
    id: 'gold',
    tierLabel: 'Tier 2',
    name: 'Gold',
    price: '25 SOL',
    popular: false,
    icon: 'star',
    benefits: [
      'High allocation priority',
      '30% bonus tokens',
      'Gold NFT Badge',
      'Priority Discord role',
      'Weekly market updates',
    ],
    buttonStyle: 'outline',
    buttonText: 'Select Gold',
  },
  {
    id: 'silver',
    tierLabel: 'Tier 3',
    name: 'Silver',
    price: '10 SOL',
    popular: false,
    icon: 'diamond',
    benefits: [
      'Standard allocation',
      '15% bonus tokens',
      'Silver NFT Badge',
      'Community Discord access',
    ],
    buttonStyle: 'outline',
    buttonText: 'Select Silver',
  },
];

function TierIcon({ icon, className }) {
  const baseClass = 'w-8 h-8';
  if (icon === 'crown') {
    return (
      <svg className={`${baseClass} ${className || ''}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 2H5v2h14v-2z" />
      </svg>
    );
  }
  if (icon === 'star') {
    return (
      <svg className={`${baseClass} ${className || ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  if (icon === 'diamond') {
    return (
      <svg className={`${baseClass} ${className || ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2 2 9l10 13 10-13L12 2z" />
        <path d="M2 9h20M12 2v20" />
      </svg>
    );
  }
  return null;
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LightningIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4 14h6l-2 8 10-12h-6l2-8z" />
    </svg>
  );
}

export default function TokenomicsSection({ onOpenPresale }) {
  const { ref, isInView } = useInViewAnimation();

  return (
    <section
      ref={ref}
      id="presale"
      className="bg-black/95 border-t border-yellow-500/10 py-12 sm:py-16 md:py-20"
    >
      <style>{`
        @keyframes presaleTierRevealOne {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .presale-tier-reveal-one {
          animation: presaleTierRevealOne 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Section header: always visible when section is in view */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <div
              className="mx-auto mb-6 flex h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] items-center justify-center rounded-full text-amber-400"
            style={{
              backgroundColor: 'rgba(28, 28, 28, 0.95)',
              boxShadow: '0 0 0 1px rgba(255, 191, 0, 0.2), 0 0 32px rgba(255, 215, 0, 0.25)',
            }}
          >
            <LightningIcon className="w-8 h-8 sm:w-9 sm:h-9 text-amber-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ lineHeight: '1.2' }}>
            <span style={{ letterSpacing: '1.2px', color: 'rgb(255, 191, 0)', textShadow: '0 0 20px rgba(255, 215, 0, 0.2)', fontFamily: 'Cinzel, serif' }}>PRESALE</span>
            <span className="text-white" style={{ letterSpacing: '1.2px', fontFamily: 'Cinzel, serif' }}> TIERS</span>
          </h2>
          <p
            className="mx-auto max-w-xl text-base sm:text-lg font-normal leading-relaxed"
            style={{ color: 'rgb(176, 176, 176)' }}
          >
            Choose your investment tier and unlock exclusive benefits. Higher tiers receive priority allocation and bonus tokens.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-3">
          {TIERS.map((tier, index) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-300 hover:border-amber-500/40 ${isInView ? 'presale-tier-reveal-one' : ''}`}
              style={{
                backgroundColor: 'rgba(18, 18, 18, 0.95)',
                border: tier.popular ? '2px solid rgba(255, 191, 0, 0.5)' : '1px solid rgba(255, 191, 0, 0.2)',
                boxShadow: tier.popular ? '0 0 30px rgba(255, 215, 0, 0.15)' : 'none',
                ...(!isInView ? { opacity: 0 } : { animationDelay: `${index * 0.45}s` }),
              }}
            >
              {tier.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white"
                  style={{
                    background: 'linear-gradient(90deg, rgb(255, 191, 0), rgb(218, 165, 32))',
                    boxShadow: '0 2px 8px rgba(255, 191, 0, 0.4)',
                  }}
                >
                  Most Popular
                </div>
              )}
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-amber-400"
                style={{ border: '2px solid rgba(255, 191, 0, 0.6)' }}
              >
                <TierIcon icon={tier.icon} className="text-amber-400" />
              </div>
              <p className="text-center text-sm text-zinc-400 uppercase tracking-wider mb-0.5">
                {tier.tierLabel}
              </p>
              <h3 className="text-center text-2xl sm:text-3xl font-bold text-amber-400 mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                {tier.name}
              </h3>
              <p className="text-center text-xl sm:text-2xl font-bold text-white mb-6">
                {tier.price}
              </p>
              <ul className="space-y-3 flex-1 mb-6">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckIcon />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={onOpenPresale}
                className="w-full rounded-xl py-3.5 font-bold text-sm uppercase tracking-wide transition-all duration-200"
                style={
                  tier.buttonStyle === 'filled'
                    ? {
                        background: 'linear-gradient(180deg, rgb(255, 215, 0) 0%, rgb(255, 191, 0) 100%)',
                        color: 'rgb(0, 0, 0)',
                        border: 'none',
                        boxShadow: '0 0 20px rgba(255, 215, 0, 0.35)',
                      }
                    : {
                        backgroundColor: 'rgba(30, 30, 30, 0.9)',
                        color: 'rgb(255, 255, 255)',
                        border: '2px solid rgba(255, 191, 0, 0.6)',
                      }
                }
                onMouseEnter={(e) => {
                  if (tier.buttonStyle === 'filled') {
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.style.boxShadow = '0 0 28px rgba(255, 215, 0, 0.45)';
                  } else {
                    e.currentTarget.style.borderColor = 'rgba(255, 191, 0, 0.9)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 191, 0, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (tier.buttonStyle === 'filled') {
                    e.currentTarget.style.filter = 'brightness(1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.35)';
                  } else {
                    e.currentTarget.style.borderColor = 'rgba(255, 191, 0, 0.6)';
                    e.currentTarget.style.backgroundColor = 'rgba(30, 30, 30, 0.9)';
                  }
                }}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
