import { useCallback, useState } from 'react'

// State for the shared <Toast> component, used the same way on every page:
//   const { toast, showToast, closeToast } = useToast()
//   showToast('Changes saved.')            // success (default)
//   showToast('Document removed.', 'info')
//   <Toast toast={toast} onClose={closeToast} />
// Each call gets a new id, so repeating the same message restarts the timer.
export function useToast() {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, tone = 'success') => {
    setToast((current) => ({ id: (current?.id ?? 0) + 1, message, tone }))
  }, [])

  const closeToast = useCallback(() => setToast(null), [])

  return { toast, showToast, closeToast }
}
