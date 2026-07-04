import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-2xl">
        <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">404</div>
        <h1 className="mt-3 text-4xl font-black text-white">Page not found</h1>
        <p className="mt-4 text-slate-300 leading-7">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="rounded-2xl bg-royal-gold px-6 py-3 font-bold text-royal-navy shadow-2xl shadow-royal-gold/20 hover:brightness-110 transition text-center"
          >
            Go Home
          </Link>
          <Link
            to="/help-center"
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10 transition text-center"
          >
            Visit Help Center
          </Link>
        </div>
      </div>
    </div>
  )
}

