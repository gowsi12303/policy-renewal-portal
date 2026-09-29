import { useState } from 'react'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import PageHeader from '../../components/common/PageHeader'
import Toast from '../../components/common/Toast'
import FormField from '../../components/common/FormField'
import { brokerProfile, notificationPreferences, profileStats } from '../../data/profile'
import { useToast } from '../../hooks/useToast'
import './BrokerProfilePage.css'

const INITIAL_DETAILS = {
  name: brokerProfile.name,
  email: brokerProfile.email,
  company: brokerProfile.company,
  location: brokerProfile.location,
}

const INITIAL_PREFERENCES = Object.fromEntries(
  notificationPreferences.map((pref) => [pref.id, pref.enabled]),
)

function validate(details) {
  const errors = {}
  if (details.name.trim().length < 2) errors.name = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!details.company.trim()) errors.company = 'Enter your company name.'
  return errors
}

// Demo only: changes stay in this page's state and are not saved anywhere.
function BrokerProfilePage() {
  const [details, setDetails] = useState(INITIAL_DETAILS)
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES)
  const [errors, setErrors] = useState({})
  const { toast, showToast, closeToast } = useToast()

  const setField = (field, value) => {
    setDetails((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundErrors = validate(details)
    setErrors(foundErrors)
    const firstInvalid = ['name', 'email', 'company'].find((field) => foundErrors[field])
    if (firstInvalid) {
      document.getElementById(`profile-${firstInvalid}`)?.focus()
      return
    }
    showToast('Profile changes saved. Demo mode: nothing was stored.')
  }

  return (
    <div className="page">
      <PageHeader
        title="My Profile"
        subtitle="Manage your broker profile and portal preferences."
        meta={<strong>{brokerProfile.role} account</strong>}
      />

      <form className="page__split" onSubmit={handleSubmit} noValidate>
        <div className="page__stack">
          <Card title="Profile Details" subtitle="How you appear to clients and colleagues.">
            <div className="profile-form">
              <FormField id="profile-name" label="Full name" error={errors.name} required>
                <input
                  type="text"
                  autoComplete="name"
                  value={details.name}
                  onChange={(e) => setField('name', e.target.value)}
                />
              </FormField>
              <FormField id="profile-email" label="Email" error={errors.email} required>
                <input
                  type="email"
                  autoComplete="email"
                  value={details.email}
                  onChange={(e) => setField('email', e.target.value)}
                />
              </FormField>
              <FormField id="profile-company" label="Brokerage" error={errors.company} required>
                <input
                  type="text"
                  autoComplete="organization"
                  value={details.company}
                  onChange={(e) => setField('company', e.target.value)}
                />
              </FormField>
              <FormField id="profile-location" label="Location">
                <input
                  type="text"
                  value={details.location}
                  onChange={(e) => setField('location', e.target.value)}
                />
              </FormField>
            </div>
          </Card>

          <Card title="Notification Preferences" subtitle="Choose which alerts you receive.">
            <ul className="pref-list">
              {notificationPreferences.map((pref) => (
                <li key={pref.id} className="pref">
                  <div className="pref__text">
                    <label htmlFor={`pref-${pref.id}`} className="pref__label">
                      {pref.label}
                    </label>
                    <p id={`pref-${pref.id}-desc`} className="pref__description">
                      {pref.description}
                    </p>
                  </div>
                  <input
                    id={`pref-${pref.id}`}
                    type="checkbox"
                    role="switch"
                    className="switch"
                    checked={preferences[pref.id]}
                    onChange={(e) =>
                      setPreferences((current) => ({ ...current, [pref.id]: e.target.checked }))
                    }
                    aria-describedby={`pref-${pref.id}-desc`}
                  />
                </li>
              ))}
            </ul>
          </Card>

          <div className="profile-actions">
            <Button
              variant="ghost"
              onClick={() => {
                setDetails(INITIAL_DETAILS)
                setPreferences(INITIAL_PREFERENCES)
                setErrors({})
              }}
            >
              Discard changes
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </div>

        <Card title="Broker Account">
          <div className="profile-summary">
            <span className="profile-summary__avatar" aria-hidden="true">
              {brokerProfile.initials}
            </span>
            <p className="profile-summary__name">{details.name || brokerProfile.name}</p>
            <p className="profile-summary__role">{brokerProfile.role}</p>
          </div>

          <dl className="profile-info">
            <div>
              <dt>Brokerage</dt>
              <dd>{brokerProfile.company}</dd>
            </div>
            <div>
              <dt>Licence number</dt>
              <dd>{brokerProfile.licenceNumber}</dd>
            </div>
            <div>
              <dt>Member since</dt>
              <dd>{brokerProfile.memberSince}</dd>
            </div>
          </dl>

          <ul className="profile-stats" aria-label="Portfolio summary">
            {profileStats.map((stat) => (
              <li key={stat.label}>
                <span className="profile-stats__value">{stat.value}</span>
                <span className="profile-stats__label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </Card>
      </form>

      <Toast toast={toast} onClose={closeToast} />
    </div>
  )
}

export default BrokerProfilePage
