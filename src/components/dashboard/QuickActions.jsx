import { Link } from 'react-router-dom'
import Card from '../common/Card'
import Icon from '../common/Icon'
import './dashboard.css'

function QuickActions({ actions }) {
  return (
    <Card title="Quick Actions" subtitle="Jump straight to common broker tasks.">
      <ul className="quick-actions">
        {actions.map((action) => (
          <li key={action.label}>
            <Link to={action.path} className="quick-action">
              <span className="quick-action__icon">
                <Icon name={action.icon} />
              </span>
              <span className="quick-action__text">
                <span className="quick-action__label">{action.label}</span>
                <span className="quick-action__description">{action.description}</span>
              </span>
              <Icon name="arrowRight" className="quick-action__arrow" />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default QuickActions
