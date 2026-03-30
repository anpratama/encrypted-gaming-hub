import { Link } from '@tanstack/react-router'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#050510', borderTop: '1px solid #1A1A3E' }} className="py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded" style={{ background: '#00FFB2' }}>
            <Shield size={16} style={{ color: '#050510' }} />
          </div>
          <span className="mono font-bold text-lg" style={{ color: '#00FFB2', letterSpacing: '0.1em' }}>FHE.GG</span>
        </div>

        <p className="mono text-xs text-center" style={{ color: 'rgba(224,224,255,0.4)' }}>
          All games use Fully Homomorphic Encryption
        </p>

        <div className="flex items-center gap-6">
          <Link to="/games" className="no-underline mono text-xs transition-colors"
            style={{ color: 'rgba(224,224,255,0.5)' }}>
            Games
          </Link>
          <a href="https://docs.fhenix.io/" target="_blank" rel="noopener noreferrer"
            className="mono text-xs transition-colors" style={{ color: 'rgba(224,224,255,0.5)' }}>
            Docs
          </a>
          <a href="https://fhenix.io/" target="_blank" rel="noopener noreferrer"
            className="mono text-xs transition-colors" style={{ color: 'rgba(224,224,255,0.5)' }}>
            Fhenix.io
          </a>
        </div>
      </div>
    </footer>
  )
}
