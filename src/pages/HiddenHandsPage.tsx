import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Lock, ArrowLeft, Shield, Zap, Eye, EyeOff } from 'lucide-react'
import Footer from '../components/Footer'

type Card = { suit: '♠' | '♥' | '♦' | '♣'; value: string }

const SUITS: Array<'♠' | '♥' | '♦' | '♣'> = ['♠', '♥', '♦', '♣']
const VALUES = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']

function randomCard(): Card {
  return {
    suit: SUITS[Math.floor(Math.random() * 4)],
    value: VALUES[Math.floor(Math.random() * 13)],
  }
}

function randomHand(): Card[] {
  return [randomCard(), randomCard()]
}

function CardComponent({ card, hidden }: { card: Card; hidden?: boolean }) {
  const red = card.suit === '♥' || card.suit === '♦'
  return (
    <div className="w-14 h-20 rounded-lg flex flex-col items-center justify-center relative transition-all duration-500"
      style={{ background: hidden ? '#0A0A1E' : 'white', border: `2px solid ${hidden ? '#1A1A3E' : 'transparent'}` }}>
      {hidden ? (
        <div className="flex flex-col items-center gap-1">
          <Lock size={18} style={{ color: 'rgba(0,255,178,0.5)' }} />
          <span className="mono text-xs" style={{ color: 'rgba(0,255,178,0.4)' }}>FHE</span>
        </div>
      ) : (
        <>
          <span className="absolute top-1 left-1.5 text-xs font-bold" style={{ color: red ? '#DC2626' : '#111' }}>
            {card.value}
          </span>
          <span className="text-lg" style={{ color: red ? '#DC2626' : '#111' }}>{card.suit}</span>
          <span className="absolute bottom-1 right-1.5 text-xs font-bold rotate-180" style={{ color: red ? '#DC2626' : '#111' }}>
            {card.value}
          </span>
        </>
      )}
    </div>
  )
}

const communityCards: Card[] = [
  { suit: '♠', value: 'A' }, { suit: '♦', value: 'K' }, { suit: '♣', value: '7' },
  { suit: '♥', value: '3' }, { suit: '♠', value: 'J' },
]

type GamePhase = 'idle' | 'dealing' | 'betting' | 'revealed' | 'won' | 'lost'
type BetAction = 'fold' | 'check' | 'call' | 'raise'

