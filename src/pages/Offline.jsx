export default function Offline() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-2xl">
        <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Offline</div>
        <h1 className="mt-3 text-4xl font-black text-white">You’re not connected</h1>
        <p className="mt-4 text-slate-300 leading-7">
          Check your internet connection and try again.
        </p>
      </div>
    </div>
  )
}

