import { Link } from 'react-router-dom'
import { policyDetailsPath } from '../../constants/routes'
import { formatFullDate } from '../../utils/dates'
import { formatCurrency } from '../../utils/formatters'
import '../common/Button.css'
import Card from '../common/Card'
import RiskBadge from '../common/RiskBadge'
import StatusBadge from '../common/StatusBadge'
import './calendar.css'

// renewal: the selected renewal, or null when nothing is selected.
function RenewalDetailsCard({ renewal }) {
  return (
    <Card title="Renewal Details">
      {renewal ? (
        <div className="cal-details">
          <div>
            <p className="cal-details__customer">{renewal.customer}</p>
            <p className="cal-details__policy">{renewal.policyId}</p>
          </div>

          <dl className="cal-details__list">
            <div>
              <dt>Policy Type</dt>
              <dd>{renewal.type}</dd>
            </div>
            <div>
              <dt>Renewal Date</dt>
              <dd>{formatFullDate(renewal.renewalDate)}</dd>
            </div>
            <div>
              <dt>Premium</dt>
              <dd>{formatCurrency(renewal.premium)}</dd>
            </div>
            <div>
              <dt>Risk</dt>
              <dd>
                <RiskBadge level={renewal.risk} />
              </dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <StatusBadge status={renewal.status} />
              </dd>
            </div>
            <div>
              <dt>Action</dt>
              <dd>{renewal.action}</dd>
            </div>
          </dl>

          <Link to={policyDetailsPath(renewal.policyId)} className="btn btn--primary cal-details__button">
            View Policy
          </Link>
        </div>
      ) : (
        <p className="cal-details__empty">Select a renewal event to view policy details.</p>
      )}
    </Card>
  )
}

export default RenewalDetailsCard
