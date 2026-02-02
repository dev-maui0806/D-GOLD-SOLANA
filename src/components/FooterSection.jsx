export default function FooterSection() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .footer-mobile {
            padding-bottom: 48px !important;
            padding-top: 48px !important;
          }
          .footer-heading-mobile {
            font-size: 36px !important;
            line-height: 40px !important;
            margin-bottom: 24px !important;
          }
          .footer-social-mobile {
            gap: 16px !important;
            margin-bottom: 32px !important;
          }
          .footer-link-mobile {
            height: 48px !important;
            width: 48px !important;
          }
          .footer-link-mobile svg {
            height: 24px !important;
            width: 24px !important;
          }
          .footer-disclaimer-mobile {
            font-size: 12px !important;
            margin-bottom: 24px !important;
          }
        }
      `}</style>
      <footer
        className="footer-mobile"
        style={{
          backgroundColor: 'rgb(0, 0, 0)',
          borderColor: 'oklab(0.999994 0.0000455678 0.0000200868 / 0.1)',
          borderTop: '1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.1)',
          overflowX: 'hidden',
          overflowY: 'hidden',
          paddingBottom: '80px',
          paddingTop: '80px',
          position: 'relative',
        }}
      >
        {/* Decorative background elements */}
        <div
          style={{
            bottom: '0px',
            left: '0px',
            opacity: 0.2,
            pointerEvents: 'none',
            position: 'absolute',
            right: '0px',
            top: '0px',
          }}
        >
          {/* Gold blur circle */}
          <div
            style={{
              backgroundColor: 'rgba(255, 191, 0, 0.2)',
              borderRadius: '50%',
              filter: 'blur(100px)',
              height: '256px',
              left: '25%',
              pointerEvents: 'none',
              position: 'absolute',
              top: '25%',
              width: '256px',
            }}
          />

          {/* Orange blur circle */}
          <div
            style={{
              backgroundColor: 'oklab(0.577 0.217662 0.112464 / 0.2)',
              borderRadius: '50%',
              bottom: '25%',
              filter: 'blur(100px)',
              height: '256px',
              pointerEvents: 'none',
              position: 'absolute',
              right: '25%',
              width: '256px',
            }}
          />
        </div>

        {/* Content container */}
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1536px',
            paddingLeft: '16px',
            paddingRight: '16px',
            position: 'relative',
            textAlign: 'center',
            width: '100%',
            zIndex: 10,
          }}
        >
          {/* Heading */}
          <h2
            className="footer-heading-mobile"
            style={{
              backgroundClip: 'text',
              backgroundImage:
                'linear-gradient(to right in oklab, rgb(255, 215, 0) 0%, rgb(255, 140, 0) 50%, rgb(255, 215, 0) 100%)',
              color: 'rgba(0, 0, 0, 0)',
              fontFamily: 'Cinzel, serif',
              fontSize: '72px',
              fontWeight: '700',
              lineHeight: '72px',
              marginBottom: '32px',
              textAlign: 'center',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            JOIN THE DYNASTY
          </h2>

          {/* Social Links */}
          {/* Disclaimer Text */}
          <p
            className="footer-disclaimer-mobile"
            style={{
              color: 'oklab(0.999994 0.0000455678 0.0000200868 / 0.3)',
              fontSize: '14px',
              lineHeight: '20px',
              marginBottom: '32px',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '576px',
              textAlign: 'center',
            }}
          >
            $BINGWU is a community-driven memecoin with no intrinsic value or expectation of financial return. There is
            no formal team or roadmap. The coin is for entertainment purposes only.
          </p>

          {/* Copyright */}
          <div
            style={{
              color: 'rgba(255, 191, 0, 0.5)',
              fontFamily: '"Space Mono", monospace',
              fontSize: '12px',
              letterSpacing: '1.2px',
              lineHeight: '16px',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            © 2026 D-GOLD. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
