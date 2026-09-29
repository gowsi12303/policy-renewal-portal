import { formatDate } from '../../utils/formatters'
import Card from '../common/Card'
import RiskBadge from '../common/RiskBadge'
import './calendar.css'

function UpcomingRenewalsList({ renewals, selectedPolicyId, onSelect }) {
  return (
    <Card title="Upcoming Renewals" subtitle={`Next ${renewals.length} renewal dates.`}>
      <ul className="cal-upcoming">
        {renewals.map((renewal) => {
          const isSelected = renewal.policyId === selectedPolicyId
          return (
            <li key={renewal.policyId}>
              <button
                type="button"
                className={`cal-upcoming__item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelect(renewal)}
                aria-pressed={isSelected}
              >
                <span className="cal-upcoming__text">
                  <span className="cal-upcoming__customer">{renewal.customer}</span>
                  <span className="cal-upcoming__meta">
                    {renewal.policyId} · {formatDate(renewal.renewalDate)}
                  </span>
                </span>
                <RiskBadge level={renewal.risk} />
              </button>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

export default UpcomingRenewalsList
