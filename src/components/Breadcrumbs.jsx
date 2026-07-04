import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {idx !== 0 ? <span aria-hidden="true">/</span> : null}
              {isLast ? (
                <span aria-current="page" className="text-white font-semibold">{item.label}</span>
              ) : (
                <Link to={item.to} className="hover:text-royal-gold transition">{item.label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

