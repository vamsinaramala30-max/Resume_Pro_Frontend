export default function PolicyTemplate({ title, effective, children }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black">{title}</h1>
        {effective ? <p className="mt-2 text-slate-400 text-sm">Effective: {effective}</p> : null}
        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl">
          <div className="prose prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

