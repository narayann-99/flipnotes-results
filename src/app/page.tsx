import AnimatedGrid from "@/components/AnimatedGrid";
import RollInputContainer from "@/components/RollInputContainer";

export default function Home() {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24">
      {/* Interactive mouse-tracking dots & purple glow */}
      <AnimatedGrid />

      {/* Landing Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="glass-card-premium rounded-card p-8 md:p-10 shadow-premium-lg flex flex-col items-center border border-white/[0.08]">
          {/* Badge */}
          <div className="mb-6 px-3.5 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-[9px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
            AKTU Academic Registry v1.0
          </div>

          {/* Logo / Branding */}
          <div className="text-center mb-8 space-y-2">
            <h1 className="font-sans font-extrabold text-3xl md:text-4xl tracking-[-0.03em] text-white leading-tight">
              Result Explorer
            </h1>
            <p className="font-sans text-xs md:text-sm text-text-secondary max-w-xs mx-auto leading-relaxed">
              Explore your university academic transcript in a clean, high-performance dashboard.
            </p>
          </div>

          {/* Main Input Form Container (Client Component) */}
          <RollInputContainer />
        </div>

        {/* Small detail text below card */}
        <p className="text-center text-[10px] text-text-muted font-mono tracking-[0.16em] mt-6 uppercase font-semibold">
          Enter 10-15 digit roll number to generate instant dashboard
        </p>
      </div>
    </div>
  );
}
