import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-border bg-card shadow-card p-10">
        <div className="text-sm uppercase tracking-[0.35em] text-primary font-black">404</div>
        <h1 className="mt-3 text-4xl font-black text-foreground">Page not found</h1>
        <p className="mt-4 text-muted-foreground leading-7">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-elevation-2 hover:brightness-110 transition text-center"
          >
            Go Home
          </Link>
          <Link
            to="/help-center"
            className="rounded-2xl border border-border bg-surface-elevated px-6 py-3 font-bold text-foreground hover:bg-surface-hover transition text-center"
          >
            Visit Help Center
          </Link>
        </div>
      </div>
    </div>
  )
}
