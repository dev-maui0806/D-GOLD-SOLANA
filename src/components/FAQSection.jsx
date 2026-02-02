import { useState } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const ChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{
      cursor: 'default',
      fill: 'none',
      height: '24px',
      overflow: 'hidden',
      stroke: 'rgb(235, 232, 224)',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2px',
      textAlign: 'left',
      transitionDuration: '0.3s',
      transitionProperty: 'transform, translate, scale, rotate',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      verticalAlign: 'middle',
      width: '24px',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    }}
  >
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

// Add animation keyframes
const animationStyles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes staggerFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .faq-answer {
    animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .faq-item.animated {
    animation: staggerFadeIn 0.6s ease-out forwards;
  }

  .faq-item.animated:nth-child(1) {
    animation-delay: 0s;
  }

  .faq-item.animated:nth-child(2) {
    animation-delay: 0.1s;
  }

  .faq-item.animated:nth-child(3) {
    animation-delay: 0.2s;
  }

  .faq-item.animated:nth-child(4) {
    animation-delay: 0.3s;
  }

  .faq-item.animated:nth-child(5) {
    animation-delay: 0.4s;
  }
`;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const { ref, isInView } = useInViewAnimation();

  const faqItems = [
    {
      question: 'What is D-GOLD?',
      answer: 'D-GOLD is a community-driven Solana memecoin celebrating the Year of the Fire Horse. It combines cultural significance with the energy of the Solana ecosystem.',
    },
    {
      question: 'When launch?',
      answer: 'D-GOLD launched on pump.fun. Check our social channels and website for the latest updates on availability.',
    },
    {
      question: 'Where can I buy?',
      answer: 'You can buy D-GOLD on pump.fun using your Solana wallet. Visit our trading page for the latest links and instructions.',
    },
    {
      question: 'Is there a presale?',
      answer: 'No presale. D-GOLD launched publicly on pump.fun, ensuring fair access to all community members.',
    },
    {
      question: 'Is this financial advice?',
      answer: 'No. This is not financial advice. Cryptocurrency is highly volatile and speculative. Do your own research before investing.',
    },
  ];

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={ref}
      id="faq"
      style={{
        backgroundColor: 'rgb(0, 0, 0)',
        paddingBottom: '80px',
        paddingTop: '80px',
      }}
    >
      <style>{animationStyles}</style>
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '768px',
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
            marginBottom: 'clamp(32px, 8vw, 48px)',
            textAlign: 'center',
            color: 'white',
          }}
        >
          FAQ
        </h2>

        <div>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${isInView ? 'animated' : ''}`}
              style={{
                backgroundColor: 'oklab(0.999994 0.0000455678 0.0000200868 / 0.05)',
                border: '1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.1)',
                borderRadius: '8px',
                marginBottom: index < faqItems.length - 1 ? 'clamp(12px, 3vw, 16px)' : '0',
                transitionDuration: '0.3s',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <button
                onClick={() => toggleItem(index)}
                style={{
                  alignItems: 'center',
                  appearance: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: 'clamp(16px, 4vw, 24px)',
                  paddingLeft: 'clamp(16px, 4vw, 24px)',
                  paddingRight: 'clamp(16px, 4vw, 24px)',
                  paddingTop: 'clamp(16px, 4vw, 24px)',
                  textAlign: 'left',
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  border: 'none',
                  transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'oklab(0.999994 0.0000455678 0.0000200868 / 0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                }}
              >
                <span
                  style={{
                    color: 'rgb(255, 255, 255)',
                    fontWeight: '700',
                    fontSize: 'clamp(14px, 3.5vw, 16px)',
                    lineHeight: 'clamp(20px, 4.5vw, 24px)',
                  }}
                >
                  {item.question}
                </span>
                <div style={{ marginLeft: '16px', flexShrink: 0 }}>
                  <ChevronIcon isOpen={openIndex === index} />
                </div>
              </button>

              {openIndex === index && (
                <div
                  className="faq-answer"
                  style={{
                    paddingBottom: 'clamp(16px, 4vw, 24px)',
                    paddingLeft: 'clamp(16px, 4vw, 24px)',
                    paddingRight: 'clamp(16px, 4vw, 24px)',
                    paddingTop: 'clamp(16px, 4vw, 24px)',
                    borderTop: '1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.05)',
                    backgroundColor: 'rgba(255, 191, 0, 0.05)',
                    color: 'rgb(163, 158, 143)',
                    lineHeight: '1.6',
                    fontSize: 'clamp(13px, 3vw, 14px)',
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
