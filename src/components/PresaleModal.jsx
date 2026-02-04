import { useEffect, useLayoutEffect, useState } from 'react';

const CONFIG = {
  COMMUNITY_CODE: 'DGOLD2026',
  WALLET_ADDRESS: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
};

const STEP = {
  CODE: 'code',
  GRANTED: 'granted',
};

function PadlockIcon({ className = 'w-12 h-12' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function WalletIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function CopyIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export default function PresaleModal({ isOpen, onClose }) {
  const [step, setStep] = useState(STEP.CODE);
  const [communityCode, setCommunityCode] = useState('');
  const [error, setError] = useState('');
  const [isCopying, setIsCopying] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useLayoutEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setStep(STEP.CODE);
      setCommunityCode('');
      setError('');
      setIsCopying(false);
      setIsExiting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(''), 5000);
    return () => clearTimeout(t);
  }, [error]);

  const closeWithAnimation = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 250);
  };

  const handleUnlock = () => {
    const trimmed = communityCode.trim();
    if (!trimmed) {
      setError('Please enter a community code');
      return;
    }
    if (trimmed.toUpperCase() !== CONFIG.COMMUNITY_CODE) {
      setError('Invalid Community Code. Please try again.');
      return;
    }
    setError('');
    setStep(STEP.GRANTED);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.WALLET_ADDRESS);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    } catch {
      setError('Failed to copy address.');
    }
  };

  if (!isOpen && !isExiting) return null;

  return (
    <>
      <style>{`
        @keyframes presaleModalOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes presaleModalOverlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes presaleModalIn {
          from { opacity: 0; transform: scale(0.92) translateY(-12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes presaleModalOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.96) translateY(-8px); }
        }
        .presale-overlay {
          animation: presaleModalOverlayIn 0.25s ease-out forwards;
        }
        .presale-overlay.exit {
          animation: presaleModalOverlayOut 0.25s ease-in forwards;
        }
        .presale-modal-box {
          animation: presaleModalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .presale-modal-box.exit {
          animation: presaleModalOut 0.25s ease-in forwards;
        }
        @keyframes presaleStepIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .presale-step {
          animation: presaleStepIn 0.3s ease-out forwards;
        }
      `}</style>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm presale-overlay ${isExiting ? 'exit' : ''}`}
          onClick={closeWithAnimation}
        />
        <div
          className={`relative presale-modal-box ${isExiting ? 'exit' : ''}`}
          style={{
            maxWidth: '540px',
            width: '100%',
            borderRadius: '20px',
            border: '1px solid rgba(255, 191, 0, 0.35)',
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.15), 0 24px 48px rgba(0,0,0,0.5)',
            background: 'linear-gradient(180deg, rgba(18,18,18,0.98) 0%, rgba(10,10,10,0.99) 100%)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={closeWithAnimation}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition z-10"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Step 1: Community code – first image */}
          {step === STEP.CODE && (
            <div className="presale-step p-8 pt-10">
              <div className="flex justify-center mb-6">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-amber-400/80 text-amber-400"
                  style={{ boxShadow: '0 0 24px rgba(255, 191, 0, 0.25)' }}
                >
                  <PadlockIcon className="w-8 h-8" />
                </div>
              </div>
              <h2
                className="text-2xl font-bold text-center text-amber-400 mb-2"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Private Presale Access
              </h2>
              <p className="text-center text-zinc-400 text-sm mb-6">
                Enter your exclusive Community Code to unlock presale details and wallet information.
              </p>
              {error && (
                <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              )}
              <div className="rounded-xl border border-amber-500/30 bg-black/40 p-4 mb-4">
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                  Community Code
                </label>
                <input
                  type="text"
                  value={communityCode}
                  onChange={(e) => setCommunityCode(e.target.value)}
                  placeholder="ENTER YOUR ACCESS CODE"
                  className="w-full rounded-lg border-2 border-amber-500/50 bg-black/60 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition uppercase"
                  style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px' }}
                />
              </div>
              <button
                type="button"
                onClick={handleUnlock}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-black transition hover:brightness-110"
                style={{
                  background: 'linear-gradient(180deg, rgb(255, 215, 0) 0%, rgb(255, 191, 0) 100%)',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
                }}
              >
                <PadlockIcon className="w-5 h-5 text-black" />
                Unlock Access
              </button>
              <p className="text-center text-zinc-500 text-xs mt-4">
                Don&apos;t have a code?{' '}
                <a href="#" className="text-amber-400/90 hover:text-amber-300 underline">
                  Join our community to get early access.
                </a>
              </p>
            </div>
          )}

          {/* Step 2: Access Granted – second image */}
          {step === STEP.GRANTED && (
            <div className="presale-step p-8 pt-10">
              <div className="text-center mb-6">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, rgb(255, 215, 0) 0%, rgb(255, 191, 0) 100%)',
                    boxShadow: '0 0 24px rgba(255, 215, 0, 0.4)',
                  }}
                >
                  <CheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-2xl font-bold text-amber-400 mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Access Granted!
                </h3>
                <p className="text-zinc-400 text-sm">
                  You now have access to the D-GOLD Private Presale.
                </p>
              </div>

              <div
                className="rounded-xl p-4 sm:p-5 mb-5"
                style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  border: '1px solid rgba(255, 191, 0, 0.2)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <WalletIcon className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-200">Presale Wallet Address</span>
                </div>
                <div className="flex items-center gap-3">
                  <code
                    className="flex-1 break-all font-mono text-xs sm:text-sm text-amber-400 py-1"
                    style={{ wordBreak: 'break-all' }}
                  >
                    {CONFIG.WALLET_ADDRESS}
                  </code>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 transition"
                    aria-label="Copy address"
                  >
                    {isCopying ? (
                      <CheckIcon className="w-4 h-4 text-amber-400" />
                    ) : (
                      <CopyIcon className="w-4 h-4 text-amber-400" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-center text-zinc-500 text-xs">
                Send SOL to the wallet address above to participate. Your allocation will be confirmed within 24 hours.
              </p>

              <button
                type="button"
                onClick={closeWithAnimation}
                className="w-full mt-6 rounded-xl py-3 font-semibold text-white border border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 transition"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
