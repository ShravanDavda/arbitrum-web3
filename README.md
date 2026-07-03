# ArbChain — Understanding Web3 with Arbitrum

A premium, production-quality educational Web3 website built for the **Arbitrum Builder Pods by LamprosDAO** assignment. It combines a landing page, visual concept explainers, a live crypto price dashboard, and an interactive proof-of-work blockchain simulator — all in a single cohesive dark-themed experience inspired by Stripe, Coinbase, Vercel, and Ethereum.org.

## ✨ Features

- 🎨 Futuristic dark theme with glassmorphism, gradient blobs and animated grid background
- 🧭 Sticky glass navigation with animated active-page indicator
- 📈 Scroll progress bar and floating back-to-top button
- 🌀 Framer Motion page transitions, hover, and reveal animations
- 🧱 Animated blockchain orb illustration on the hero
- 🔗 Live crypto prices from CoinGecko (no API key)
- ⛏️ Real SHA-256 proof-of-work mining simulator using the Web Crypto API
- 💥 Live chain-integrity feedback — edit Block 1 and Block 2 instantly turns INVALID
- ♿ Semantic HTML, keyboard focus states, ARIA labels
- 📱 Fully responsive from mobile to ultra-wide

## 🧰 Tech Stack

- **React 19** + **TypeScript**
- **Vite** + **TanStack Start / TanStack Router** (file-based routing)
- **Tailwind CSS v4** (CSS-first design tokens)
- **shadcn/ui** primitives
- **Framer Motion** for animations
- **Lucide React** icons
- **CoinGecko public API** for market data
- **Web Crypto API** (`crypto.subtle.digest`) for SHA-256

## 📄 Pages

| Route | Page | What it does |
|-------|------|--------------|
| `/` | **Home** | Hero, animated blockchain visual, stats, features, "Why Ethereum needed L2", "What is Arbitrum?", timeline, FAQ, CTA. |
| `/concepts` | **Concepts** | 7 side-by-side comparison cards + tables: Web2 vs Web3, ETH vs BTC, Public vs Private keys, Blockchain vs DB, Wallet vs Bank, Smart vs Legal Contracts, PoW vs PoS. |
| `/prices` | **Live Prices** | Live BTC, ETH, ARB, MATIC, SOL prices with 24h change, green/red trend indicators, loading skeletons, refresh button, last-updated timestamp. |
| `/simulator` | **Blockchain Simulator** | Two linked blocks. Edit data → mine (nonce increments until SHA-256 starts with `00`) → chain visualizes VALID / INVALID in real time. Tampering with Block 1 immediately invalidates Block 2. |

## 🚀 Getting Started

```bash
# install dependencies
npm install    # or: bun install

# start the dev server
npm run dev    # http://localhost:8080

# production build
npm run build
npm run preview
```

## 📁 Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # sticky glass navbar with animated active pill
│   │   ├── Footer.tsx           # site footer with links + credits
│   │   ├── Background.tsx       # animated gradient blobs + grid
│   │   ├── ScrollProgress.tsx   # top progress bar
│   │   └── BackToTop.tsx        # floating scroll-to-top button
│   ├── BlockchainOrb.tsx        # animated hero illustration
│   └── ui/                      # shadcn primitives
├── routes/
│   ├── __root.tsx               # shell, providers, transitions
│   ├── index.tsx                # Home
│   ├── concepts.tsx             # Concepts
│   ├── prices.tsx               # Live Prices
│   └── simulator.tsx            # Blockchain Simulator
├── styles.css                   # Tailwind v4 design tokens
└── router.tsx
```

## 🔮 Future Improvements

- Persist mined blocks in `localStorage` and let users extend the chain beyond two blocks
- Add sparkline mini-charts to the price cards
- Add a wallet-connect demo (WalletConnect / RainbowKit) that reads an on-chain balance from Arbitrum
- Add a dark/light theme toggle
- Deploy to Vercel with edge caching for the CoinGecko fetch

## 👤 Credits

Built as part of the **Arbitrum Builder Pods** program by **LamprosDAO**. Educational content written from first principles based on the program materials.
