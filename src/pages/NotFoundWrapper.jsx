import NotFound from './NotFound.jsx'

export default function NotFoundWrapper({ code = 404 }) {
  return (
    <div>
      <NotFound />
      {code === 500 ? (
        <div className="sr-only" aria-live="polite">
          Internal Server Error
        </div>
      ) : null}
    </div>
  )
}

