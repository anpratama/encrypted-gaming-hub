import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Lock, ChevronRight, Zap, Eye, CheckCircle, ExternalLink } from 'lucide-react'
import Footer from '../components/Footer'

function FHEFlowDiagram() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 4)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl p-6 md:p-8" style={{ background: '#0A0A1E', border: '1px solid #1A1A3E' }}>
      <div className="flex items-center justify-between gap-2 mb-6">
        <span className="mono text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(224,224,255,0.4)' }}>FHE Encryption Flow</span>
        <div className="flex gap-1">
          {[0,1,2,3].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{ background: i === step ? '#00FFB2' : '#1A1A3E' }} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Step 1: Plaintext */}
        <div className={`rounded-lg p-4 transition-all duration-500 ${step === 0 ? 'ring-1 ring-green-400' : ''}`}
          style={{ background: step === 0 ? 'rgba(0,255,178,0.08)' : 'rgba(255,255,255,0.02)', border: '1px solid #1A1A3E' }}>
          <div className="mono text-xs font-bold mb-2" style={{ color: 'rgba(224,224,255,0.5)' }}>Plaintext</div>
          <div className="mono text-xs leading-relaxed" style={{ color: step === 0 ? '#00FFB2' : 'rgba(224,224,255,0.4)' }}>
            <div>Your Data</div>
            <div className="mt-2 text-xs" style={{ color: step === 0 ? '#00FFB2' : 'rgba(224,224,255,0.3)' }}>
              BET: 0.5 ETH<br/>
              MOVE: RAISE<br/>
              CARD: A♠ K♥
            </div>
          </div>
          <div className="mt-3 text-xs mono" style={{ color: '#7B2FFF' }}>FHE Encrypt →</div>
        </div>

        {/* Step 2: Fhenix Network */}
        <div className={`rounded-lg p-4 transition-all duration-500 ${step === 1 ? 'ring-1 ring-purple-500' : ''}`}
          style={{ background: step === 1 ? 'rgba(123,47,255,0.08)' : 'rgba(255,255,255,0.02)', border: '1px solid #1A1A3E' }}>
          <div className="mono text-xs font-bold mb-2" style={{ color: 'rgba(224,224,255,0.5)' }}>Fhenix Network</div>
          <div className="mono text-xs" style={{ color: step === 1 ? '#7B2FFF' : 'rgba(224,224,255,0.3)' }}>
            computing...
          </div>
          <div className="mt-2 text-xs leading-relaxed mono" style={{ color: step === 1 ? '#7B2FFF' : 'rgba(224,224,255,0.2)' }}>
            Ciphertext On-Chain<br/>
            <span className="text-xs">IGxPPm1859pKQ5bGJ1KB</span>
          </div>
          <div className="mt-3 text-xs mono" style={{ color: '#7B2FFF' }}>FHE Compute →</div>
        </div>

        {/* Step 3: Smart Contract */}
        <div className={`rounded-lg p-4 transition-all duration-500 ${step === 2 ? 'ring-1 ring-yellow-400' : ''}`}
          style={{ background: step === 2 ? 'rgba(234,179,8,0.06)' : 'rgba(255,255,255,0.02)', border: '1px solid #1A1A3E' }}>
          <div className="mono text-xs font-bold mb-2" style={{ color: 'rgba(224,224,255,0.5)' }}>Smart Contract</div>
          <div className="mono text-xs" style={{ color: step === 2 ? '#EAB308' : 'rgba(224,224,255,0.3)' }}>
            computing...<br/>
            <span className="text-xs">Verifying proof...</span>
          </div>
          <div className="mt-3 text-xs mono" style={{ color: '#7B2FFF' }}>Decrypt →</div>
        </div>

        {/* Step 4: Winner */}
        <div className={`rounded-lg p-4 transition-all duration-500 ${step === 3 ? 'ring-1 ring-green-400' : ''}`}
          style={{ background: step === 3 ? 'rgba(0,255,178,0.08)' : 'rgba(255,255,255,0.02)', border: '1px solid #1A1A3E' }}>
          <div className="mono text-xs font-bold mb-2" style={{ color: 'rgba(224,224,255,0.5)' }}>Winner Revealed</div>
          <div className="mono text-xs leading-relaxed" style={{ color: step === 3 ? '#00FFB2' : 'rgba(224,224,255,0.3)' }}>
            WINNER: You!<br/>
            POT: 1.0 ETH<br/>
            PROOF: ✓
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const duration = 1500
        const step = end / (duration / 16)
        const timer = setInterval(() => {
          start += step
          if (start >= end) { setCount(end); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="text-center">
      <div className="mono text-3xl font-bold" style={{ color: '#00FFB2' }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm mt-1" style={{ color: 'rgba(224,224,255,0.5)' }}>{label}</div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div style={{ background: '#050510', minHeight: '100vh' }} className="fhe-grid-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,255,178,0.08) 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
            style={{ background: 'rgba(0,255,178,0.06)', border: '1px solid rgba(0,255,178,0.2)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00FFB2' }} />
            <span className="mono text-xs font-semibold" style={{ color: '#00FFB2' }}>Powered by Fhenix FHE Blockchain</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none tracking-tight">
            <span style={{ color: '#E0E0FF' }}>PLAY HIDDEN.</span>
            <br />
            <span className="glow-green" style={{ color: '#00FFB2' }}>WIN FAIR.</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: 'rgba(224,224,255,0.6)', lineHeight: '1.7' }}>
            The world's first blockchain gaming platform powered by Fully Homomorphic Encryption.
            Your hand stays hidden. The outcome stays fair. Everything on-chain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/games">
              <button className="btn-fhe flex items-center gap-2 text-base px-8 py-3.5">
                Launch Games <ChevronRight size={18} />
              </button>
            </Link>
            <a href="#how-it-works">
              <button className="btn-outline-fhe flex items-center gap-2 text-base px-8 py-3.5">
                How It Works
              </button>
            </a>
          </div>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-8 mt-14 flex-wrap">
            {[
              { value: '3', label: 'Games Live' },
              { value: '100%', label: 'On-Chain' },
              { value: 'FHE', label: 'Secured' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="mono text-2xl font-bold" style={{ color: '#00FFB2' }}>{s.value}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(224,224,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FHE Flow Diagram */}
        <div className="max-w-5xl mx-auto mt-20 relative z-10">
          <FHEFlowDiagram />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="mono text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#7B2FFF' }}>
              The Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E0E0FF' }}>
              How FHE Gaming Works
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(224,224,255,0.55)' }}>
              Fully Homomorphic Encryption lets smart contracts compute on encrypted data — no trusted third party,
              no information leakage, no cheating possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                icon: <Lock size={28} />,
                title: 'Encrypt Your Move',
                desc: 'Your action — whether a card play, bet amount, or bid — is encrypted using Fhenix FHE before it ever leaves your browser. Not even the network validators can see it.',
                color: '#00FFB2',
              },
              {
                num: '02',
                icon: <Zap size={28} />,
                title: 'Compute On-Chain',
                desc: 'Fhenix smart contracts operate directly on encrypted data. The game logic runs with full cryptographic guarantees — no trusted server, no hidden backdoors.',
                color: '#7B2FFF',
              },
              {
                num: '03',
                icon: <CheckCircle size={28} />,
                title: 'Reveal & Verify',
                desc: 'When a game concludes, encrypted results are decrypted on-chain. Every outcome comes with a cryptographic proof you can verify independently on the blockchain.',
                color: '#00FFB2',
              },
            ].map(step => (
              <div key={step.num} className="fhe-card p-8 relative overflow-hidden group cursor-default">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3"
                  style={{ background: step.color }} />
                <div className="mono text-5xl font-bold mb-6 opacity-20" style={{ color: step.color }}>{step.num}</div>
                <div className="mb-4" style={{ color: step.color }}>{step.icon}</div>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#E0E0FF' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(224,224,255,0.55)' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/games">
              <button className="btn-fhe px-8 py-3">Play Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Three Flagship Games */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="mono text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#7B2FFF' }}>
              Flagship Games
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E0E0FF' }}>
              Three Flagship Games
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(224,224,255,0.55)' }}>
              Each game leverages FHE encryption differently, showcasing the power of private computation on the Fhenix blockchain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: '🃏',
                tag: 'FHE Poker',
                title: 'Hidden Hands',
                desc: 'Private poker where your hand is encrypted on-chain. Bluff with mathematical certainty.',
                href: '/games/hidden-hands',
                color: '#00FFB2',
              },
              {
                emoji: '⚔️',
                tag: 'FHE Auction',
                title: 'Secret Bids',
                desc: 'Sealed-bid auction where no one sees your offer. Smart contract computes winner fairly.',
                href: '/games/secret-bids',
                color: '#7B2FFF',
              },
              {
                emoji: '🎲',
                tag: 'FHE Dice',
                title: 'Provably Fair Dice',
                desc: 'Commit-reveal dice with on-chain proofs. Every roll is verifiable and tamper-proof.',
                href: '/games/provably-fair-dice',
                color: '#00FFB2',
              },
            ].map(game => (
              <div key={game.title} className="fhe-card p-8 group relative overflow-hidden flex flex-col">
                <div className="text-4xl mb-4">{game.emoji}</div>
                <div className="mono text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: game.color }}>{game.tag}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#E0E0FF' }}>{game.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(224,224,255,0.55)' }}>{game.desc}</p>
                <Link to={game.href as any} className="no-underline mt-6">
                  <button className="btn-fhe w-full py-2.5 text-sm">Play Now</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built on Fhenix */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-8 md:p-12" style={{ background: '#0A0A1E', border: '1px solid #1A1A3E' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mono text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#7B2FFF' }}>
                  Infrastructure
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E0E0FF' }}>
                  Built on <span style={{ color: '#00FFB2' }}>FHENIX</span>
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(224,224,255,0.55)' }}>
                  Fhenix is the first EVM-compatible FHE blockchain, enabling confidential smart contracts
                  without sacrificing composability or developer experience.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    '1st FHE Blockchain',
                    'EVM Compatible',
                    'Provable Privacy',
                    'No Trusted Setup',
                  ].map(feat => (
                    <div key={feat} className="flex items-center gap-2">
                      <Eye size={14} style={{ color: '#00FFB2' }} />
                      <span className="text-sm" style={{ color: 'rgba(224,224,255,0.7)' }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <a href="https://fhenix.io" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 no-underline">
                  <button className="btn-outline-fhe flex items-center gap-2 py-2.5">
                    Fhenix.io <ExternalLink size={14} />
                  </button>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatCounter end={23} suffix="" label="Active Players" />
                <StatCounter end={1847} suffix="" label="Games Played" />
                <StatCounter end={100} suffix="%" label="Provably Fair" />
                <div className="text-center">
                  <div className="mono text-3xl font-bold" style={{ color: '#00FFB2' }}>$48K</div>
                  <div className="text-sm mt-1" style={{ color: 'rgba(224,224,255,0.5)' }}>Volume Wagered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
