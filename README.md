# FHE.GG — Encrypted Gaming Hub

> The world's first blockchain gaming platform powered by Fully Homomorphic Encryption (FHE). Your hand stays hidden. The outcome stays fair. Everything on-chain.

Live: [encrypted-gaming-hub-pf37ywt8.blinkpowered.com](https://encrypted-gaming-hub-pf37ywt8.blinkpowered.com)

---

## What is FHE.GG?

FHE.GG is a dark, cyber-punk themed on-chain gaming platform built on the [Fhenix](https://fhenix.io) blockchain — the world's first EVM-compatible Fully Homomorphic Encryption chain. Players can compete in provably fair games where every move is cryptographically encrypted before it ever leaves the browser. No trusted third party. No information leakage. No cheating possible.

---

## How FHE Gaming Works

1. **Encrypt Your Move** — Your action (card play, bid, bet) is FHE-encrypted in the browser before hitting the network. Not even validators can see it.
2. **Compute On-Chain** — Fhenix smart contracts execute game logic directly on ciphertext with full cryptographic guarantees.
3. **Reveal & Verify** — On game conclusion, results are decrypted on-chain. Every outcome ships with a cryptographic proof you can independently verify.

---

## Games

### 🃏 Hidden Hands — FHE Poker
Private Texas Hold'em where your hole cards are encrypted on-chain. Bluff with mathematical certainty. Fold, check, call, or raise — all actions are FHE-sealed before submission.

### ⚔️ Secret Bids — FHE Auction
Sealed-bid NFT auction where no participant can see any other bid until the reveal phase. The smart contract computes the winner from ciphertext — zero knowledge leakage guaranteed.

### 🎲 Provably Fair Dice
Commit-reveal dice game powered by FHE on-chain randomness. Bet low (1–3), high (4–6), or exact. Every roll is verifiable and tamper-proof with a cryptographic proof attached.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS + custom cyber design system |
| Fonts | Space Grotesk + JetBrains Mono |
| Routing | TanStack Router v1 |
| Blockchain | Fhenix FHE Mainnet (EVM-compatible) |
| Encryption | Fully Homomorphic Encryption (FHE) via Fhenix |
| Smart Contracts | Solidity on Fhenix |

---

## Design System

- **Primary color:** `#00FFB2` (neon green)
- **Accent color:** `#7B2FFF` (electric purple)
- **Background:** `#050510` (deep space navy)
- **Card background:** `#0A0A1E`
- **Typography:** Space Grotesk (body) + JetBrains Mono (code/labels)
- **Style:** Dark cyber-punk with glowing effects, grid backgrounds, and FHE encryption visualizations

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, FHE flow diagram, how-it-works, game cards, Fhenix stats |
| `/games` | Game gallery — all three games with live player counts and volume |
| `/games/hidden-hands` | Playable FHE Poker with encrypted hand UI and betting actions |
| `/games/secret-bids` | FHE Auction — commit/reveal phases with on-chain proof display |
| `/games/provably-fair-dice` | Commit-reveal dice with bet types and roll history |

---

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build
```

---

## About Fhenix

Fhenix is the first EVM-compatible FHE blockchain, enabling confidential smart contracts without sacrificing composability or developer experience. It supports:

- **Provable Privacy** — Computations on encrypted data, results verifiable on-chain
- **EVM Compatibility** — Deploy standard Solidity contracts with FHE extensions
- **No Trusted Setup** — Cryptographic guarantees without relying on any third party

Docs: [docs.fhenix.io](https://docs.fhenix.io) | Website: [fhenix.io](https://fhenix.io)

---

## Repository

GitHub: [anpratama/encrypted-gaming-hub](https://github.com/anpratama/encrypted-gaming-hub)
