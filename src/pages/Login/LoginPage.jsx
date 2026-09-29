import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import './LoginPage.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Shown on the brand panel. Mock figures for the demo.
const HIGHLIGHTS = [
  { value: '1,284', label: 'Policies due for renewal this quarter' },
  { value: '92%', label: 'Average broker retention rate' },
  { value: '48h', label: 'Faster renewal turnaround' },
]

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="m8.5 12 2.5 2.5 4.5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EyeIcon({ crossed }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      {crossed && (
        <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function validate(email, password) {
  const errors = {}
  if (!email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Enter a valid email address, e.g. name@brokerage.com.'
  }
  if (!password) {
    errors.password = 'Enter your password.'
  }
  return errors
}

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundErrors = validate(email, password)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return

    // Demo only: no real authentication. Pause briefly, then enter the portal.
    setIsSubmitting(true)
    setTimeout(() => navigate(ROUTES.DASHBOARD), 600)
  }

  const handleForgotPassword = () => {
    setNotice('Password reset is not available in this demo. Use any email and password to sign in.')
  }

  return (
    <div className="login-page">
      <section className="login-brand" aria-labelledby="brand-title">
        <div className="login-brand__inner">
          <div className="login-brand__logo">
            <span className="login-brand__mark">
              <ShieldIcon />
            </span>
            <div>
              <p id="brand-title" className="login-brand__name">
                Policy Renewal Intelligence
              </p>
              <p className="login-brand__subtitle">Broker Self-Serve Portal</p>
            </div>
          </div>

          <h1 className="login-brand__headline">
            Renew smarter.
            <br />
            Retain every client.
          </h1>
          <p className="login-brand__text">
            Track upcoming renewals, spot at-risk policies early and manage your book of business
            from one secure workspace.
          </p>

          <ul className="login-brand__highlights">
            {HIGHLIGHTS.map((item) => (
              <li key={item.label}>
                <span className="login-brand__value">{item.value}</span>
                <span className="login-brand__label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-card">
          <h2 id="login-title" className="login-card__title">
            Sign in to your account
          </h2>
          <p className="login-card__intro">Welcome back. Enter your broker credentials to continue.</p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@brokerage.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="login-field__error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="login-field__password">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="login-field__toggle"
                  onClick={() => setShowPassword((shown) => !shown)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  aria-controls="password"
                >
                  <EyeIcon crossed={showPassword} />
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="login-field__error">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="login-form__row">
              <label className="login-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="login-link" onClick={handleForgotPassword}>
                Forgot password?
              </button>
            </div>

            {notice && (
              <p className="login-notice" role="status">
                {notice}
              </p>
            )}

            <button type="submit" className="login-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="login-secure">
            <LockIcon />
            Secure broker access · Demo environment
          </p>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
