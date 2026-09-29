import Icon from './Icon'
import './KpiCard.css'

// tone: 'positive' | 'neutral' | 'warning' | 'danger'. Controls the icon and detail colours.
function KpiCard({ title, value, detail, icon, tone = 'neutral' }) {
  return (
    <article className={`kpi-card kpi-card--${tone}`}>
      <div className="kpi-card__top">
        <h3 className="kpi-card__title">{title}</h3>
        <span className="kpi-card__icon">
          <Icon name={icon} />
        </span>
      </div>
      <p className="kpi-card__value">{value}</p>
      <p className="kpi-card__detail">
        {tone === 'positive' && <Icon name="trendUp" className="kpi-card__trend" />}
        {(tone === 'danger' || tone === 'warning') && (
          <Icon name="alert" className="kpi-card__trend" />
        )}
        {detail}
      </p>
    </article>
  )
}

export default KpiCard
