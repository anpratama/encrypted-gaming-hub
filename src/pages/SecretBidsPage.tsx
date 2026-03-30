import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Shield, Lock, TrendingUp, Clock, Trophy } from 'lucide-react'
import Footer from '../components/Footer'

type Bid = { address: string; amount: number | null; revealed: boolean }

const mockBidders: Bid[] = [
  { address: '0x7f3a...4b2c', amount: null, revealed: false },
  { address: '0x9d1e...8f3a', amount: null, revealed: false },
  { address: '0x2c8b...1d4e', amount: null, revealed: false },
]

function obfuscate(val: number) {
  return '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

type AuctionPhase = 'bidding' | 'committed' | 'revealing' | 'settled'

export default function SecretBidsPage() {
  const [phase, setPhase] = useState<AuctionPhase>('bidding')
  const [bidAmount, setBidAmount] = useState('')
  const [playerBid, setPlayerBid] = useState<number | null>(null)
  const [bidders, setBidders] = useState<Bid[]>(mockBidders)
  const [encHash, setEncHash] = useState('')
  const [winner, setWinner] = useState<string>('')
  const [timeLeft] = useState(47)

  function submitBid() {
    const amt = parseFloat(bidAmount)
    if (!amt || amt <= 0) return
    setPlayerBid(amt)
    setEncHash(obfuscate(amt))
    setPhase('committed')
  }

  function reveal() {
    setPhase('revealing')
    const allBids = [
      amt => amt,
      () => Math.random() * 2 + 0.5,
      () => Math.random() * 1.5 + 0.3,
      () => Math.random() * 2.5 + 0.1,
    ]
    const revealed: Bid[] = bidders.map((b, i) => ({
      ...b,
      amount: parseFloat((allBids[i + 1]()).toFixed(3)),
      revealed: true,
    }))

    setTimeout(() => {
      setBidders(revealed)
      const allAmounts = [playerBid!, ...revealed.map(b => b.amount!)]
      const maxAmt = Math.max(...allAmounts)
      if (playerBid === maxAmt) {
        setWinner('You')
      } else {
        const winnerBidder = revealed.find(b => b.amount === maxAmt)
        setWinner(winnerBidder?.address ?? 'Unknown')
      }
      setPhase('settled')
    }, 2000)
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
            <div className="text-4xl">⚔️</div>
            <div>
              <div className="mono text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#7B2FFF' }}>FHE Auction</div>
              <h1 className="text-3xl font-bold" style={{ color: '#E0E0FF' }}>Secret Bids</h1>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(123,47,255,0.1)', border: '1px solid rgba(123,47,255,0.3)' }}>
                <Clock size={14} style={{ color: '#7B2FFF' }} />
                <span className="mono text-sm font-bold" style={{ color: '#7B2FFF' }}>{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* Auction item */}
          <div className="rounded-2xl p-6 mb-6" style={{ background: '#0A0A1E', border: '1px solid #1A1A3E' }}>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #1A1A3E, #0A0A1E)', border: '1px solid #1A1A3E' }}>
                🏆
              </div>
              <div className="flex-1">
                <div className="mono text-xs font-bold mb-1" style={{ color: '#7B2FFF' }}>AUCTION #0042</div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#E0E0FF' }}>Fhenix Genesis NFT</h3>
                <p className="text-sm" style={{ color: 'rgba(224,224,255,0.5)' }}>
                  1-of-1 genesis NFT from the Fhenix ecosystem. All bids are sealed and encrypted on-chain.
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="mono text-xs mb-1" style={{ color: 'rgba(224,224,255,0.4)' }}>Min. Bid</div>
                <div className="mono text-2xl font-bold" style={{ color: '#00FFB2' }}>0.1 ETH</div>
                <div className="text-xs mt-1" style={{ color: 'rgba(224,224,255,0.4)' }}>
                  {bidders.length + 1} bidders
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bid panel */}
            <div className="lg:col-span-2 space-y-4">
              {/* Your bid */}
              <div className="fhe-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Lock size={16} style={{ color: '#7B2FFF' }} />
                  <span className="text-lg font-bold" style={{ color: '#E0E0FF' }}>
                    {phase === 'bidding' ? 'Place Your Sealed Bid' : 'Your Encrypted Bid'}
                  </span>
                </div>

                {phase === 'bidding' && (
                  <div className="space-y-4">
                    <div>
                      <label className="mono text-xs block mb-2" style={{ color: 'rgba(224,224,255,0.5)' }}>
                        BID AMOUNT (ETH)
                      </label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.01"
                        placeholder="0.00"
                        value={bidAmount}
                        onChange={e => setBidAmount(e.target.value)}
                        className="w-full rounded-lg px-4 py-3 mono text-lg font-bold outline-none transition-all"
                        style={{
                          background: '#050510',
                          border: '1px solid #1A1A3E',
                          color: '#E0E0FF',
                        }}
                      />
                    </div>
                    <div className="rounded-lg p-3" style={{ background: 'rgba(123,47,255,0.08)', border: '1px solid rgba(123,47,255,0.2)' }}>
                      <p className="mono text-xs" style={{ color: 'rgba(123,47,255,0.8)' }}>
                        🔒 Your bid will be FHE-encrypted before submission. No one — including validators — can see your amount until reveal.
                      </p>
                    </div>
                    <button className="btn-fhe w-full py-3" onClick={submitBid} disabled={!bidAmount || parseFloat(bidAmount) <= 0}>
                      Submit Encrypted Bid
                    </button>
                  </div>
                )}

                {phase === 'committed' && (
                  <div className="space-y-4">
                    <div className="rounded-lg p-4" style={{ background: 'rgba(0,255,178,0.06)', border: '1px solid rgba(0,255,178,0.2)' }}>
                      <div className="mono text-xs mb-2" style={{ color: 'rgba(224,224,255,0.4)' }}>ENCRYPTED BID (on-chain)</div>
                      <div className="mono text-sm break-all" style={{ color: '#00FFB2' }}>{encHash}</div>
                    </div>
                    <div className="mono text-sm" style={{ color: 'rgba(224,224,255,0.6)' }}>
                      Your bid of <strong style={{ color: '#00FFB2' }}>{playerBid} ETH</strong> has been encrypted and committed on-chain.
                      Waiting for auction to end...
                    </div>
                    <button className="btn-fhe w-full py-3" onClick={reveal}>
                      <TrendingUp size={16} className="inline mr-2" />
                      Reveal All Bids
                    </button>
                  </div>
                )}

                {phase === 'revealing' && (
                  <div className="text-center py-4">
                    <div className="mono text-base animate-pulse" style={{ color: '#7B2FFF' }}>
                      Decrypting bids on-chain...
                    </div>
                    <div className="mono text-xs mt-2" style={{ color: 'rgba(224,224,255,0.4)' }}>
                      FHE smart contract computing winner...
                    </div>
                  </div>
                )}

                {phase === 'settled' && (
                  <div className="space-y-4">
                    <div className={`rounded-xl p-6 text-center`}
                      style={{ background: winner === 'You' ? 'rgba(0,255,178,0.08)' : 'rgba(123,47,255,0.08)', border: `1px solid ${winner === 'You' ? 'rgba(0,255,178,0.3)' : 'rgba(123,47,255,0.3)'}` }}>
                      <Trophy size={32} className="mx-auto mb-3" style={{ color: winner === 'You' ? '#00FFB2' : '#7B2FFF' }} />
                      <div className="mono text-xl font-bold mb-1" style={{ color: winner === 'You' ? '#00FFB2' : '#E0E0FF' }}>
                        {winner === 'You' ? '🏆 You Won!' : `Winner: ${winner}`}
                      </div>
                      <div className="mono text-sm" style={{ color: 'rgba(224,224,255,0.5)' }}>
                        {winner === 'You' ? `Winning bid: ${playerBid} ETH` : 'Better luck next time'}
                      </div>
                      <div className="mono text-xs mt-3 px-3 py-1 rounded-full inline-block"
                        style={{ background: 'rgba(0,255,178,0.1)', color: '#00FFB2' }}>
                        PROOF: ✓ Verified on-chain
                      </div>
                    </div>
                    <button className="btn-outline-fhe w-full py-3" onClick={() => {
                      setPhase('bidding'); setBidAmount(''); setPlayerBid(null)
                      setBidders(mockBidders); setEncHash(''); setWinner('')
                    }}>
                      New Auction
                    </button>
                  </div>
                )}
              </div>

              {/* Bidder list */}
              <div className="fhe-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={16} style={{ color: '#7B2FFF' }} />
                  <span className="font-bold" style={{ color: '#E0E0FF' }}>All Bids</span>
                  <span className="mono text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(123,47,255,0.1)', color: '#7B2FFF' }}>
                    Encrypted
                  </span>
                </div>
                <div className="space-y-3">
                  {/* Player's bid */}
                  {playerBid !== null && (
                    <div className="flex items-center justify-between py-3 px-4 rounded-lg"
                      style={{ background: 'rgba(0,255,178,0.06)', border: '1px solid rgba(0,255,178,0.15)' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'rgba(0,255,178,0.2)', color: '#00FFB2' }}>Y</div>
                        <span className="mono text-sm" style={{ color: '#E0E0FF' }}>You</span>
                      </div>
                      <div className="mono text-sm" style={{ color: phase === 'settled' ? '#00FFB2' : 'rgba(224,224,255,0.3)' }}>
                        {phase === 'settled' ? `${playerBid} ETH` : <Lock size={12} />}
                      </div>
                    </div>
                  )}
                  {bidders.map((b, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-4 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1A1A3E' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                          style={{ background: '#1A1A3E', color: 'rgba(224,224,255,0.5)' }}>{i + 1}</div>
                        <span className="mono text-sm" style={{ color: 'rgba(224,224,255,0.6)' }}>{b.address}</span>
                      </div>
                      <div className="mono text-sm" style={{ color: b.revealed ? (b.amount === Math.max(...bidders.map(x => x.amount ?? 0), playerBid ?? 0) ? '#00FFB2' : 'rgba(224,224,255,0.5)') : 'rgba(224,224,255,0.25)' }}>
                        {b.revealed ? `${b.amount} ETH` : <Lock size={12} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="space-y-4">
              <div className="fhe-card p-5">
                <div className="mono text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#7B2FFF' }}>
                  HOW IT WORKS
                </div>
                <ol className="space-y-4">
                  {[
                    { n: '01', text: 'Submit encrypted bid. Your amount is FHE-sealed on-chain.' },
                    { n: '02', text: 'All bids remain hidden until reveal phase.' },
                    { n: '03', text: 'Smart contract decrypts and computes winner on-chain.' },
                    { n: '04', text: 'Cryptographic proof verifies outcome. Winner receives NFT.' },
                  ].map(s => (
                    <li key={s.n} className="flex gap-3">
                      <span className="mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: '#7B2FFF' }}>{s.n}</span>
                      <span className="text-xs leading-relaxed" style={{ color: 'rgba(224,224,255,0.55)' }}>{s.text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="fhe-card p-5">
                <div className="mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#00FFB2' }}>
                  AUCTION STATS
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Total Bidders', value: `${bidders.length + (playerBid ? 1 : 0)}` },
                    { label: 'Min Bid', value: '0.1 ETH' },
                    { label: 'Contract', value: '0x4f2b...9e1a' },
                    { label: 'Network', value: 'Fhenix Mainnet' },
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
