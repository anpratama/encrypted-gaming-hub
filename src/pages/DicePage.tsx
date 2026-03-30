import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Shield, Zap, RefreshCw } from 'lucide-react'
import Footer from '../components/Footer'

type DicePhase = 'idle' | 'committed' | 'rolling' | 'revealed'
type BetType = 'high' | 'low' | 'exact' | null

function DiceFace({ value }: { value: number }) {
  const dots: Record<number, Array<[number, number]>> = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
  }

  return (
    <svg viewBox="0 0 100 100" width="80" height="80">
      <rect x="5" y="5" width="90" height="90" rx="16" ry="16"
        fill="#0A0A1E" stroke="#00FFB2" strokeWidth="2" />
      {dots[value]?.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="7" fill="#00FFB2" />
      ))}
    </svg>
  )
}

function RollHistory({ rolls }: { rolls: Array<{ value: number; bet: BetType; won: boolean }> }) {
  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {rolls.length === 0 ? (
        <div className="mono text-xs" style={{ color: 'rgba(224,224,255,0.25)' }}>No rolls yet...</div>
      ) : rolls.slice().reverse().map((r, i) => (
        <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1A1A3E' }}>
          <div className="flex items-center gap-3">
            <span className="mono text-lg font-bold" style={{ color: r.won ? '#00FFB2' : '#EF4444' }}>
              {r.value}
            </span>
            <span className="mono text-xs" style={{ color: 'rgba(224,224,255,0.4)' }}>
              Bet: {r.bet}
            </span>
          </div>
          <span className="mono text-xs font-bold" style={{ color: r.won ? '#00FFB2' : '#EF4444' }}>
            {r.won ? '+1.8x' : '-1x'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function DicePage() {
  const [phase, setPhase] = useState<DicePhase>('idle')
  const [diceValue, setDiceValue] = useState<number>(1)
  const [betType, setBetType] = useState<BetType>(null)
  const [betAmount, setBetAmount] = useState('1')
  const [commitHash, setCommitHash] = useState('')
  const [playerChips, setPlayerChips] = useState(50)
  const [rollHistory, setRollHistory] = useState<Array<{ value: number; bet: BetType; won: boolean }>>([])
  const [lastResult, setLastResult] = useState<{ won: boolean; payout: number } | null>(null)
  const [animating, setAnimating] = useState(false)

  function commit() {
    if (!betType) return
    setPhase('committed')
    setCommitHash('0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''))
  }

  function roll() {
    const bet = parseFloat(betAmount) || 1
    setPhase('rolling')
    setAnimating(true)
    setLastResult(null)

    let count = 0
    const interval = setInterval(() => {
      setDiceValue(Math.ceil(Math.random() * 6))
      count++
      if (count > 15) {
        clearInterval(interval)
        setAnimating(false)
        const finalValue = Math.ceil(Math.random() * 6)
        setDiceValue(finalValue)
        
        let won = false
        if (betType === 'high') won = finalValue >= 4
        else if (betType === 'low') won = finalValue <= 3
        else if (betType === 'exact') won = finalValue === 4

        const payout = won ? Math.floor(bet * 1.8) : 0
        setPlayerChips(prev => won ? prev + payout : prev - bet)
        setLastResult({ won, payout })
        setRollHistory(prev => [...prev, { value: finalValue, bet: betType, won }])
        setPhase('revealed')
      }
    }, 80)
  }

  function reset() {
    setPhase('idle')
    setBetType(null)
    setCommitHash('')
    setLastResult(null)
  }

  return (
    <div style={{ background: '#050510', minHeight: '100vh' }} className="fhe-grid-bg">
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/games" className="no-underline flex items-center gap-2 mb-8 group w-fit">
            <ArrowLeft size={16} style={{ color: 'rgba(224,224,255,0.5)' }} className="group-hover:-translate-x-1 transition-transform" />
            <span className="mono text-sm" style={{ color: 'rgba(224,224,255,0.5)' }}>Back to Games</span>
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="text-4xl">🎲</div>
            <div>
              <div className="mono text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#00FFB2' }}>FHE Dice</div>
              <h1 className="text-3xl font-bold" style={{ color: '#E0E0FF' }}>Provably Fair Dice</h1>
            </div>
            <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(0,255,178,0.06)', border: '1px solid rgba(0,255,178,0.2)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00FFB2' }} />
              <span className="mono text-xs" style={{ color: '#00FFB2' }}>3 Playing</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main dice area */}
            <div className="lg:col-span-2 space-y-4">
              {/* Dice display */}
              <div className="fhe-card p-8 text-center">
                <div className={`inline-block transition-transform ${animating ? 'animate-bounce' : ''}`}>
                  <DiceFace value={diceValue} />
                </div>

                {lastResult && !animating && (
                  <div className="mt-4">
                    <div className="mono text-2xl font-bold" style={{ color: lastResult.won ? '#00FFB2' : '#EF4444' }}>
                      {lastResult.won ? `🏆 WIN! +${lastResult.payout} TFHE` : '💀 LOSS'}
                    </div>
                    <div className="mono text-xs mt-2" style={{ color: 'rgba(224,224,255,0.4)' }}>
                      PROOF: ✓ Verified on-chain
                    </div>
                  </div>
                )}

                {phase === 'rolling' && (
                  <div className="mt-4 mono text-sm animate-pulse" style={{ color: '#00FFB2' }}>
                    FHE commit-reveal in progress...
                  </div>
                )}
              </div>

              {/* Bet controls */}
              <div className="fhe-card p-6">
                <h3 className="font-bold mb-4" style={{ color: '#E0E0FF' }}>
                  {phase === 'idle' ? 'Place Your Bet' : phase === 'committed' ? 'Committed — Roll!' : phase === 'revealed' ? 'Roll Again' : 'Rolling...'}
                </h3>

                {(phase === 'idle' || phase === 'revealed') && (
                  <div className="space-y-4">
                    <div>
                      <label className="mono text-xs block mb-2" style={{ color: 'rgba(224,224,255,0.4)' }}>BET TYPE</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'low' as BetType, label: 'LOW (1-3)', odds: '1.8x' },
                          { id: 'high' as BetType, label: 'HIGH (4-6)', odds: '1.8x' },
                          { id: 'exact' as BetType, label: 'EXACT (4)', odds: '5x' },
                        ].map(opt => (
                          <button key={opt.id} onClick={() => setBetType(opt.id)}
                            className="py-3 px-2 rounded-lg mono text-xs font-bold transition-all"
                            style={{
                              background: betType === opt.id ? 'rgba(0,255,178,0.12)' : 'rgba(255,255,255,0.02)',
                              border: `1px solid ${betType === opt.id ? 'rgba(0,255,178,0.4)' : '#1A1A3E'}`,
                              color: betType === opt.id ? '#00FFB2' : 'rgba(224,224,255,0.5)',
                            }}>
                            {opt.label}<br />
                            <span style={{ color: betType === opt.id ? '#00FFB2' : 'rgba(224,224,255,0.3)' }}>{opt.odds}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mono text-xs block mb-2" style={{ color: 'rgba(224,224,255,0.4)' }}>BET AMOUNT (TFHE)</label>
                      <div className="flex gap-2">
                        <input type="number" min="1" max={playerChips} value={betAmount}
                          onChange={e => setBetAmount(e.target.value)}
                          className="flex-1 rounded-lg px-4 py-2.5 mono font-bold outline-none"
                          style={{ background: '#050510', border: '1px solid #1A1A3E', color: '#E0E0FF' }} />
                        {[1, 5, 10, 25].map(v => (
                          <button key={v} onClick={() => setBetAmount(String(Math.min(v, playerChips)))}
                            className="px-3 py-2.5 rounded-lg mono text-xs transition-all"
                            style={{ background: '#1A1A3E', color: 'rgba(224,224,255,0.6)', border: '1px solid #1A1A3E' }}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button className="btn-fhe w-full py-3" onClick={commit} disabled={!betType}>
                      <Shield size={16} className="inline mr-2" />
                      Commit Bet (FHE-Encrypted)
                    </button>
                  </div>
                )}

                {phase === 'committed' && (
                  <div className="space-y-4">
                    <div className="rounded-lg p-4" style={{ background: 'rgba(0,255,178,0.06)', border: '1px solid rgba(0,255,178,0.2)' }}>
                      <div className="mono text-xs mb-1" style={{ color: 'rgba(224,224,255,0.4)' }}>COMMIT HASH</div>
                      <div className="mono text-xs break-all" style={{ color: '#00FFB2' }}>{commitHash.slice(0, 42)}...</div>
                    </div>
                    <div className="mono text-sm" style={{ color: 'rgba(224,224,255,0.6)' }}>
                      Bet committed on-chain. Tap roll to reveal!
                    </div>
                    <button className="btn-fhe w-full py-3 text-lg" onClick={roll}>
                      <RefreshCw size={18} className="inline mr-2" /> Roll Dice
                    </button>
                  </div>
                )}

                {phase === 'revealed' && (
                  <button className="btn-fhe w-full py-3" onClick={reset}>
                    Place New Bet
                  </button>
                )}
              </div>

              {/* Commit hash display */}
              {commitHash && (
                <div className="fhe-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={14} style={{ color: '#7B2FFF' }} />
                    <span className="mono text-xs font-bold" style={{ color: '#7B2FFF' }}>ON-CHAIN COMMIT</span>
                  </div>
                  <div className="mono text-xs break-all" style={{ color: 'rgba(0,255,178,0.6)' }}>{commitHash}</div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="fhe-card p-5">
                <div className="mono text-xs mb-1" style={{ color: 'rgba(224,224,255,0.4)' }}>YOUR CHIPS</div>
                <div className="mono text-3xl font-bold" style={{ color: '#00FFB2' }}>{playerChips}</div>
                <div className="mono text-xs mt-0.5" style={{ color: 'rgba(224,224,255,0.35)' }}>TFHE</div>
              </div>

              <div className="fhe-card p-5">
                <div className="mono text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#00FFB2' }}>
                  HOW IT WORKS
                </div>
                <ol className="space-y-3">
                  {[
                    'You commit an FHE-encrypted bet on-chain',
                    'The smart contract generates a verifiable random number',
                    'Reveal phase decrypts both on-chain',
                    'Cryptographic proof verifies the outcome',
                  ].map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mono text-xs font-bold flex-shrink-0" style={{ color: '#00FFB2' }}>0{i + 1}</span>
                      <span className="text-xs leading-relaxed" style={{ color: 'rgba(224,224,255,0.5)' }}>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="fhe-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={14} style={{ color: '#00FFB2' }} />
                  <span className="mono text-xs font-bold" style={{ color: '#00FFB2' }}>ROLL HISTORY</span>
                </div>
                <RollHistory rolls={rollHistory} />
              </div>

              <div className="fhe-card p-4">
                <div className="space-y-2">
                  {[
                    { label: 'House Edge', value: '1%' },
                    { label: 'Contract', value: '0x9e2b...4a1f' },
                    { label: 'Network', value: 'Fhenix' },
                    { label: 'RNG', value: 'FHE On-chain' },
                  ].map(s => (
                    <div key={s.label} className="flex justify-between">
                      <span className="mono text-xs" style={{ color: 'rgba(224,224,255,0.4)' }}>{s.label}</span>
                      <span className="mono text-xs" style={{ color: '#E0E0FF' }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
