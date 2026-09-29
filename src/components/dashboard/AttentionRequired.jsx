import { Link } from 'react-router-dom'
import { policyDetailsPath } from '../../constants/routes'
import { formatDate } from '../../utils/formatters'
import '../common/Button.css'
import Card from '../common/Card'
import RiskBadge from '../common/RiskBadge'
import './dashboard.css'

function AttentionRequired({ policies }) {
  return (
    <Card
      title="Attention Required"
      subtitle="At-risk renewals that need follow-up."
      className="dashboard__attention"
    >
      <ul className="attention-list">
        {policies.map((policy) => (
          <li key={policy.policyId} className={`attention-item attention-item--${policy.risk}`}>
            <div className="attention-item__body">
              <div className="attention-item__heading">
                <h3 className="attention-item__customer">{policy.customer}</h3>
                <RiskBadge level={policy.risk} />
              </div>
              <p className="attention-item__meta">
                {policy.policyId} · Renews {formatDate(policy.renewalDate)}
              </p>
              <p className="attention-item__reason">{policy.reason}</p>
            </div>
            <Link
              to={policyDetailsPath(policy.policyId)}
              className="btn btn--secondary btn--sm"
              aria-label={`Review ${policy.customer}, policy ${policy.policyId}`}
            >
              Review
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default AttentionRequired