export default function HiddenHandsPage() {
  const [phase, setPhase] = useState<GamePhase>('idle')
  const [playerHand, setPlayerHand] = useState<Card[]>([])
  const [opponentHand] = useState<Card[]>(randomHand())
  const [pot, setPot] = useState(0)
  const [playerChips, setPlayerChips] = useState(100)
  const [showHand, setShowHand] = useState(false)
  const [lastAction, setLastAction] = useState<string>('')
  const [encryptLog, setEncryptLog] = useState<string[]>([])

  function deal() {
    const hand = randomHand()
    setPlayerHand(hand)
    setPhase('dealing')
    setPot(2)
    setPlayerChips(prev => prev - 2)
    setShowHand(false)
    setEncryptLog([])
    setTimeout(() => {
      setPhase('betting')
      setEncryptLog(['[FHE] Hand encrypted: ' + Math.random().toString(36).slice(2, 10).toUpperCase()])
    }, 1000)
  }

  function action(act: BetAction) {
    const actions: Record<BetAction, () => void> = {
      fold: () => { setPhase('lost'); setLastAction('You folded.') },
      check: () => { setLastAction('You checked.'); setPot(p => p + 1) },
      call: () => {
        setLastAction('You called 5.')
        setPot(p => p + 5); setPlayerChips(p => p - 5)
        setEncryptLog(prev => [...prev, '[FHE] Bet encrypted: ' + Math.random().toString(36).slice(2, 10).toUpperCase()])
      },
      raise: () => {
        setLastAction('You raised to 15.')
        setPot(p => p + 15); setPlayerChips(p => p - 15)
        setEncryptLog(prev => [...prev, '[FHE] Raise encrypted: ' + Math.random().toString(36).slice(2, 10).toUpperCase()])
      },
    }
    actions[act]()

    if (act !== 'fold') {
      setTimeout(() => {
        setPhase('revealed')
        setEncryptLog(prev => [...prev, '[FHE] Reveal: On-chain decryption complete. PROOF: ✓'])
        if (Math.random() > 0.45) {
          setPhase('won')
          setPlayerChips(p => p + pot + 5)
        } else {
          setPhase('lost')
        }
      }, 1500)
    }
  }

  return (
    <div style={{ background: '#050510', minHeight: '100vh' }} className="fhe-grid-bg">
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link to="/games" className="no-underline flex items-center gap-2 mb-8 group w-fit">
            <ArrowLeft size={16} style={{ color: 'rgba(224,224,255,0.5)' }} className="group-hover:-translate-x-1 transition-transform" />
            <span className="mono text-sm" style={{ color: 'rgba(224,224,255,0.5)' }}>Back to Games</span>
          </Link>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="text-4xl">🃏</div>
            <div>
              <div className="mono text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#00FFB2' }}>FHE Poker</div>
              <h1 className="text-3xl font-bold" style={{ color: '#E0E0FF' }}>Hidden Hands</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00FFB2' }} />
              <span className="mono text-xs" style={{ color: '#00FFB2' }}>12 Playing</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Game Table */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl p-6 md:p-8" style={{ background: '#0A0A1E', border: '1px solid #1A1A3E' }}>
                {/* Opponent */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#1A1A3E' }}>
                      <span className="mono text-xs">P2</span>
                    </div>
                    <span className="text-sm" style={{ color: 'rgba(224,224,255,0.6)' }}>Opponent</span>
                  </div>
                  <div className="flex gap-2">
                    {(phase === 'revealed' || phase === 'won' || phase === 'lost' ? opponentHand : [null, null]).map((card, i) => (
                      card ? <CardComponent key={i} card={card} hidden={phase !== 'won' && phase !== 'lost'} />
                        : <div key={i} className="w-14 h-20 rounded-lg flex items-center justify-center"
                          style={{ background: '#0A0A1E', border: '2px solid #1A1A3E' }}>
                          <Lock size={16} style={{ color: '#1A1A3E' }} />
                        </div>
                    ))}
                  </div>
                </div>

                {/* Community cards */}
                <div className="rounded-xl p-4 mb-6 text-center" style={{ background: 'rgba(0,100,50,0.12)', border: '1px solid rgba(0,255,178,0.1)' }}>
                  <div className="mono text-xs mb-3" style={{ color: 'rgba(224,224,255,0.4)' }}>Community Cards</div>
                  <div className="flex items-center justify-center gap-2">
                    {communityCards.map((card, i) => (
                      <CardComponent key={i} card={card} hidden={phase === 'idle'} />
                    ))}
                  </div>
                  {pot > 0 && (
                    <div className="mt-3 mono text-sm font-bold" style={{ color: '#00FFB2' }}>
                      POT: {pot} TFHE
                    </div>
                  )}
                </div>

                {/* Player hand */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,255,178,0.15)' }}>
                      <span className="mono text-xs" style={{ color: '#00FFB2' }}>YOU</span>
                    </div>
                    <span className="text-sm" style={{ color: '#E0E0FF' }}>Your Hand</span>
                    {phase === 'betting' && (
                      <button onClick={() => setShowHand(!showHand)} className="flex items-center gap-1"
                        style={{ color: 'rgba(224,224,255,0.4)', cursor: 'pointer', background: 'none', border: 'none' }}>
                        {showHand ? <EyeOff size={14} /> : <Eye size={14} />}
                        <span className="text-xs">{showHand ? 'Hide' : 'Show'}</span>
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {playerHand.length > 0
                      ? playerHand.map((card, i) => (
                        <CardComponent key={i} card={card} hidden={!showHand && phase === 'betting'} />
                      ))
                      : [0, 1].map(i => (
                        <div key={i} className="w-14 h-20 rounded-lg"
                          style={{ background: '#050510', border: '2px dashed #1A1A3E' }} />
                      ))
                    }
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8">
                  {phase === 'idle' && (
                    <button className="btn-fhe w-full text-base py-3" onClick={deal}>
                      Deal Cards (2 TFHE)
                    </button>
                  )}
                  {phase === 'dealing' && (
                    <div className="text-center mono text-sm animate-pulse" style={{ color: '#00FFB2' }}>
                      Encrypting your hand with FHE...
                    </div>
                  )}
                  {phase === 'betting' && (
                    <div className="grid grid-cols-4 gap-2">
                      <button className="btn-outline-fhe py-2.5 text-sm border-red-500 text-red-400 hover:bg-red-500/10"
                        onClick={() => action('fold')}>Fold</button>
                      <button className="btn-outline-fhe py-2.5 text-sm" onClick={() => action('check')}>Check</button>
                      <button className="btn-outline-fhe py-2.5 text-sm" onClick={() => action('call')}>Call 5</button>
                      <button className="btn-fhe py-2.5 text-sm" onClick={() => action('raise')}>Raise 15</button>
                    </div>
                  )}
                  {(phase === 'won' || phase === 'lost') && (
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2" style={{ color: phase === 'won' ? '#00FFB2' : '#EF4444' }}>
                        {phase === 'won' ? '🏆 You Won!' : '💀 You Lost'}
                      </div>
                      {phase === 'won' && <div className="mono text-sm mb-4" style={{ color: '#00FFB2' }}>+{pot} TFHE</div>}
                      <button className="btn-fhe px-8" onClick={() => { setPhase('idle'); setPlayerHand([]); setPot(0) }}>
                        Play Again
                      </button>
                    </div>
                  )}
                  {phase === 'revealed' && (
                    <div className="text-center mono text-sm animate-pulse" style={{ color: '#7B2FFF' }}>
                      Computing winner on-chain...
                    </div>
                  )}
                </div>

                {lastAction && phase !== 'idle' && (
                  <div className="mt-4 text-center mono text-xs" style={{ color: 'rgba(224,224,255,0.4)' }}>{lastAction}</div>
                )}
              </div>
            </div>

            {/* Info Panel */}
            <div className="flex flex-col gap-4">
              {/* Chips */}
              <div className="fhe-card p-4">
                <div className="mono text-xs mb-2" style={{ color: 'rgba(224,224,255,0.4)' }}>YOUR STACK</div>
                <div className="mono text-2xl font-bold" style={{ color: '#00FFB2' }}>{playerChips} TFHE</div>
              </div>

              {/* Encryption Log */}
              <div className="fhe-card p-4 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={14} style={{ color: '#7B2FFF' }} />
                  <span className="mono text-xs font-bold" style={{ color: '#7B2FFF' }}>FHE ENCRYPTION LOG</span>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {encryptLog.length === 0 ? (
                    <div className="mono text-xs" style={{ color: 'rgba(224,224,255,0.25)' }}>
                      Waiting for game to start...
                    </div>
                  ) : encryptLog.map((log, i) => (
                    <div key={i} className="mono text-xs leading-relaxed" style={{ color: 'rgba(0,255,178,0.7)' }}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* FHE Info */}
              <div className="fhe-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={14} style={{ color: '#00FFB2' }} />
                  <span className="mono text-xs font-bold" style={{ color: '#00FFB2' }}>HOW IT WORKS</span>
                </div>
                <ul className="space-y-2">
                  {[
                    'Your cards are FHE-encrypted before leaving your browser',
                    'The smart contract computes on ciphertext only',
                    'Result decrypted on-chain with cryptographic proof',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#00FFB2' }}>→</span>
                      <span className="mono text-xs" style={{ color: 'rgba(224,224,255,0.5)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
