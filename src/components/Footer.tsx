import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#08080A] py-10 relative z-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-sans text-xs text-text-secondary font-medium">
            &copy; {new Date().getFullYear()} FlipNotes Results. All rights reserved.
          </p>
          <p className="text-[11px] text-text-muted flex items-center gap-1.5 font-sans">
            <Sparkles className="h-3 w-3 text-brand-primary" />
            <span>Academic Performance Operating System for AKTU Students</span>
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-[11px] text-text-secondary uppercase tracking-widest font-semibold">
          <Link href="#about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="#privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="#terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="#support" className="hover:text-white transition-colors">
            Support
          </Link>
          <a
            href="https://flipnotes.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-brand-primary font-bold"
          >
            flipnotes.in
          </a>
        </div>
      </div>
    </footer>
  );
}
