import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Globe, Users, Bitcoin, Zap, Key, Lock, Wallet, Landmark,
  Database, Link2, FileCode2, Vote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/concepts")({
  head: () => ({
    meta: [
      { title: "Web3 Concepts — ArbChain" },
      { name: "description", content: "Visual, side-by-side comparisons of the core Web3 concepts: Web2 vs Web3, Ethereum vs Bitcoin, keys, wallets, and more." },
    ],
  }),
  component: ConceptsPage,
});

type Row = { label: string; a: string; b: string };
type Comparison = {
  title: string;
  desc: string;
  left: { title: string; icon: LucideIcon; tone: "muted" | "warn" };
  right: { title: string; icon: LucideIcon; tone: "primary" | "accent" };
  rows: Row[];
};

const comparisons: Comparison[] = [
  {
    title: "Web2 vs Web3",
    desc: "The shift from platform-owned data to user-owned assets.",
    left: { title: "Web2", icon: Globe, tone: "muted" },
    right: { title: "Web3", icon: Users, tone: "primary" },
    rows: [
      { label: "Ownership", a: "Platforms own your data", b: "You own your keys and assets" },
      { label: "Login", a: "Email + password", b: "Cryptographic wallet signature" },
      { label: "Payments", a: "Card processors, 2–5% fees", b: "Native, peer-to-peer, on-chain" },
      { label: "Governance", a: "Company decides", b: "Token-holder voting via DAOs" },
      { label: "Trust model", a: "Trust the company", b: "Trust the math" },
    ],
  },
  {
    title: "Ethereum vs Bitcoin",
    desc: "Two foundational chains built for very different purposes.",
    left: { title: "Bitcoin", icon: Bitcoin, tone: "warn" },
    right: { title: "Ethereum", icon: Zap, tone: "accent" },
    rows: [
      { label: "Purpose", a: "Digital gold & payments", b: "Programmable world computer" },
      { label: "Smart contracts", a: "Limited scripting", b: "Full Turing-complete EVM" },
      { label: "Consensus", a: "Proof of Work", b: "Proof of Stake" },
      { label: "Block time", a: "~10 minutes", b: "~12 seconds" },
      { label: "Supply", a: "Capped at 21M", b: "Uncapped, deflationary via EIP-1559" },
    ],
  },
  {
    title: "Public Key vs Private Key",
    desc: "Asymmetric cryptography — the heart of every wallet.",
    left: { title: "Public Key", icon: Key, tone: "primary" as never as "muted" },
    right: { title: "Private Key", icon: Lock, tone: "accent" },
    rows: [
      { label: "Share it?", a: "Yes — it's your address", b: "NEVER — it's your password" },
      { label: "Purpose", a: "Receive funds & verify signatures", b: "Sign transactions & prove ownership" },
      { label: "If leaked", a: "No risk", b: "All funds can be stolen" },
      { label: "Derived from", a: "The private key", b: "Random entropy / seed phrase" },
    ],
  },
  {
    title: "Blockchain vs Traditional Database",
    desc: "Both store data — but with very different trust guarantees.",
    left: { title: "Traditional DB", icon: Database, tone: "muted" },
    right: { title: "Blockchain", icon: Link2, tone: "primary" },
    rows: [
      { label: "Control", a: "Single admin / company", b: "Distributed across nodes" },
      { label: "Mutability", a: "CRUD — edit anything", b: "Append-only, cryptographically linked" },
      { label: "Trust", a: "Trust the operator", b: "Verify with cryptography" },
      { label: "Downtime", a: "Depends on servers", b: "24/7, no single point of failure" },
      { label: "Speed", a: "Thousands of TPS", b: "Slower, but globally verifiable" },
    ],
  },
  {
    title: "Wallet vs Bank Account",
    desc: "Self-custody changes the relationship between you and your money.",
    left: { title: "Bank Account", icon: Landmark, tone: "muted" },
    right: { title: "Crypto Wallet", icon: Wallet, tone: "accent" },
    rows: [
      { label: "Who holds funds", a: "The bank", b: "You — via your private key" },
      { label: "Access hours", a: "Business hours + limits", b: "24/7 globally" },
      { label: "Recovery", a: "Reset password via bank", b: "Seed phrase — no reset possible" },
      { label: "Reversibility", a: "Chargebacks possible", b: "Transactions are final" },
    ],
  },
  {
    title: "Smart Contracts vs Legal Contracts",
    desc: "Code that enforces itself, versus paper that needs courts.",
    left: { title: "Legal Contract", icon: FileCode2, tone: "muted" },
    right: { title: "Smart Contract", icon: FileCode2, tone: "primary" },
    rows: [
      { label: "Enforcement", a: "Courts and lawyers", b: "Automatic on-chain execution" },
      { label: "Cost", a: "Legal fees", b: "Gas fees only" },
      { label: "Speed", a: "Weeks to months", b: "Seconds to finalize" },
      { label: "Trust", a: "Trust the counterparty & court", b: "Trust the code (audited)" },
    ],
  },
  {
    title: "Proof of Work vs Proof of Stake",
    desc: "Two mechanisms for reaching agreement without a central authority.",
    left: { title: "Proof of Work", icon: Zap, tone: "warn" },
    right: { title: "Proof of Stake", icon: Vote, tone: "accent" },
    rows: [
      { label: "Security via", a: "Computational power", b: "Staked capital" },
      { label: "Energy use", a: "Very high", b: "~99.95% lower" },
      { label: "Barrier", a: "Buy ASIC hardware", b: "Stake tokens" },
      { label: "Used by", a: "Bitcoin", b: "Ethereum, Solana, Arbitrum (via ETH)" },
    ],
  },
];

function tone(t: string) {
  if (t === "primary") return "from-primary/25 to-primary/5 border-primary/30 text-primary";
  if (t === "accent") return "from-accent/25 to-accent/5 border-accent/30 text-accent";
  if (t === "warn") return "from-orange-500/25 to-orange-500/5 border-orange-500/30 text-orange-400";
  return "from-white/10 to-white/0 border-white/15 text-muted-foreground";
}

function ConceptsPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="The Fundamentals"
          title="Web3 concepts, side by side"
          desc="No jargon dumps. Every idea explained through a direct comparison you can actually reason about."
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 mt-16 space-y-8">
        {comparisons.map((c, idx) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-6 sm:p-8 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs font-mono text-primary">Concept {String(idx + 1).padStart(2, "0")}</div>
                <h3 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xl">{c.desc}</p>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {[c.left, c.right].map((side) => (
                <div key={side.title} className={`rounded-2xl border bg-gradient-to-br p-5 ${tone(side.tone)}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center">
                      <side.icon className="w-5 h-5" />
                    </div>
                    <div className="text-lg font-semibold text-foreground">{side.title}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground w-1/4">Aspect</th>
                    <th className="text-left px-4 py-3 font-semibold">{c.left.title}</th>
                    <th className="text-left px-4 py-3 font-semibold">{c.right.title}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((r, i) => (
                    <tr key={r.label} className={i % 2 ? "bg-white/[0.02]" : ""}>
                      <td className="px-4 py-3 text-muted-foreground font-medium">{r.label}</td>
                      <td className="px-4 py-3">{r.a}</td>
                      <td className="px-4 py-3">{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
