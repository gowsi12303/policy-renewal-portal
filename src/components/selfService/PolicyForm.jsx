import { useState } from 'react'
import {
  INSURANCE_PROVIDERS,
  POLICY_STATUSES,
  POLICY_TYPES,
  RISK_OPTIONS,
  existingPolicy,
  newPolicy,
} from '../../data/selfService'
import { formatCurrency } from '../../utils/formatters'
import Button from '../common/Button'
import Card from '../common/Card'
import FormField from '../common/FormField'
import './selfService.css'

// Field order is used to focus the first invalid field after submit.
const FIELD_ORDER = [
  'policyId',
  'customer',
  'type',
  'provider',
  'startDate',
  'expiryDate',
  'premium',
  'coverage',
  'risk',
  'status',
]

function validate(values) {
  const errors = {}
  if (!/^POL-\d{5}$/.test(values.policyId.trim())) {
    errors.policyId = 'Use the format POL-12345.'
  }
  if (values.customer.trim().length < 2) errors.customer = 'Enter the customer name.'
  if (!values.type) errors.type = 'Select a policy type.'
  if (!values.provider) errors.provider = 'Select an insurance provider.'
  if (!values.startDate) errors.startDate = 'Select a start date.'
  if (!values.expiryDate) {
    errors.expiryDate = 'Select an expiry date.'
  } else if (values.startDate && values.expiryDate <= values.startDate) {
    errors.expiryDate = 'Expiry date must be after the start date.'
  }
  if (!Number(values.premium)) errors.premium = 'Enter the premium amount.'
  if (!Number(values.coverage)) {
    errors.coverage = 'Enter the coverage amount.'
  } else if (Number(values.coverage) < Number(values.premium)) {
    errors.coverage = 'Coverage should be greater than the premium.'
  }
  if (!values.risk) errors.risk = 'Select a risk level.'
  if (!values.status) errors.status = 'Select a policy status.'
  return errors
}

// mode: 'update' edits the existing mock policy, 'add' starts a blank record.
// The page remounts this component (via key) when the mode changes.
function PolicyForm({ mode, onSaved }) {
  const initialValues = mode === 'add' ? newPolicy : existingPolicy
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  // Amount inputs keep digits only
  const setAmount = (field, value) => setField(field, value.replace(/\D/g, ''))

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundErrors = validate(values)
    setErrors(foundErrors)

    const firstInvalid = FIELD_ORDER.find((field) => foundErrors[field])
    if (firstInvalid) {
      document.getElementById(`policy-${firstInvalid}`)?.focus()
      return
    }
    onSaved(`Policy ${values.policyId} saved successfully. Demo mode: changes are not stored.`)
  }

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
  }

  const amountHint = (amount) => (Number(amount) ? formatCurrency(Number(amount)) : undefined)

  return (
    <Card
      title="Policy Information"
      subtitle={
        mode === 'add'
          ? 'Create a new policy record and capture client details.'
          : `Update coverage, premium or details for ${existingPolicy.policyId}.`
      }
      action={<span className="ss-mode">{mode === 'add' ? 'New policy' : 'Editing'}</span>}
    >
      <form className="ss-form" onSubmit={handleSubmit} noValidate>
        <div className="ss-form__grid">
          <FormField id="policy-policyId" label="Policy ID" error={errors.policyId} required>
            <input
              type="text"
              value={values.policyId}
              onChange={(e) => setField('policyId', e.target.value.toUpperCase())}
              readOnly={mode === 'update'}
            />
          </FormField>

          <FormField id="policy-customer" label="Customer Name" error={errors.customer} required>
            <input
              type="text"
              autoComplete="organization"
              value={values.customer}
              onChange={(e) => setField('customer', e.target.value)}
            />
          </FormField>

          <FormField id="policy-type" label="Policy Type" error={errors.type} required>
            <select value={values.type} onChange={(e) => setField('type', e.target.value)}>
              <option value="">Select policy type</option>
              {POLICY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="policy-provider" label="Insurance Provider" error={errors.provider} required>
            <select value={values.provider} onChange={(e) => setField('provider', e.target.value)}>
              <option value="">Select provider</option>
              {INSURANCE_PROVIDERS.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="policy-startDate" label="Start Date" error={errors.startDate} required>
            <input
              type="date"
              value={values.startDate}
              onChange={(e) => setField('startDate', e.target.value)}
            />
          </FormField>

          <FormField id="policy-expiryDate" label="Expiry Date" error={errors.expiryDate} required>
            <input
              type="date"
              value={values.expiryDate}
              min={values.startDate || undefined}
              onChange={(e) => setField('expiryDate', e.target.value)}
            />
          </FormField>

          <FormField
            id="policy-premium"
            label="Premium Amount (₹)"
            error={errors.premium}
            hint={amountHint(values.premium)}
            required
          >
            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 325000"
              value={values.premium}
              onChange={(e) => setAmount('premium', e.target.value)}
            />
          </FormField>

          <FormField
            id="policy-coverage"
            label="Coverage Amount (₹)"
            error={errors.coverage}
            hint={amountHint(values.coverage)}
            required
          >
            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 25000000"
              value={values.coverage}
              onChange={(e) => setAmount('coverage', e.target.value)}
            />
          </FormField>

          <FormField id="policy-risk" label="Risk Level" error={errors.risk} required>
            <select value={values.risk} onChange={(e) => setField('risk', e.target.value)}>
              <option value="">Select risk level</option>
              {RISK_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="policy-status" label="Policy Status" error={errors.status} required>
            <select value={values.status} onChange={(e) => setField('status', e.target.value)}>
              {POLICY_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="ss-form__actions">
          <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" type="submit">
            Save Policy
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default PolicyForm
