import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Pickaxe, CheckCircle2, XCircle, Hash, Cpu, Link2, Lock, Zap, RefreshCw,
} from "lucide-react";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "Blockchain Simulator — ArbChain" },
      { name: "description", content: "Interactive proof-of-work mining simulator. Mine blocks with SHA-256, then watch immutability break when you tamper with the chain." },
    ],
  }),
  component: SimulatorPage,
});

const GENESIS_HASH = "0".repeat(64);
const DIFFICULTY_PREFIX = "00"; // hash must start with this

async function sha256(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type Block = {
  index: number;
  data: string;
  nonce: number;
  prevHash: string;
  hash: string;
  mining: boolean;
  attempts: number;
};

function isValidHash(h: string) {
  return h.startsWith(DIFFICULTY_PREFIX);
}

function SimulatorPage() {
  const [blocks, setBlocks] = useState<Block[]>([
    { index: 1, data: "Alice sends 10 ARB to Bob", nonce: 0, prevHash: GENESIS_HASH, hash: "", mining: false, attempts: 0 },
    { index: 2, data: "Bob sends 5 ARB to Carol",  nonce: 0, prevHash: "",           hash: "", mining: false, attempts: 0 },
  ]);
  const mineAbort = useRef<{ [k: number]: boolean }>({});

  // Recompute all hashes whenever data / nonce / prevHash changes.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const updated = [...blocks];
      let changed = false;
      for (let i = 0; i < updated.length; i++) {
        const b = updated[i];
        const prev = i === 0 ? GENESIS_HASH : updated[i - 1].hash;
        const payload = `${b.index}|${b.data}|${b.nonce}|${prev}`;
        const h = await sha256(payload);
        if (b.prevHash !== prev || b.hash !== h) {
          updated[i] = { ...b, prevHash: prev, hash: h };
          changed = true;
        }
      }
      if (!cancelled && changed) setBlocks(updated);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    blocks[0]?.data, blocks[0]?.nonce, blocks[0]?.hash,
    blocks[1]?.data, blocks[1]?.nonce,
  ]);

  const updateBlock = (idx: number, patch: Partial<Block>) => {
    setBlocks((prev) => prev.map((b, i) => (i === idx ? { ...b, ...patch } : b)));
  };

  const mine = useCallback(async (idx: number) => {
    mineAbort.current[idx] = false;
    updateBlock(idx, { mining: true, attempts: 0 });
    const b = blocks[idx];
    const prev = idx === 0 ? GENESIS_HASH : blocks[idx - 1].hash;
    let nonce = 0;
    let attempts = 0;
    let lastYield = performance.now();
    while (!mineAbort.current[idx]) {
      const payload = `${b.index}|${b.data}|${nonce}|${prev}`;
      const h = await sha256(payload);
      attempts++;
      if (isValidHash(h)) {
        setBlocks((prevBlocks) =>
          prevBlocks.map((bb, i) =>
            i === idx ? { ...bb, nonce, hash: h, prevHash: prev, mining: false, attempts } : bb
          )
        );
        return;
      }
      nonce++;
      // Yield to the UI every ~50ms so the mining feels alive.
      const now = performance.now();
      if (now - lastYield > 50) {
        updateBlock(idx, { attempts, nonce });
        await new Promise((r) => setTimeout(r, 0));
        lastYield = now;
      }
    }
    updateBlock(idx, { mining: false });
  }, [blocks]);

  const reset = () => {
    Object.keys(mineAbort.current).forEach((k) => (mineAbort.current[+k] = true));
    setBlocks([
      { index: 1, data: "Alice sends 10 ARB to Bob", nonce: 0, prevHash: GENESIS_HASH, hash: "", mining: false, attempts: 0 },
      { index: 2, data: "Bob sends 5 ARB to Carol",  nonce: 0, prevHash: "",           hash: "", mining: false, attempts: 0 },
    ]);
  };

  const chainValid = useMemo(() => {
    return blocks.every((b, i) => {
      const prev = i === 0 ? GENESIS_HASH : blocks[i - 1].hash;
      return isValidHash(b.hash) && b.prevHash === prev;
    });
  }, [blocks]);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Interactive · SHA-256"
          title="Blockchain simulator"
          desc="Mine real blocks with proof-of-work, then edit Block 1 and watch the chain break. This is immutability, tangible."
        />

        <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
          <div className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border ${
            chainValid
              ? "bg-success/15 border-success/40 text-success"
              : "bg-destructive/15 border-destructive/40 text-destructive"
          }`}>
            {chainValid ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            Chain is {chainValid ? "VALID" : "INVALID"}
          </div>
          <div className="flex gap-2">
            <div className="glass rounded-xl px-4 py-2 text-sm">
              Difficulty: <span className="font-mono text-primary">hash starts with "{DIFFICULTY_PREFIX}"</span>
            </div>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2 text-sm font-medium hover:border-primary/40"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {blocks.map((b, i) => (
            <BlockCard
              key={i}
              block={b}
              onDataChange={(v) => updateBlock(i, { data: v, hash: "", nonce: b.nonce })}
              onMine={() => mine(i)}
              onStop={() => { mineAbort.current[i] = true; updateBlock(i, { mining: false }); }}
            />
          ))}
        </div>

        {/* explanations */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Hash, title: "Hash", desc: "A one-way fingerprint. SHA-256 turns any input into a 64-char string. Change one character → completely different hash." },
            { icon: Cpu, title: "Nonce", desc: "A 'number used once' the miner adjusts until the resulting hash meets the difficulty target." },
            { icon: Pickaxe, title: "Proof of Work", desc: "Brute-force guessing nonces is expensive. Finding a valid hash proves computation was done." },
            { icon: Zap, title: "Mining", desc: "Miners race to find that valid nonce. The winner adds the block and earns a reward." },
            { icon: Lock, title: "Immutability", desc: "Each block's hash depends on the previous one. Editing history requires re-mining every block after it." },
            { icon: Link2, title: "Chain Integrity", desc: "Any node can verify the chain by re-hashing blocks and checking the links. Tampering is instantly visible." },
          ].map((e) => (
            <div key={e.title} className="glass rounded-2xl p-5 hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                <e.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="mt-3 font-semibold">{e.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function BlockCard({
  block, onDataChange, onMine, onStop,
}: {
  block: Block;
  onDataChange: (v: string) => void;
  onMine: () => void;
  onStop: () => void;
}) {
  const valid = isValidHash(block.hash);
  return (
    <motion.div
      layout
      className={`relative glass rounded-2xl p-6 border transition-colors ${
        valid ? "border-success/40" : "border-destructive/40"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-display ${
            valid ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
          }`}>
            #{block.index}
          </div>
          <div>
            <div className="font-semibold">Block {block.index}</div>
            <div className="text-xs text-muted-foreground">
              {block.mining ? `Mining… ${block.attempts.toLocaleString()} attempts` : valid ? "Mined" : "Invalid — needs mining"}
            </div>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold border ${
          valid
            ? "bg-success/15 text-success border-success/30"
            : "bg-destructive/15 text-destructive border-destructive/30"
        }`}>
          {valid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
          {valid ? "VALID" : "INVALID"}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <Field label="Block Data">
          <textarea
            value={block.data}
            onChange={(e) => onDataChange(e.target.value)}
            rows={2}
            className="w-full rounded-lg bg-black/30 border border-border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </Field>
        <Field label="Nonce">
          <div className="rounded-lg bg-black/30 border border-border px-3 py-2 text-sm font-mono">
            {block.nonce.toLocaleString()}
          </div>
        </Field>
        <Field label="Previous Hash">
          <HashDisplay hash={block.prevHash} muted />
        </Field>
        <Field label="Current Hash">
          <HashDisplay hash={block.hash} highlight={valid} />
        </Field>
      </div>

      {block.mining && (
        <div className="mt-4 h-1 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent animate-[shine_1.4s_linear_infinite] bg-[length:200%_100%]" />
        </div>
      )}

      <div className="mt-5 flex gap-2">
        {block.mining ? (
          <button
            onClick={onStop}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-destructive/20 border border-destructive/40 text-destructive px-4 py-2.5 text-sm font-semibold"
          >
            Stop Mining
          </button>
        ) : (
          <button
            onClick={onMine}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform"
          >
            <Pickaxe className="w-4 h-4" /> Mine Block
          </button>
        )}
      </div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function HashDisplay({ hash, muted, highlight }: { hash: string; muted?: boolean; highlight?: boolean }) {
  const display = hash || "…";
  return (
    <div className={`rounded-lg bg-black/40 border border-border px-3 py-2 text-xs font-mono break-all leading-relaxed ${
      muted ? "text-muted-foreground" : ""
    }`}>
      {highlight && hash ? (
        <>
          <span className="text-success font-bold">{hash.slice(0, DIFFICULTY_PREFIX.length)}</span>
          <span>{hash.slice(DIFFICULTY_PREFIX.length)}</span>
        </>
      ) : (
        display
      )}
    </div>
  );
}
