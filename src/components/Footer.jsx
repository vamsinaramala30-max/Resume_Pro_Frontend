import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-[var(--section-spacing-desktop)] border-t border-border bg-surface-elevated/30 py-12">
      <div className="layout-container">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <Link to="/" className="text-h4 font-black text-foreground flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm">R</span>
              Resume PRO
            </Link>
            <p className="max-w-md text-foreground/70 leading-relaxed text-sm">
              Modern SaaS resume builder with polished templates, intelligent content suggestions, and premium export features.
            </p>
          </div>

          <div>
            <div className="text-caption uppercase tracking-widest text-foreground/50 font-bold mb-4">Company</div>
            <div className="space-y-3 text-sm text-foreground/70 font-medium">
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">About</a>
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Careers</a>
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Blog</a>
            </div>
          </div>

          <div>
            <div className="text-caption uppercase tracking-widest text-foreground/50 font-bold mb-4">Resources</div>
            <div className="space-y-3 text-sm text-foreground/70 font-medium">
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Help Center</a>
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Privacy</a>
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Terms</a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-foreground/50 sm:flex-row sm:items-center sm:justify-between font-medium">
          <div>© {new Date().getFullYear()} Resume PRO. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">LinkedIn</a>
            <a className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">GitHub</a>
            <a className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
