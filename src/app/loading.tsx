export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#08080A]/80 backdrop-blur-md">
      <div className="flex items-center gap-3 px-5 py-3 rounded-full glass-card-premium border border-white/[0.08] shadow-premium-md">
        <div className="h-4 w-4 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" />
        <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
          Loading Registry...
        </span>
      </div>
    </div>
  );
}
