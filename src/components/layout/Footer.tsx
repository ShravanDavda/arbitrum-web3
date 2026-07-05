import { Link } from "@tanstack/react-router";
import { Blocks, Github, Twitter, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-1.5">
              <Blocks className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-lg">
              Arb<span className="gradient-text">Chain</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            An educational Web3 experience built for the Arbitrum Builder Pods
            by LamprosDAO. Learn blockchain fundamentals through interactive
            explainers, live data, and a hands-on mining simulator.
          </p>
          <div className="mt-6 text-sm">
            <p className="font-semibold text-foreground">Shravan Davda</p>
            <p className="text-muted-foreground">MSU FTE CSE · Arbitrum Builder Pods</p>
            <a
              href="https://github.com/ShravanDavda"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 mt-1 text-primary hover:text-accent transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              github.com/ShravanDavda
            </a>
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href="https://github.com/ShravanDavda"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/arbitrum"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:text-primary transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/concepts" className="hover:text-foreground">Concepts</Link></li>
            <li><Link to="/prices" className="hover:text-foreground">Live Prices</Link></li>
            <li><Link to="/simulator" className="hover:text-foreground">Simulator</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="https://arbitrum.io" target="_blank" rel="noreferrer" className="hover:text-foreground inline-flex items-center gap-1">
                Arbitrum <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://ethereum.org" target="_blank" rel="noreferrer" className="hover:text-foreground inline-flex items-center gap-1">
                Ethereum <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://www.coingecko.com" target="_blank" rel="noreferrer" className="hover:text-foreground inline-flex items-center gap-1">
                CoinGecko <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ArbChain · Built by a Builder Pods participant</p>
          <p>Arbitrum Builder Pods · LamprosDAO Batch</p>
        </div>
      </div>
    </footer>
  );
}
