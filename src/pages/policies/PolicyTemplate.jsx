export default function PolicyTemplate({ title, effective, children }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-foreground">{title}</h1>
        {effective ? <p className="mt-2 text-muted-foreground text-sm">Effective: {effective}</p> : null}
        <div className="mt-8 rounded-3xl border border-border bg-card shadow-card p-6">
          <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
