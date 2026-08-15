export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="hidden lg:flex lg:w-[380px] xl:w-[420px] flex-shrink-0 flex-col justify-between p-10 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #1a3de4 0%, #0d1f7a 60%, #0a0f2e 100%)",
        }}
      >
        {/* Geometric overlay lines */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.05) 40px,
                rgba(255,255,255,0.05) 80px
              )`,
            }}
          />
        </div>
        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #4d7af5, transparent)",
          }}
        />
        <div
          className="absolute bottom-40 -left-10 w-48 h-48 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #4d7af5, transparent)",
          }}
        />

        {/* Brand */}
        <div className="relative z-10">
          <h1 className="text-white font-bold text-3xl xl:text-4xl leading-tight tracking-tight">
            Tuma
            <br />
            Command Center
          </h1>
          <div className="mt-3 w-8 h-0.5 bg-white opacity-60" />
        </div>

        {/* Footer copy */}
        <div className="relative z-10">
          <p className="text-blue-200 text-sm leading-relaxed opacity-80 mb-8">
            Access the architectural ledger of regional financial operations.
            Professional grade security for the next generation of African
            fintech.
          </p>
          <div className="flex items-center gap-2 text-blue-300 text-xs font-medium tracking-widest uppercase opacity-70">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Operator V2.4
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-between bg-slate-50 relative">
        {children}

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-4 text-xs text-slate-400 border-t border-slate-200">
          <div className="flex items-center gap-6">
            <span className="font-medium tracking-wide">GDPR COMPLIANT</span>
            <span className="font-medium tracking-wide">PCI-DSS L1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
            <span className="font-medium tracking-wide">ENGLISH (KE)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
