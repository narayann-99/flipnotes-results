"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Results", href: "/" },
    { label: "About", href: "#about" },
    { label: "Privacy", href: "#privacy" },
    { label: "Support", href: "#support" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#08080A]/75 backdrop-blur-[24px] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group relative">
            <span className="font-sans font-black text-lg tracking-[-0.03em] text-white">
              Flip<span className="text-brand-primary transition-colors duration-300 group-hover:text-brand-secondary">Notes</span>
            </span>
            <span className="text-[9px] font-mono tracking-[0.18em] text-text-muted border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 rounded-md uppercase font-bold">
              RESULTS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-white transition-colors p-2 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06]"
              aria-label="GitHub Repository"
            >
              <Github className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-[9px] font-mono font-bold tracking-[0.18em] text-text-secondary uppercase select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
              SYSTEM ACTIVE
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-full bg-[#0E0E12] border-l border-card-border p-6 flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-sans font-black text-lg tracking-tight text-white">
                    Flip<span className="text-brand-primary">Notes</span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-text-secondary hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base font-bold text-text-secondary hover:text-white transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4 border-t border-card-border pt-6">
                <div className="flex items-center gap-2 text-xs font-bold text-text-secondary uppercase tracking-widest">
                  <span className="h-2 w-2 rounded-full bg-brand-primary" />
                  Dark Mode Enabled
                </div>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-white transition-colors py-2 uppercase tracking-widest"
                >
                  <Github className="h-5 w-5" />
                  GitHub Repository
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
