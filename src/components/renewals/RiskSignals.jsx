import Card from '../common/Card'
import Icon from '../common/Icon'
import './renewals.css'

const SEVERITY_LABELS = {
  high: 'High severity',
  medium: 'Medium severity',
}

function RiskSignals({ signals }) {
  return (
    <Card title="Risk Signals" subtitle="Why renewals are flagged, and what to do next.">
      <ul className="signal-list">
        {signals.map((signal) => (
          <li key={signal.id} className={`signal signal--${signal.severity}`}>
            <span className="signal__icon">
              <Icon name={signal.icon} />
            </span>
            <div className="signal__body">
              <h3 className="signal__label">{signal.label}</h3>
              <p className="signal__meta">
                <span className="sr-only">{SEVERITY_LABELS[signal.severity]}: </span>
                {signal.count} {signal.count === 1 ? 'policy' : 'policies'}
              </p>
            </div>
            <span className="signal__tag">{signal.tag}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default RiskSignals
