import { useState } from 'react'
import { renewals } from '../../data/renewals'
import { DEFAULT_REQUEST_MESSAGE, DOCUMENT_TYPES, REQUEST_CUSTOMERS } from '../../data/selfService'
import Button from '../common/Button'
import Card from '../common/Card'
import FormField from '../common/FormField'
import './selfService.css'

const INITIAL_VALUES = {
  customer: '',
  policyId: '',
  documentType: '',
  message: DEFAULT_REQUEST_MESSAGE,
}

function policiesFor(customer) {
  return renewals.filter((renewal) => renewal.customer === customer)
}

function validate(values) {
  const errors = {}
  if (!values.customer) errors.customer = 'Select a customer.'
  if (!values.policyId) errors.policyId = 'Select a policy.'
  if (!values.documentType) errors.documentType = 'Select a document type.'
  if (values.message.trim().length < 10) errors.message = 'Enter a message of at least 10 characters.'
  return errors
}

// Frontend prototype: no email or API call is made.
function DocumentRequestForm({ onSent }) {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const policyOptions = policiesFor(values.customer)

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  // Choosing a customer pre-selects their first policy
  const handleCustomerChange = (customer) => {
    const [firstPolicy] = policiesFor(customer)
    setValues((current) => ({ ...current, customer, policyId: firstPolicy?.policyId ?? '' }))
    setErrors((current) => ({ ...current, customer: undefined, policyId: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundErrors = validate(values)
    setErrors(foundErrors)

    const firstInvalid = ['customer', 'policyId', 'documentType', 'message'].find(
      (field) => foundErrors[field],
    )
    if (firstInvalid) {
      document.getElementById(`request-${firstInvalid}`)?.focus()
      return
    }
    onSent('Document request sent successfully.')
    setValues(INITIAL_VALUES)
  }

  return (
    <Card title="Request Documents from Client" subtitle="The client is asked to upload the document.">
      <form className="ss-form" onSubmit={handleSubmit} noValidate>
        <div className="ss-form__stack">
          <FormField id="request-customer" label="Customer" error={errors.customer} required>
            <select value={values.customer} onChange={(e) => handleCustomerChange(e.target.value)}>
              <option value="">Select customer</option>
              {REQUEST_CUSTOMERS.map((customer) => (
                <option key={customer} value={customer}>
                  {customer}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="request-policyId"
            label="Policy"
            error={errors.policyId}
            hint={values.customer ? undefined : 'Select a customer first.'}
            required
          >
            <select
              value={values.policyId}
              onChange={(e) => setField('policyId', e.target.value)}
              disabled={!values.customer}
            >
              <option value="">Select policy</option>
              {policyOptions.map((policy) => (
                <option key={policy.policyId} value={policy.policyId}>
                  {policy.policyId} · {policy.type}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="request-documentType" label="Document Type" error={errors.documentType} required>
            <select value={values.documentType} onChange={(e) => setField('documentType', e.target.value)}>
              <option value="">Select document type</option>
              {DOCUMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="request-message" label="Message" error={errors.message} required>
            <textarea
              rows={4}
              value={values.message}
              onChange={(e) => setField('message', e.target.value)}
            />
          </FormField>
        </div>

        <div className="ss-form__actions">
          <Button variant="primary" type="submit">
            Send Request
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default DocumentRequestForm
