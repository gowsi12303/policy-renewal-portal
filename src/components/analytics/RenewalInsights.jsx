import Card from '../common/Card'
import Icon from '../common/Icon'
import './analytics.css'

function RenewalInsights({ insights }) {
  return (
    <Card title="Renewal Insights" subtitle="Key takeaways from this period's data.">
      <ul className="insight-list">
        {insights.map((insight) => (
          <li key={insight.id} className={`insight insight--${insight.tone}`}>
            <span className="insight__icon">
              <Icon name={insight.icon} />
            </span>
            <p className="insight__text">{insight.text}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default RenewalInsights
