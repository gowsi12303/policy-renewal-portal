import Card from './Card'
import Icon from './Icon'
import './RecentActivity.css'

function RecentActivity({
  activities,
  title = 'Recent Activity',
  subtitle = 'Latest updates across your portfolio.',
}) {
  return (
    <Card title={title} subtitle={subtitle}>
      <ol className="activity-list">
        {activities.map((activity) => (
          <li key={activity.id} className="activity-item">
            <span className="activity-item__icon">
              <Icon name={activity.icon} />
            </span>
            <div>
              <p className="activity-item__text">{activity.text}</p>
              <p className="activity-item__time">{activity.time}</p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  )
}

export default RecentActivity
