import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X, Shield } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ background: 'rgba(5,5,16,0.8)', borderBottom: '1px solid #1A1A3E', backdropFilter: 'blur(12px)' }}
      className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="flex items-center justify-center w-8 h-8 rounded" style={{ background: '#00FFB2' }}>
            <Shield size={16} style={{ color: '#050510' }} />
          </div>
          <span className="mono font-bold text-lg" style={{ color: '#00FFB2', letterSpacing: '0.1em' }}>FHE.GG</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/games" className="no-underline text-sm font-medium transition-colors"
            style={{ color: 'rgba(224,224,255,0.7)' }}
            activeProps={{ style: { color: '#00FFB2' } }}>
            Games
          </Link>
          <a href="/#how-it-works" className="text-sm font-medium transition-colors"
            style={{ color: 'rgba(224,224,255,0.7)' }}>
            How It Works
          </a>
          <a href="https://docs.fhenix.io/" target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium transition-colors"
            style={{ color: 'rgba(224,224,255,0.7)' }}>
            Fhenix Docs
          </a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00FFB2' }}></div>
            <span className="mono text-xs" style={{ color: '#00FFB2' }}>Mainnet Live</span>
          </div>
          <Link to="/games">
            <button className="btn-fhe text-sm py-2 px-4">Launch App</button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: '#E0E0FF' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4" style={{ borderTop: '1px solid #1A1A3E' }}>
          <Link to="/games" className="no-underline text-sm font-medium py-2" style={{ color: '#E0E0FF' }} onClick={() => setOpen(false)}>Games</Link>
          <a href="/#how-it-works" className="text-sm font-medium py-2" style={{ color: '#E0E0FF' }} onClick={() => setOpen(false)}>How It Works</a>
          <a href="https://docs.fhenix.io/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium py-2" style={{ color: '#E0E0FF' }}>Fhenix Docs</a>
          <Link to="/games" onClick={() => setOpen(false)}>
            <button className="btn-fhe w-full">Launch App</button>
          </Link>
        </div>
      )}
    </nav>
  )
}
