import { useInViewAnimation } from '../hooks/useInViewAnimation';

export default function HowToBuySection() {
  const { ref, isInView } = useInViewAnimation();

  const steps = [
    {
      number: '1',
      title: 'Get SOL',
      description: 'Buy SOL on an exchange like Coinbase or Binance.',
    },
    {
      number: '2',
      title: 'Send to Wallet',
      description: 'Send SOL to your Phantom or Solflare wallet.',
    },
    {
      number: '3',
      title: 'Go to Pump.fun',
      description: 'Connect your wallet to pump.fun.',
    },
    {
      number: '4',
      title: 'Swap for $BINGWU',
      description: 'Paste the CA and swap. Confirm transaction.',
    },
  ];

  const exchanges = [
    {
      name: 'Phantom',
      description: 'Buy / view token',
      icon: 'https://bingwucoin.xyz/assets/icon-phantom-D8zldKm0.png',
      url: 'https://phantom.com/tokens/solana/DMYNp65mub3i7LRpBdB66CgBAceLcQnv4gsWeCi6pump?referralId=i1nxjicbxuh',
    },
    {
      name: 'Jupiter',
      description: 'Swap aggregator',
      icon: 'https://bingwucoin.xyz/assets/icon-jupiter-Cv3XsoUe.png',
      url: 'https://jup.ag/tokens/DMYNp65mub3i7LRpBdB66CgBAceLcQnv4gsWeCi6pump',
    },
    {
      name: 'CoinGecko',
      description: 'Market data',
      icon: 'https://bingwucoin.xyz/assets/icon-coingecko-BKhvmAdH.png',
      url: 'https://www.coingecko.com/en/coins/bingwu',
    },
    {
      name: 'WEEX',
      description: 'Spot',
      icon: 'https://bingwucoin.xyz/assets/icon-weex-CaWuIurR.png',
      url: 'https://www.weex.com/spot/%E4%B8%99%E5%8D%88-USDT',
    },
    {
      name: 'MEXC',
      description: 'Spot',
      icon: 'https://bingwucoin.xyz/assets/icon-mexc-Blj6s9kV.png',
      url: 'https://www.mexc.com/exchange/%E4%B8%99%E5%8D%88_USDT',
    },
    {
      name: 'KCEX',
      description: 'Spot',
      icon: 'https://bingwucoin.xyz/assets/icon-kcex-B4RJRl8a.png',
      url: 'https://www.kcex.com/exchange/BINGWU_USDT',
    },
  ];

  return (
    <>
      <style>{`
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .howto-animated {
          animation: scaleUp 0.8s ease-out forwards;
        }
      `}</style>
      <section
        ref={ref}
        className={`${isInView ? 'howto-animated' : ''}`}
        style={{
          backgroundColor: 'rgb(0, 0, 0)',
          paddingBottom: 'clamp(64px, 10vw, 80px)',
          paddingTop: 'clamp(64px, 10vw, 80px)',
          position: 'relative',
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
              lineHeight: 'clamp(32px, 7vw, 48px)',
              marginBottom: 'clamp(48px, 10vw, 64px)',
              textAlign: 'center',
              color: 'rgb(255, 255, 255)',
            }}
          >
          HOW TO BUY
          </h2>

          {/* Steps Grid */}
          <div
            style={{
              display: 'grid',
              gap: 'clamp(16px, 4vw, 24px)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            }}
          >
            {steps.map((step) => (
              <div
                key={step.number}
                style={{
                  backgroundColor: 'oklab(0.999994 0.0000455678 0.0000200868 / 0.05)',
                  border: '1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  padding: 'clamp(16px, 4vw, 24px)',
                  position: 'relative',
                  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div
                  style={{
                    color: 'oklab(0.999994 0.0000455678 0.0000200868 / 0.05)',
                    fontFamily: 'Cinzel, serif',
                    fontSize: 'clamp(40px, 12vw, 60px)',
                    fontWeight: '700',
                    lineHeight: 'clamp(40px, 12vw, 60px)',
                    padding: 'clamp(12px, 3vw, 16px)',
                    position: 'absolute',
                    right: '0px',
                    top: '0px',
                  }}
                >
                  {step.number}
                </div>
                <h3
                  style={{
                    color: 'rgb(255, 255, 255)',
                    fontFamily: 'Cinzel, serif',
                    fontSize: 'clamp(16px, 4vw, 20px)',
                    fontWeight: '700',
                    lineHeight: 'clamp(24px, 5vw, 28px)',
                    marginBottom: '8px',
                    position: 'relative',
                    zIndex: '10',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: 'rgb(163, 158, 143)',
                    fontSize: 'clamp(13px, 3vw, 14px)',
                    lineHeight: '1.4',
                    position: 'relative',
                    zIndex: '10',
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Buy Now Button */}
          <div
            style={{
              marginTop: 'clamp(32px, 8vw, 48px)',
              textAlign: 'center',
            }}
          >
            <a
              href="https://pump.fun/coin/DMYNp65mub3i7LRpBdB66CgBAceLcQnv4gsWeCi6pump"
              className="bg-[#ffbf00] hover:bg-[#f2590d]"
              style={{
                borderRadius: '4px',
                boxShadow: 'rgba(255, 215, 0, 0.3) 0px 0px 15px 0px',
                color: 'rgb(0, 0, 0)',
                cursor: 'pointer',
                display: 'inline-block',
                fontWeight: '700',
                paddingBottom: 'clamp(10px, 2vw, 12px)',
                paddingLeft: 'clamp(24px, 6vw, 32px)',
                paddingRight: 'clamp(24px, 6vw, 32px)',
                paddingTop: 'clamp(10px, 2vw, 12px)',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: 'clamp(14px, 3vw, 16px)',
              }}
            >
              BUY NOW
            </a>
          </div>

          {/* Quick Links Section */}
          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 'clamp(32px, 8vw, 48px)',
              maxWidth: '1024px',
            }}
          >
            <div
              style={{
                marginBottom: 'clamp(16px, 4vw, 24px)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  color: 'rgb(163, 158, 143)',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 'clamp(11px, 2.5vw, 14px)',
                  letterSpacing: '1.4px',
                  lineHeight: '20px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                Exchanges & Trackers
              </div>
              <div
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(18px, 5vw, 24px)',
                  fontWeight: '700',
                  lineHeight: 'clamp(26px, 6vw, 32px)',
                  marginTop: '8px',
                  textAlign: 'center',
                  color: 'rgb(255, 255, 255)',
                }}
              >
                QUICK LINKS
              </div>
            </div>

            {/* Exchanges Grid */}
            <div
              style={{
                display: 'grid',
                gap: '16px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              }}
            >
              {exchanges.map((exchange) => (
                <a
                  key={exchange.name}
                  href={exchange.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    alignItems: 'center',
                    backgroundColor: 'oklab(0.999994 0.0000455678 0.0000200868 / 0.05)',
                    border: '1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.1)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: 'clamp(12px, 3vw, 16px)',
                    padding: 'clamp(16px, 4vw, 20px)',
                    textDecoration: 'none',
                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <img
                    alt={exchange.name}
                    loading="lazy"
                    src={exchange.icon}
                    style={{
                      backgroundColor: 'oklab(0 0 0 / 0.3)',
                      border: '1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.1)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      height: 'clamp(36px, 8vw, 40px)',
                      width: 'clamp(36px, 8vw, 40px)',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ cursor: 'pointer' }}>
                    <div
                      style={{
                        color: 'rgb(255, 255, 255)',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                      }}
                    >
                      {exchange.name}
                    </div>
                    <div
                      style={{
                        color: 'rgb(163, 158, 143)',
                        cursor: 'pointer',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: 'clamp(11px, 2.5vw, 12px)',
                        lineHeight: '16px',
                        marginTop: '4px',
                      }}
                    >
                      {exchange.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
