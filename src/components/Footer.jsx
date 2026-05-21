export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/60 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="text-2xl font-black text-white">Resume PRO</div>
            <p className="max-w-md text-slate-400 leading-7">
              Modern SaaS resume builder with polished templates, intelligent content suggestions, and premium export features.
            </p>
          </div>

          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-4">Company</div>
            <div className="space-y-3 text-sm text-slate-300">
              <a className="block hover:text-royal-gold transition" href="#">About</a>
              <a className="block hover:text-royal-gold transition" href="#">Careers</a>
              <a className="block hover:text-royal-gold transition" href="#">Blog</a>
            </div>
          </div>

          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-4">Resources</div>
            <div className="space-y-3 text-sm text-slate-300">
              <a className="block hover:text-royal-gold transition" href="#">Help Center</a>
              <a className="block hover:text-royal-gold transition" href="#">Privacy</a>
              <a className="block hover:text-royal-gold transition" href="#">Terms</a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Resume PRO. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-royal-gold transition" href="#">LinkedIn</a>
            <a className="hover:text-royal-gold transition" href="#">GitHub</a>
            <a className="hover:text-royal-gold transition" href="#">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

