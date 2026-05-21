import { useEffect, useState } from 'react'
import Toast from './Toast.jsx'

export default function ToastLayer({ toasts, onRemove }) {
  // This wrapper keeps render stable and allows future improvements
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    setEnabled(true)
  }, [])
  if (!enabled) return null
  return <Toast toasts={toasts} onRemove={onRemove} />
}

