import { Link, useParams } from 'react-router-dom'
import Button from '../../components/common/Button'
import '../../components/common/Button.css'
import Card from '../../components/common/Card'
import '../../components/common/Card.css'
import EmptyState from '../../components/common/EmptyState'
import Icon from '../../components/common/Icon'
import PageHeader from '../../components/common/PageHeader'
import RiskBadge from '../../components/common/RiskBadge'
import StatusBadge from '../../components/common/StatusBadge'
import Toast from '../../components/common/Toast'
import { ROUTES } from '../../constants/routes'
import { customerDetails } from '../../data/customers'
import { brokerActions, policyExtras } from '../../data/policies'
import { RENEWALS_AS_OF, renewals } from '../../data/renewals'
import { useToast } from '../../hooks/useToast'
import { addYears, daysBetween, formatFullDate } from '../../utils/dates'
import { formatCurrency } from '../../utils/formatters'
import './PolicyDetailsPage.css'

function formatDaysLeft(days) {
  if (days < 0) return `${Math.abs(days)} days overdue`
  if (days === 0) return 'Due today'
  return days === 1 ? '1 day' : `${days} days`
}

// Short list of reasons this renewal needs attention, built from the mock data
function getRiskSignals(policy, daysLeft) {
  if (policy.status === 'Renewed') {
    return [{ text: 'Renewal completed. No action required.', tone: 'positive', icon: 'check' }]
  }
  const signals = [
    { text: policy.reason, tone: policy.risk === 'low' ? 'neutral' : policy.risk, icon: 'alert' },
  ]
  if (policy.risk === 'high') {
    signals.push({ text: 'Classified as high risk for renewal.', tone: 'high', icon: 'shield' })
  }
  if (daysLeft <= 7) {
    signals.push({ text: `Renewal due in ${formatDaysLeft(daysLeft)}.`, tone: 'medium', icon: 'calendar' })
  }
  return signals
}

function BackLink() {
  return (
    <Link to={ROUTES.POLICIES} className="policy-back">
      <Icon name="chevronLeft" />
      Back to Policies
    </Link>
  )
}

function PolicyDetailsPage() {
  const { policyId } = useParams()
  const { toast, showToast, closeToast } = useToast()

  const policy = renewals.find((item) => item.policyId === policyId)

  if (!policy) {
    return (
      <div className="page">
        <BackLink />
        <div className="card">
          <EmptyState
            icon="document"
            headingLevel={1}
            title="Policy not found"
            description={`We couldn't find a policy with the ID "${policyId}". It may have been removed or the link may be incorrect.`}
            action={
              <Link to={ROUTES.POLICIES} className="btn btn--primary">
                View all policies
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  const extras = policyExtras[policy.policyId] ?? {}
  const customer = customerDetails[policy.customer] ?? {}
  const daysLeft = daysBetween(RENEWALS_AS_OF, policy.renewalDate)
  const signals = getRiskSignals(policy, daysLeft)

  // Demo only: nothing is sent or scheduled.
  const handleAction = (action) => {
    showToast(`${action.label} logged for ${policy.customer} (${policy.policyId}). Demo mode: nothing was sent.`)
  }

  return (
    <div className="page">
      <BackLink />

      <PageHeader
        title={policy.customer}
        subtitle={`${policy.policyId} · ${policy.type} policy`}
        meta={
          <span className="policy-header-badges">
            <StatusBadge status={policy.status} />
            <RiskBadge level={policy.risk} />
          </span>
        }
      />

      <div className="page__split">
        <div className="page__stack">
          <Card title="Policy Information">
            <dl className="detail-list">
              <div>
                <dt>Policy ID</dt>
                <dd>{policy.policyId}</dd>
              </div>
              <div>
                <dt>Policy type</dt>
                <dd>{policy.type}</dd>
              </div>
              <div>
                <dt>Insurance provider</dt>
                <dd>{extras.provider ?? 'Not recorded'}</dd>
              </div>
              <div>
                <dt>Premium</dt>
                <dd className="detail-list__strong">{formatCurrency(policy.premium)}</dd>
              </div>
              <div>
                <dt>Coverage</dt>
                <dd className="detail-list__strong">
                  {extras.coverage ? formatCurrency(extras.coverage) : 'Not recorded'}
                </dd>
              </div>
              <div>
                <dt>Start date</dt>
                <dd>{formatFullDate(addYears(policy.renewalDate, -1))}</dd>
              </div>
              <div>
                <dt>Renewal / expiry date</dt>
                <dd>{formatFullDate(policy.renewalDate)}</dd>
              </div>
            </dl>
          </Card>

          <Card
            title="Customer Information"
            action={
              <Link to={ROUTES.CUSTOMERS} className="policy-link">
                All customers
              </Link>
            }
          >
            <dl className="detail-list">
              <div>
                <dt>Customer</dt>
                <dd>{policy.customer}</dd>
              </div>
              <div>
                <dt>Primary contact</dt>
                <dd>{customer.contact ?? 'Not recorded'}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd className="detail-list__wrap">{customer.email ?? 'Not recorded'}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{customer.city ?? 'Not recorded'}</dd>
              </div>
              <div>
                <dt>Customer since</dt>
                <dd>{customer.customerSince ?? 'Not recorded'}</dd>
              </div>
              <div>
                <dt>Active policies</dt>
                <dd>{customer.activePolicies ?? 1}</dd>
              </div>
            </dl>
          </Card>
        </div>

        <div className="page__stack">
          <Card title="Renewal Status">
            <dl className="detail-list detail-list--single">
              <div>
                <dt>Status</dt>
                <dd>
                  <StatusBadge status={policy.status} />
                </dd>
              </div>
              <div>
                <dt>Risk level</dt>
                <dd>
                  <RiskBadge level={policy.risk} />
                </dd>
              </div>
              <div>
                <dt>Time to renewal</dt>
                <dd className={daysLeft <= 7 && policy.status !== 'Renewed' ? 'detail-list__urgent' : ''}>
                  {formatDaysLeft(daysLeft)}
                </dd>
              </div>
              <div>
                <dt>Recommended action</dt>
                <dd className="detail-list__strong">{policy.action}</dd>
              </div>
            </dl>
          </Card>

          <Card title="Risk Signals">
            <ul className="policy-signals">
              {signals.map((signal) => (
                <li key={signal.text} className={`policy-signal policy-signal--${signal.tone}`}>
                  <Icon name={signal.icon} />
                  <span>{signal.text}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Broker Actions" subtitle="Demo actions: nothing is sent to the client.">
            <div className="policy-actions">
              {brokerActions.map((action) => (
                <Button key={action.id} onClick={() => handleAction(action)}>
                  <Icon name={action.icon} />
                  {action.label}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Toast toast={toast} onClose={closeToast} />
    </div>
  )
}

export default PolicyDetailsPage
