export default function Offline() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-border bg-card shadow-card p-10">
        <div className="text-sm uppercase tracking-[0.35em] text-primary font-black">Offline</div>
        <h1 className="mt-3 text-4xl font-black text-foreground">You're not connected</h1>
        <p className="mt-4 text-muted-foreground leading-7">
          Check your internet connection and try again.
        </p>
      </div>
    </div>
  )
}
