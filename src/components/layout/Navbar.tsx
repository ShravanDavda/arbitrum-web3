import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Blocks, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/concepts", label: "Concepts" },
  { to: "/prices", label: "Live Prices" },
  { to: "/simulator", label: "Simulator" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`glass rounded-2xl flex items-center justify-between px-4 sm:px-6 h-14 transition-all ${
            scrolled ? "shadow-elegant" : ""
          }`}
          aria-label="Main navigation"
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-60 group-hover:opacity-100 transition" />
              <div className="relative bg-gradient-to-br from-primary to-accent rounded-lg p-1.5">
                <Blocks className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
              </div>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Arb<span className="gradient-text">Chain</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors [&.active]:text-foreground group"
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </Link>
            ))}
          </div>

          <a
            href="https://arbitrum.io"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-primary to-accent px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all hover:-translate-y-0.5"
          >
            Launch App
          </a>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2 glass rounded-2xl p-2 flex flex-col"
            >
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 [&.active]:text-foreground [&.active]:bg-primary/10"
                >
                  {l.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
