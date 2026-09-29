import { useEffect } from 'react'
import Icon from './Icon'
import './Toast.css'

const AUTO_HIDE_MS = 4000

// toast: { id, message, tone: 'success' | 'info' } or null.
// The live region is always rendered so screen readers announce new messages.
function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(onClose, AUTO_HIDE_MS)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div className={`toast toast--${toast.tone ?? 'success'}`}>
          <Icon name={toast.tone === 'info' ? 'bell' : 'check'} className="toast__icon" />
          <p className="toast__message">{toast.message}</p>
          <button type="button" className="toast__close" onClick={onClose} aria-label="Dismiss notification">
            <Icon name="close" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Toast
