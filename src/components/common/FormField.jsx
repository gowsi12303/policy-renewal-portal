import { cloneElement } from 'react'
import './FormField.css'

// Label + control + optional hint/error. Wires the id, aria-invalid and
// aria-describedby onto the single child control, so callers don't repeat it.
function FormField({ id, label, error, hint, required = false, className = '', children }) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ')

  return (
    <div className={`form-field ${className}`.trim()}>
      <label htmlFor={id}>
        {label}
        {required && (
          <span className="form-field__required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {cloneElement(children, {
        id,
        required,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy || undefined,
      })}
      {hint && !error && (
        <p id={`${id}-hint`} className="form-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="form-field__error">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
