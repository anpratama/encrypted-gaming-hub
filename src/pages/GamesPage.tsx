import { Link } from '@tanstack/react-router'
import { Users, Trophy, Zap } from 'lucide-react'
import Footer from '../components/Footer'

const games = [
  {
    emoji: '🃏',
    tag: 'FHE Poker',
    title: 'Hidden Hands',
    desc: 'Private poker where your hand is encrypted on-chain. Bluff with mathematical certainty. No one — not even the validators — can see your cards.',
    href: '/games/hidden-hands',
    players: 12,
    volume: '2.4 ETH',
    status: 'Live',
    color: '#00FFB2',
    features: ['Encrypted hands', 'On-chain bluffing', 'Provable fairness'],
  },
  {
    emoji: '⚔️',
    tag: 'FHE Auction',
    title: 'Secret Bids',
    desc: 'Sealed-bid auction where no one sees your offer until the reveal. Smart contract computes the winner with zero knowledge leakage.',
    href: '/games/secret-bids',
    players: 8,
    volume: '5.1 ETH',
    status: 'Live',
    color: '#7B2FFF',
    features: ['Sealed bids', 'Fair winner selection', 'Instant settlement'],
  },
  {
    emoji: '🎲',
    tag: 'FHE Dice',
    title: 'Provably Fair Dice',
    desc: 'Commit-reveal dice with on-chain proofs. Every roll is verifiable and tamper-proof. The house cannot cheat — it is mathematically impossible.',
    href: '/games/provably-fair-dice',
    players: 3,
    volume: '0.8 ETH',
    status: 'Live',
    color: '#00FFB2',
    features: ['Commit-reveal', 'On-chain proofs', 'Instant payouts'],
  },
]

export default function GamesPage() {
  return (
    <div style={{ background: '#050510', minHeight: '100vh' }} className="fhe-grid-bg">
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
              style={{ background: 'rgba(0,255,178,0.06)', border: '1px solid rgba(0,255,178,0.2)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00FFB2' }} />
              <span className="mono text-xs font-semibold" style={{ color: '#00FFB2' }}>3 Games Live</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#E0E0FF' }}>
              Choose Your Game
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(224,224,255,0.55)' }}>
              Every game runs on Fhenix FHE. Your moves are always encrypted. The outcomes are always fair.
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {games.map(game => (
              <div key={game.title} className="fhe-card p-6 flex flex-col group">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{game.emoji}</div>
                  <span className="mono text-xs px-2 py-1 rounded"
                    style={{ background: 'rgba(0,255,178,0.1)', color: '#00FFB2' }}>
                    ● {game.status}
                  </span>
                </div>

                <div className="mono text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: game.color }}>{game.tag}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#E0E0FF' }}>{game.title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'rgba(224,224,255,0.55)' }}>{game.desc}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {game.features.map(f => (
                    <span key={f} className="mono text-xs px-2 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1A1A3E', color: 'rgba(224,224,255,0.5)' }}>
                      {f}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-5 py-3"
                  style={{ borderTop: '1px solid #1A1A3E', borderBottom: '1px solid #1A1A3E' }}>
                  <div className="flex items-center gap-1.5">
                    <Users size={14} style={{ color: 'rgba(224,224,255,0.4)' }} />
                    <span className="mono text-xs" style={{ color: 'rgba(224,224,255,0.4)' }}>{game.players} playing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Trophy size={14} style={{ color: 'rgba(224,224,255,0.4)' }} />
                    <span className="mono text-xs" style={{ color: 'rgba(224,224,255,0.4)' }}>{game.volume} volume</span>
                  </div>
                </div>

                <Link to={game.href as any} className="no-underline">
                  <button className="btn-fhe w-full flex items-center justify-center gap-2">
                    <Zap size={16} /> Play Now
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="rounded-2xl p-8 text-center" style={{ background: '#0A0A1E', border: '1px solid #1A1A3E' }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#E0E0FF' }}>Want to build on Fhenix?</h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(224,224,255,0.5)' }}>
              Explore the docs and start building confidential smart contracts today.
            </p>
            <a href="https://docs.fhenix.io/" target="_blank" rel="noopener noreferrer">
              <button className="btn-outline-fhe">Explore Docs →</button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
