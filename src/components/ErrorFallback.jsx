import { useLocation, Link } from 'react-router-dom'

export default function ErrorFallback({ error, errorInfo, onRetry }) {
  const location = useLocation()

  const message = error?.message || 'Something went wrong.'
  const hasRetry = typeof onRetry === 'function'

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-3xl border border-border bg-card shadow-card p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center border border-error/20">
            <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">We encountered an unexpected error</p>
          </div>
        </div>

        <p className="mt-4 text-foreground/80 leading-7">{message}</p>

        {errorInfo?.componentStack && (
          <details className="mt-4 text-xs text-muted-foreground">
            <summary className="cursor-pointer hover:text-foreground transition">Technical Details</summary>
            <pre className="mt-2 p-3 bg-surface-elevated rounded-xl overflow-x-auto whitespace-pre-wrap break-all border border-border">
              {errorInfo.componentStack}
            </pre>
          </details>
        )}

        <p className="mt-4 text-muted-foreground text-sm break-all">Location: {location.pathname}</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {hasRetry ? (
            <button
              type="button"
              className="rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-elevation-2 hover:brightness-110 transition"
              onClick={onRetry}
            >
              Try Again
            </button>
          ) : (
            <button
              type="button"
              className="rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-elevation-2 hover:brightness-110 transition"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          )}
          <Link
            to="/"
            className="rounded-2xl border border-border bg-surface-elevated px-6 py-3 font-bold text-foreground hover:bg-surface-hover transition text-center"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
