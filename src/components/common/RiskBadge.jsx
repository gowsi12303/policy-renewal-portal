import { RISK_LABELS } from '../../constants/risk'
import './RiskBadge.css'

// Number of filled bars per level, so risk is readable without colour.
const FILLED_BARS = { high: 3, medium: 2, low: 1 }

function RiskBadge({ level }) {
  const filled = FILLED_BARS[level] ?? 0

  return (
    <span className={`risk-badge risk-badge--${level}`}>
      <span className="risk-badge__bars" aria-hidden="true">
        {[1, 2, 3].map((bar) => (
          <span key={bar} className={bar <= filled ? 'is-filled' : ''} />
        ))}
      </span>
      {RISK_LABELS[level] ?? level}
    </span>
  )
}

export default RiskBadge
