import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = ['About', 'Token', 'Roadmap', 'FAQ', 'Community'];

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu {
          animation: slideDown 0.3s ease-out;
        }

        .hamburger-icon line {
          transition: all 0.3s ease-out;
          transform-origin: center;
        }

        .hamburger-icon.open line:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }

        .hamburger-icon.open line:nth-child(2) {
          opacity: 0;
        }

        .hamburger-icon.open line:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
      `}</style>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          backgroundColor: isScrolled ? 'oklab(0 0 0 / 0.8)' : 'rgb(13, 13, 13)',
          borderBottom: isScrolled ? '1px solid rgba(255, 191, 0, 0.2)' : 'none',
          paddingTop: isScrolled ? '16px' : '24px',
          paddingBottom: isScrolled ? '16px' : '24px',
        }}
      >
        <div className="max-w-[1536px] mx-auto px-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-yellow-400" style={{ fontFamily: 'Cinzel, serif', letterSpacing: '1.2px' }}>
              D-GOLD
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mt-0.5" style={{ letterSpacing: '1px' }}>
              Digital Gold on Solana
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="relative text-sm font-medium uppercase transition-all duration-150 text-[#ddd] hover:text-[#ffbf00] ! important group"
                style={{
                  letterSpacing: '1.4px',
                  fontWeight: '500',
                }}
              >
                {item}
                <span
                  className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{
                    backgroundColor: '#ffbf00',
                  }}
                ></span>
              </a>
            ))}
            <a
              href="https://pump.fun/coin/DMYNp65mub3i7LRpBdB66CgBAceLcQnv4gsWeCi6pump"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 text-black font-bold bg-[#ffbf00] hover:bg-[#f2590d] rounded transition-all duration-150"
              style={{
                boxShadow: 'rgba(255, 215, 0, 0.3) 0px 0px 15px 0px',
              }}
            >
              BUY NOW
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={handleMenuClick}
            style={{ color: 'rgb(235, 232, 224)' }}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}
            >
              <line x1="4" y1="5" x2="20" y2="5"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="19" x2="20" y2="19"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div
            className="mobile-menu md:hidden"
            style={{
              backgroundColor: 'oklab(0 0 0 / 0.95)',
              borderTop: '1px solid rgba(255, 191, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '16px',
              marginTop: '8px',
            }}
          >
            {navigationItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={handleLinkClick}
                className="text-center transition-all duration-150 text-[#ddd] hover:text-[#ffbf00]"
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: 'rgba(235, 232, 224, 0.8)',
                  padding: '8px 0',
                }}
              >
                {item}
              </a>
            ))}
            <a
              href="https://pump.fun/coin/DMYNp65mub3i7LRpBdB66CgBAceLcQnv4gsWeCi6pump"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="text-center bg-[#fbbf00] hover:bg-[#f2590d] font-bold rounded transition-all duration-150"
              style={{
                color: 'rgb(0, 0, 0)',
                padding: '12px 16px',
                marginTop: '8px',
              }}
            >
              BUY NOW
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
