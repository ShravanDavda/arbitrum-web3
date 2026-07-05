import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Live Crypto Prices — ArbChain" },
      { name: "description", content: "Real-time prices for Bitcoin, Ethereum, Arbitrum, Polygon and Solana via the CoinGecko public API." },
    ],
  }),
  component: PricesPage,
});

type CoinMeta = { id: string; symbol: string; name: string; color: string };
const COINS: CoinMeta[] = [
  { id: "bitcoin",   symbol: "BTC",   name: "Bitcoin",  color: "#F7931A" },
  { id: "ethereum",  symbol: "ETH",   name: "Ethereum", color: "#627EEA" },
  { id: "arbitrum",  symbol: "ARB",   name: "Arbitrum", color: "#28A0F0" },
  { id: "polygon-ecosystem-token", symbol: "POL", name: "Polygon", color: "#8247E5" },
  { id: "solana",    symbol: "SOL",   name: "Solana",   color: "#14F195" },
];

type PriceEntry = { usd?: number; usd_24h_change?: number };
type PriceMap = Record<string, PriceEntry | undefined>;

function PricesPage() {
  const [prices, setPrices] = useState<PriceMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ids = COINS.map((c) => c.id).join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = (await res.json()) as PriceMap;
      setPrices(data);
      setUpdatedAt(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load prices");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Live Data · CoinGecko"
          title="Live crypto prices"
          desc="Real-time market data streamed from CoinGecko's public API. Click refresh to fetch the latest."
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            {updatedAt ? (
              <>Last updated <span className="text-foreground font-mono">{updatedAt.toLocaleTimeString()}</span></>
            ) : (
              "Fetching latest prices…"
            )}
          </div>
          <button
            onClick={fetchPrices}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 disabled:opacity-60 hover:-translate-y-0.5 transition-transform"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mt-6 glass rounded-xl p-4 flex items-start gap-3 border-destructive/40">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-destructive">Couldn't load prices</p>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COINS.map((coin, i) => {
            const p = prices[coin.id];
            const showSkeleton = loading && !p;
            return (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative glass rounded-2xl p-6 hover:border-primary/40 transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
                  style={{ background: coin.color }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm"
                        style={{ background: `${coin.color}25`, color: coin.color, border: `1px solid ${coin.color}55` }}
                      >
                        {coin.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <div className="font-semibold">{coin.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{coin.symbol}</div>
                      </div>
                    </div>
                  </div>

                  {showSkeleton ? (
                    <div className="mt-6 space-y-3">
                      <div className="h-9 w-3/4 rounded-md bg-white/5 animate-pulse" />
                      <div className="h-5 w-1/3 rounded-md bg-white/5 animate-pulse" />
                    </div>
                  ) : p && typeof p.usd === "number" ? (
                    <>
                      <div className="mt-6 text-3xl font-bold font-display tracking-tight">
                        ${p.usd.toLocaleString(undefined, {
                          minimumFractionDigits: p.usd < 10 ? 4 : 2,
                          maximumFractionDigits: p.usd < 10 ? 4 : 2,
                        })}
                      </div>
                      <ChangeBadge change={p.usd_24h_change ?? 0} />
                    </>
                  ) : (
                    <div className="mt-6 text-sm text-muted-foreground">Data unavailable.</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Data provided by <a href="https://www.coingecko.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">CoinGecko</a>. No API key required.
        </p>
      </section>
    </div>
  );
}

function ChangeBadge({ change }: { change: number }) {
  const positive = change >= 0;
  const Icon = positive ? TrendingUp : TrendingDown;
  return (
    <div className={`mt-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-semibold ${
      positive
        ? "bg-success/15 text-success border border-success/30"
        : "bg-destructive/15 text-destructive border border-destructive/30"
    }`}>
      <Icon className="w-3.5 h-3.5" />
      {positive ? "+" : ""}{change.toFixed(2)}%
      <span className="text-xs opacity-70 font-normal ml-1">24h</span>
    </div>
  );
}
