import { Link } from 'react-router-dom'
import { policyDetailsPath } from '../../constants/routes'
import { formatDate } from '../../utils/formatters'
import '../common/Button.css'
import Card from '../common/Card'
import RiskBadge from '../common/RiskBadge'
import './renewals.css'

function PriorityRenewals({ policies }) {
  return (
    <Card title="Priority Renewals" subtitle="Highest-impact renewals to act on today.">
      <ul className="priority-list">
        {policies.map((policy) => (
          <li key={policy.policyId} className={`priority-card priority-card--${policy.risk}`}>
            <div className="priority-card__top">
              <h3 className="priority-card__customer">{policy.customer}</h3>
              <RiskBadge level={policy.risk} />
            </div>
            <p className="priority-card__meta">
              {policy.policyId} · Renews {formatDate(policy.renewalDate)}
            </p>
            <p className="priority-card__reason">{policy.reason}</p>
            <Link
              to={policyDetailsPath(policy.policyId)}
              className="btn btn--primary btn--sm"
              aria-label={`Review ${policy.customer}, policy ${policy.policyId}`}
            >
              Review policy
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default PriorityRenewals
