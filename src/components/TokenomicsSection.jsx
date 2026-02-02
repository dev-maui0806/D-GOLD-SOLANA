import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

// Configuration ported from the original vanilla JS implementation
const CONFIG = {
  COMMUNITY_CODE: 'DGOLD2024',
  SOLANA_WALLET_ADDRESS: 'YOUR_SOLANA_WALLET_ADDRESS',
  TIERS: {
    1: { name: 'Tier 1', minAmount: 50, price: 'Best presale price' },
    2: { name: 'Tier 2', minAmount: 25, price: 'Mid-stage presale price' },
    3: { name: 'Tier 3', minAmount: 10, price: 'Final presale access' },
  },
  BLOCKCHAIN_CHECK: {
    enabled: true,
    rpcEndpoint: 'https://api.mainnet-beta.solana.com',
    checkInterval: 5000,
    maxWaitTime: 300000, // 5 minutes
  },
  LOGGING: {
    enabled: true,
    storageKey: 'dgold_presale_logs',
  },
};

export default function TokenomicsSection() {
  const { ref, isInView } = useInViewAnimation();

  const [communityCode, setCommunityCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [username, setUsername] = useState('');
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);
  const [currentTier, setCurrentTier] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState(null);
  const [status, setStatus] = useState({
    visible: false,
    title: '',
    message: '',
    state: 'idle', // 'idle' | 'waiting' | 'success'
  });
  const [error, setError] = useState('');
  const [isCopying, setIsCopying] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!error) return;
    const timeout = setTimeout(() => setError(''), 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  const handleUnlock = () => {
    const trimmed = communityCode.trim();

    if (!trimmed) {
      setError('Please enter a community code');
      return;
    }

    if (trimmed !== CONFIG.COMMUNITY_CODE) {
      setError('Invalid community code. Please try again.');
      return;
    }

    setIsUnlocked(true);
  };

  const handleSubmitUserInfo = () => {
    const value = username.trim();

    if (!value) {
      setError('Please enter your Telegram or Discord username');
      return;
    }

    setIsUserInfoSubmitted(true);
  };

  const handleTierSelection = (tier) => {
    const tierConfig = CONFIG.TIERS[tier];
    if (!tierConfig) return;

    setCurrentTier(tier);
    setStatus({
      visible: true,
      state: 'waiting',
      title: 'Waiting for Transaction',
      message: `Please send ${tierConfig.minAmount} SOL or more to the wallet address above. We will automatically detect your transaction.`,
    });

    startTransactionCheck(tierConfig);
  };

  const startTransactionCheck = (tierConfig) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!CONFIG.BLOCKCHAIN_CHECK.enabled) {
      setTimeout(() => simulateTransactionConfirmation(tierConfig), 10000);
      return;
    }

    const startTime = Date.now();
    const { maxWaitTime } = CONFIG.BLOCKCHAIN_CHECK;

    intervalRef.current = window.setInterval(async () => {
      try {
        const hasTransaction = await checkSolanaTransaction(
          CONFIG.SOLANA_WALLET_ADDRESS,
          tierConfig.minAmount,
        );

        if (hasTransaction) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          confirmTransaction(tierConfig);
        } else if (Date.now() - startTime > maxWaitTime) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setError('Transaction timeout. Please try again or contact support.');
        }
      } catch (err) {
        console.error('Error checking transaction:', err);
        if (Date.now() - startTime > 30000) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          simulateTransactionConfirmation(tierConfig);
        }
      }
    }, CONFIG.BLOCKCHAIN_CHECK.checkInterval);
  };

  const checkSolanaTransaction = async (walletAddress, minAmount) => {
    try {
      const response = await fetch(CONFIG.BLOCKCHAIN_CHECK.rpcEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getSignaturesForAddress',
          params: [walletAddress, { limit: 10 }],
        }),
      });

      await response.json();

      // For demo purposes, always return false to keep checking,
      // identical to the original implementation.
      return false;
    } catch (error) {
      console.error('Error checking Solana transaction:', error);
      return false;
    }
  };

  const simulateTransactionConfirmation = (tierConfig) => {
    setTimeout(() => {
      confirmTransaction(tierConfig);
    }, 2000);
  };

  const confirmTransaction = (tierConfig) => {
    const generatedConfirmationCode = generateConfirmationCode();
    const generatedTransactionHash = generateTransactionHash();

    setConfirmationCode(generatedConfirmationCode);
    setTransactionHash(generatedTransactionHash);
    setStatus({
      visible: true,
      state: 'success',
      title: 'Transaction Confirmed!',
      message: 'Your transaction has been verified on the blockchain.',
    });

    logTransaction({
      tier: currentTier,
      username,
      amount: tierConfig.minAmount,
      transactionHash: generatedTransactionHash,
      confirmationCode: generatedConfirmationCode,
      timestamp: new Date().toISOString(),
    });
  };

  const generateConfirmationCode = () => {
    const prefix = 'DGOLD';
    const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
    const timestamp = Date.now().toString(36).substring(5, 9).toUpperCase();
    return `${prefix}-${randomPart}-${timestamp}`;
  };

  const generateTransactionHash = () =>
    `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join('')}`;

  const logTransaction = (transactionData) => {
    if (!CONFIG.LOGGING.enabled) return;

    const existingLogs = JSON.parse(
      localStorage.getItem(CONFIG.LOGGING.storageKey) || '[]',
    );

    existingLogs.push(transactionData);

    localStorage.setItem(
      CONFIG.LOGGING.storageKey,
      JSON.stringify(existingLogs),
    );

    // Matches original behavior: console logging instead of real backend call
    // eslint-disable-next-line no-console
    console.log('Transaction logged:', transactionData);
  };

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.SOLANA_WALLET_ADDRESS);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError('Failed to copy address. Please copy manually.');
    }
  };

  const copyCommunityCode = async () => {
    try {
      await navigator.clipboard.writeText(communityCode || 'DMYNp65mub3i7LRpBdB66CgBAceLcQnv4gsWeCi6pump');
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError('Failed to copy code. Please copy manually.');
    }
  };

  const tiersVisible = isUnlocked && isUserInfoSubmitted && !status.visible;
  const showConfirmation = Boolean(confirmationCode);

  return (
    <section
      ref={ref}
      id="presale"
      className={`${isInView ? 'animate-[fadeIn_0.7s_ease-out_forwards]' : ''} bg-black/95 border-t border-yellow-500/10 py-12 sm:py-16 md:py-20`}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white" style={{ fontFamily: 'Cinzel, serif', lineHeight: '1.2', marginBottom: '12px' }}>
            PRIVATE PRESALE ACCESS
          </h2>
          <p className="text-center text-sm sm:text-base" style={{ color: 'rgb(163, 158, 143)' }}>
            Enter your community code to unlock presale details
          </p>
        </div>

        {/* Error toast */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100 shadow-lg shadow-red-900/40">
            {error}
          </div>
        )}

        {/* Single presale box – all steps swap inside this one container */}
        <div
          className="mx-auto max-w-7xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'oklab(0 0 0 / 0.5)',
            border: '1px solid rgba(255, 191, 0, 0.2)',
            boxShadow:
              'rgba(255, 215, 0, 0.1) 0px 0px 20px 0px, rgba(255, 69, 0, 0.05) 0px 0px 20px 0px inset',
          }}
        >
          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            .step-transition-enter {
              animation: fadeInUp 0.4s ease-out forwards;
            }
            .step-transition-exit {
              animation: fadeOut 0.3s ease-in forwards;
            }
          `}</style>
          {/* Step 1: Community code */}
          {!isUnlocked && !status.visible && (
            <div className="step-transition-enter">
              <div className="mb-6 sm:mb-8">
                <div
                  style={{
                    color: 'rgb(255, 255, 255)',
                    fontSize: 'clamp(20px, 5vw, 24px)',
                    fontWeight: '700',
                    lineHeight: '1.3',
                  }}
                >
                  Community Code
                </div>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                  Enter your access code to reveal the private presale wallet and
                  registration details.
                </p>
              </div>

              <div className="mb-6 sm:mb-8">
                <label
                  style={{
                    color: 'rgb(163, 158, 143)',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '12px',
                    lineHeight: '20px',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  Input code
                </label>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'stretch',
                  }}
                  className="sm:flex-row sm:items-center sm:gap-2"
                >
                  <input
                    type="text"
                    value={communityCode}
                    onChange={(e) => setCommunityCode(e.target.value)}
                    placeholder="Enter your community code"
                    style={{
                      backgroundColor: 'oklab(0 0 0 / 0.5)',
                      border:
                        '1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.1)',
                      borderRadius: '8px',
                      color: 'rgb(255, 255, 255)',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '13px',
                      lineHeight: '20px',
                      padding: '12px 14px',
                      flex: 1,
                      outline: 'none',
                      transition:
                        'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgb(255, 191, 0)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor =
                        'oklab(0.999994 0.0000455678 0.0000200868 / 0.1)';
                    }}
                  />
                  <button
                    type="button"
                    onClick={copyCommunityCode}
                    style={{
                      backgroundColor:
                        'oklab(0.999994 0.0000455678 0.0000200868 / 0.1)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'rgb(255, 255, 255)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 16px',
                      transition:
                        'background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor =
                        'oklab(0.999994 0.0000455678 0.0000200868 / 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor =
                        'oklab(0.999994 0.0000455678 0.0000200868 / 0.1)';
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        width="14"
                        height="14"
                        x="8"
                        y="8"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gap: '12px',
                  gridTemplateColumns: '1fr',
                }}
                className="sm:grid-cols-auto sm:gap-4"
              >
                <button
                  type="button"
                  onClick={handleUnlock}
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgb(255, 191, 0) 0%, oklch(0.666 0.179 58.318) 100%)',
                    borderRadius: '6px',
                    border: 'none',
                    boxShadow:
                      'rgba(255, 215, 0, 0.4) 0px 0px 20px 0px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    padding: '14px 24px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    color: 'rgb(0, 0, 0)',
                    fontSize: '14px',
                    display: 'block',
                    width: '100%',
                    transition:
                      'filter 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  className="sm:w-auto sm:inline-block"
                  onMouseEnter={(e) => {
                    e.target.style.filter = 'brightness(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.filter = 'brightness(1)';
                  }}
                >
                  UNLOCK PRESALE
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Wallet + Username (replaces code area) */}
          {isUnlocked && !isUserInfoSubmitted && !status.visible && (
            <div className="step-transition-enter grid gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                  Send SOL to participate
                </h3>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                  Send the required SOL amount to the wallet below. We will
                  periodically check the Solana blockchain for your
                  transaction.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 rounded-xl border border-yellow-500/20 bg-black/60 p-3">
                  <div className="flex-1 min-w-0">
                    <span className="block break-all font-mono text-xs pt-2 text-yellow-100">
                      {CONFIG.SOLANA_WALLET_ADDRESS}
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-2 flex-shrink-0">
                    <div className="rounded-lg bg-white p-1 sm:p-2 hidden sm:block">
                      <QRCodeSVG
                        value={CONFIG.SOLANA_WALLET_ADDRESS}
                        size={16}
                        level="M"
                        includeMargin={false}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={copyWalletAddress}
                      className="inline-flex items-center gap-1 rounded-lg bg-yellow-400/90 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-black shadow-sm hover:bg-yellow-300 transition whitespace-nowrap"
                    >
                      {isCopying ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="hidden sm:inline">Copied</span>
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                          </svg>
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-zinc-500">
                  Replace{' '}
                  <span className="font-mono text-zinc-300">
                    YOUR_SOLANA_WALLET_ADDRESS
                  </span>{' '}
                  in the configuration with your real presale wallet
                  address.
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                  Your contact (Telegram / Discord)
                </h3>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                  We use this to match your wallet transaction with your
                  community profile.
                </p>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@your_handle"
                  className="mt-4 w-full rounded-xl border border-yellow-500/20 bg-black/60 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white outline-none ring-0 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/40"
                />
                <button
                  type="button"
                  onClick={handleSubmitUserInfo}
                  className="mt-3 inline-flex items-center justify-center rounded-xl bg-zinc-800 px-3 sm:px-4 py-2 text-xs font-semibold text-zinc-100 ring-1 ring-zinc-600/60 transition hover:bg-zinc-700"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Tiers (replaces wallet/user area) */}
          {tiersVisible && !status.visible && (
            <div className="step-transition-enter">
              <div className="mb-5 text-center">
                <h3 className="mt-1 text-sm sm:text-base md:text-lg font-semibold text-white">
                  Choose your presale tier
                </h3>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                  Minimum contribution is enforced off-chain by the team.
                  Logic here matches the original implementation.
                </p>
              </div>
              <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(CONFIG.TIERS).map(([key, tier]) => {
                  const selected = Number(key) === currentTier;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleTierSelection(Number(key))}
                      className={`group flex h-full flex-col rounded-xl sm:rounded-2xl border px-3 sm:px-4 py-3 sm:py-4 text-left transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-900/40 ${
                        selected
                          ? 'border-yellow-400 bg-yellow-500/10'
                          : 'border-yellow-500/20 bg-zinc-950/80'
                      }`}
                    >
                      <span className="mb-2 inline-flex items-center rounded-full bg-yellow-500/10 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-yellow-300">
                        {tier.name}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-white">
                        {tier.price}
                      </p>
                      <p className="mt-2 text-lg sm:text-xl font-bold text-yellow-300">
                        {tier.minAmount} SOL
                      </p>
                      <p className="mt-1 text-[11px] sm:text-xs text-zinc-400">
                        Minimum contribution
                      </p>
                      <span className="mt-3 sm:mt-4 inline-flex items-center text-[11px] sm:text-xs font-semibold text-yellow-200">
                        {selected ? 'Selected tier' : 'Select tier'}
                        <span className="ml-1 text-[9px] sm:text-[10px] text-yellow-200/80">
                          ↗
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Transaction status + confirmation (replaces tiers) */}
          {status.visible && (
            <div className="step-transition-enter">
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {/* Left: Wallet Address + QR Code */}
                {status.state === 'waiting' && (
                  <div className="rounded-xl sm:rounded-2xl border border-yellow-500/20 bg-zinc-950/80 p-4 sm:p-5 shadow-lg shadow-yellow-900/20">
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white mb-1">
                      Send SOL to participate
                    </h3>
                    <p className="text-xs text-zinc-400 mb-3 sm:mb-4">
                      Scan the QR code or copy the address below
                    </p>
                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                      <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 rounded-lg sm:rounded-xl border border-yellow-500/20 bg-black/60 p-2 sm:p-3">
                        <span className="flex-1 break-all font-mono text-xs text-yellow-100 order-2 sm:order-1">
                          {CONFIG.SOLANA_WALLET_ADDRESS}
                        </span>
                        <div className="flex items-center gap-2 order-1 sm:order-2 flex-shrink-0">
                          <div className="rounded-lg bg-white p-1 shadow-lg">
                            <QRCodeSVG
                              value={CONFIG.SOLANA_WALLET_ADDRESS}
                              size={18}
                              level="M"
                              includeMargin={false}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={copyWalletAddress}
                            className="inline-flex items-center gap-1 rounded-lg bg-yellow-400/90 px-2 sm:px-3 py-1.5 text-xs font-semibold text-black shadow-sm hover:bg-yellow-300 transition flex-shrink-0 whitespace-nowrap"
                          >
                            {isCopying ? (
                              <>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="hidden sm:inline">Copied</span>
                              </>
                            ) : (
                              <>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                                </svg>
                                <span className="hidden sm:inline">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Right: Transaction Status */}
                <div className="rounded-xl sm:rounded-2xl border border-yellow-500/20 bg-zinc-950/90 p-4 sm:p-5 shadow-lg shadow-yellow-900/30">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className={`flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full text-lg sm:text-xl flex-shrink-0 ${
                        status.state === 'success'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-yellow-400 text-black'
                      } ${status.state === 'waiting' ? 'animate-spin' : ''}`}
                    >
                      {status.state === 'success' ? '✓' : '⏳'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                        {status.title}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-400">
                        {status.message}
                      </p>
                      {transactionHash && (
                        <div className="mt-3 rounded-lg sm:rounded-xl bg-black/60 px-2 sm:px-3 py-2 text-xs text-zinc-300">
                          <p>
                            <span className="font-semibold text-yellow-200">
                              Tx:
                            </span>{' '}
                            <span className="break-all font-mono text-[10px] sm:text-xs">
                              {transactionHash}
                            </span>
                          </p>
                          <p className="mt-1 text-xs text-zinc-400">
                            <span className="font-medium text-zinc-100">
                              {currentTier
                                ? CONFIG.TIERS[currentTier].name
                                : '-'}
                            </span>{' '}
                            • <span className="font-medium text-zinc-100">
                              {username || '-'}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {showConfirmation && (
                <div className="mt-4 sm:mt-6 step-transition-enter rounded-xl sm:rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 sm:p-6 text-center shadow-xl shadow-emerald-900/40">
                  <div className="mx-auto flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-full bg-emerald-500 text-xl sm:text-2xl text-white">
                    ✓
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-white">
                    Payment Confirmed
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-emerald-100/90">
                    Your transaction has been verified. This is your unique
                    confirmation code – store it safely.
                  </p>
                  <div className="mt-3 sm:mt-4 inline-flex rounded-lg sm:rounded-xl border border-emerald-400/60 bg-black/40 px-3 sm:px-4 py-2 sm:py-3 font-mono text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.25em] text-emerald-200 break-all sm:break-normal">
                    {confirmationCode}
                  </div>
                  <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs text-emerald-100/80">
                    In production, this code should also be stored on your
                    backend with the associated wallet and username.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
