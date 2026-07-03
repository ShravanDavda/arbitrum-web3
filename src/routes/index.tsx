import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Zap, Shield, Coins, Rocket, Layers,
  CheckCircle2, Sparkles, TrendingDown, Clock, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { BlockchainOrb } from "@/components/BlockchainOrb";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ArbChain — Understanding Web3 with Arbitrum" },
      { name: "description", content: "A premium interactive introduction to Web3, Ethereum, and Arbitrum Layer 2 scaling." },
    ],
  }),
  component: HomePage,
});

const stats = [
  { value: "$18B+", label: "TVL on Arbitrum" },
  { value: "40x", label: "Cheaper than L1" },
  { value: "250ms", label: "Median block time" },
  { value: "700+", label: "dApps deployed" },
];

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Sub-second confirmations powered by optimistic rollup batching." },
  { icon: Shield, title: "Ethereum Security", desc: "Inherits the full security of Ethereum L1 through fraud proofs." },
  { icon: Coins, title: "Ultra Low Fees", desc: "Transactions cost cents, not dollars — accessible to everyone." },
  { icon: Layers, title: "EVM Equivalent", desc: "Deploy any Solidity contract with zero code changes." },
  { icon: Rocket, title: "Instant Onboarding", desc: "Any Ethereum wallet works on Arbitrum from day one." },
  { icon: Sparkles, title: "Vibrant Ecosystem", desc: "DeFi, NFTs, gaming, and social — all thriving on Arbitrum." },
];

const timeline = [
  { year: "2015", title: "Ethereum Launches", desc: "Smart contracts arrive — but scalability is limited to ~15 TPS." },
  { year: "2018", title: "The Congestion Problem", desc: "CryptoKitties and DeFi Summer expose fee spikes above $50 per tx." },
  { year: "2021", title: "Arbitrum One Mainnet", desc: "Offchain Labs launches the first EVM-equivalent optimistic rollup." },
  { year: "2022", title: "Nitro Upgrade", desc: "10x throughput boost with WASM-based fraud proofs." },
  { year: "2023", title: "Arbitrum DAO + $ARB", desc: "Full governance decentralization with the $ARB token airdrop." },
  { year: "Today", title: "Layer 2 Standard", desc: "Powers over 50% of all Ethereum L2 activity and $18B+ in TVL." },
];

const faqs = [
  { q: "What is a Layer 2?", a: "A Layer 2 (L2) is a separate blockchain that runs on top of Ethereum, processing transactions off-chain and periodically posting proofs back to L1. This dramatically increases speed and lowers fees while inheriting Ethereum's security." },
  { q: "How is Arbitrum different from Polygon?", a: "Arbitrum is a rollup that stores its data and proofs on Ethereum, so it inherits Ethereum's security directly. Polygon PoS is a separate sidechain with its own validator set. Rollups are considered the more trustless scaling path." },
  { q: "Do I need a new wallet?", a: "No. Your existing Ethereum wallet (MetaMask, Rabby, etc.) works on Arbitrum. Just add the Arbitrum network and bridge some ETH to start using dApps." },
  { q: "What are optimistic rollups?", a: "They 'optimistically' assume transactions are valid and post them to Ethereum in batches. A 7-day challenge window lets anyone submit fraud proofs to catch invalid batches — this is what secures the system." },
  { q: "Is Arbitrum decentralized?", a: "Arbitrum is governed by the Arbitrum DAO through the $ARB token. The protocol is progressively decentralizing its sequencer and validator set over time." },
];

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Powered by Arbitrum · Layer 2 for Ethereum
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Understanding <br />
              <span className="gradient-text">Web3 with Arbitrum</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Explore how blockchains, Ethereum, and Layer 2 scaling work — through
              interactive explainers, live crypto data, and a hands-on mining
              simulator you can actually break.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/concepts"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/60 hover:-translate-y-0.5 transition-all"
              >
                Start Learning
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/simulator"
                className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold hover:border-primary/40 transition-colors"
              >
                Try the Simulator
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BlockchainOrb />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="glass rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text font-display">{s.value}</div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 mt-32">
        <SectionHeader
          eyebrow="Why Arbitrum"
          title="Everything Ethereum promises — at scale"
          desc="Arbitrum extends Ethereum with the speed and affordability real applications demand."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06 }}
              className="group relative glass rounded-2xl p-6 hover:border-primary/40 transition-all hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY L2 */}
      <section className="mx-auto max-w-7xl px-4 mt-32 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <SectionHeader
            eyebrow="The Problem"
            title="Why Ethereum needed Layer 2"
            align="left"
          />
          <div className="mt-8 space-y-4">
            {[
              { icon: TrendingDown, title: "Ethereum is limited to ~15 TPS", desc: "As demand grew, users faced $50+ transaction fees during peak times." },
              { icon: Clock, title: "Block space is a scarce resource", desc: "Every DeFi swap, NFT mint, and transfer competes for the same slots." },
              { icon: Shield, title: "Scaling can't sacrifice security", desc: "Alternatives like sidechains trade Ethereum's security for speed. Rollups don't." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 glass rounded-xl p-5">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-destructive/15 border border-destructive/30 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="The Solution"
            title="What is Arbitrum?"
            align="left"
          />
          <div className="mt-8 glass rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
            <p className="relative text-muted-foreground leading-relaxed">
              Arbitrum is an <strong className="text-foreground">Optimistic Rollup</strong> —
              a Layer 2 that batches thousands of transactions off-chain,
              executes them cheaply, and posts a compressed proof back to
              Ethereum. You get the security of Ethereum with the speed of a
              modern application.
            </p>
            <ul className="relative mt-6 space-y-3">
              {[
                "Bundles ~1,500 txs into a single Ethereum submission",
                "Fees drop from dollars to fractions of a cent",
                "Fully EVM-equivalent — Solidity works out of the box",
                "Secured by Ethereum's validators, not a separate committee",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-5xl px-4 mt-32">
        <SectionHeader
          eyebrow="Timeline"
          title="The road to scalable Ethereum"
        />
        <div className="mt-12 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent -translate-x-px" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative mb-10 md:grid md:grid-cols-2 gap-8 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}
            >
              <div className={`glass rounded-2xl p-5 ml-12 md:ml-0 [direction:ltr] ${i % 2 ? "md:mr-8" : "md:ml-8"}`}>
                <div className="text-xs font-mono text-primary">{t.year}</div>
                <h4 className="mt-1 font-semibold">{t.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </div>
              <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_rgba(120,120,255,0.8)]" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 mt-32">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => <FAQ key={i} {...f} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 mt-32">
        <div className="relative glass rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/30 blur-3xl rounded-full" />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Ready to see it work?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Try the interactive mining simulator and watch real proof-of-work
              — and immutability — happen in your browser.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/simulator"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/40"
              >
                Open Simulator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/prices" className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold">
                View Live Prices
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SectionHeader({
  eyebrow, title, desc, align = "center",
}: { eyebrow?: string; title: string; desc?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium mb-4 text-primary">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}
