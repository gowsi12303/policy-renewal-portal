import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import EmptyState from '../../components/common/EmptyState'
import Icon from '../../components/common/Icon'
import PageHeader from '../../components/common/PageHeader'
import { policyDetailsPath } from '../../constants/routes'
import { NOTIFICATION_TYPES, notifications as initialNotifications } from '../../data/notifications'
import './NotificationsPage.css'

const VIEWS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
]

// Read/unread changes live in state only (demo, not persisted).
function NotificationsPage() {
  const [items, setItems] = useState(initialNotifications)
  const [view, setView] = useState('all')

  const unreadCount = items.filter((item) => !item.read).length
  const visible = view === 'unread' ? items.filter((item) => !item.read) : items

  const markRead = (id) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)))
  const markAllRead = () => setItems((current) => current.map((item) => ({ ...item, read: true })))

  return (
    <div className="page">
      <PageHeader
        title="Notifications"
        subtitle="Review renewal alerts and broker activity notifications."
        meta={<strong>{unreadCount} unread</strong>}
      />

      <Card
        title="Recent Notifications"
        subtitle="Renewal alerts, document reminders, policy updates and customer activity."
        action={
          <Button onClick={markAllRead} disabled={unreadCount === 0}>
            <Icon name="check" />
            Mark all as read
          </Button>
        }
      >
        <div className="notif-views" role="group" aria-label="Show notifications">
          {VIEWS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`notif-views__button ${view === option.id ? 'is-active' : ''}`}
              aria-pressed={view === option.id}
              onClick={() => setView(option.id)}
            >
              {option.label}
              {option.id === 'unread' && <span className="notif-views__count">{unreadCount}</span>}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <EmptyState
            compact
            icon="check"
            headingLevel={3}
            title="You're all caught up"
            description="There are no unread notifications."
          />
        ) : (
          <ul className="notif-list">
            {visible.map((item) => {
              const type = NOTIFICATION_TYPES[item.type]
              return (
                <li key={item.id} className={`notif notif--${item.type} ${item.read ? '' : 'is-unread'}`}>
                  <span className="notif__icon">
                    <Icon name={type.icon} />
                  </span>
                  <div className="notif__body">
                    <div className="notif__heading">
                      <h3 className="notif__title">
                        {!item.read && <span className="sr-only">Unread: </span>}
                        {item.title}
                      </h3>
                      {!item.read && (
                        <span className="notif__new" aria-hidden="true">
                          New
                        </span>
                      )}
                    </div>
                    <p className="notif__description">{item.description}</p>
                    <p className="notif__meta">
                      <span>{type.label}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.time}</span>
                    </p>
                    <div className="notif__actions">
                      {item.policyId && (
                        <Link to={policyDetailsPath(item.policyId)} className="notif__link">
                          View policy {item.policyId}
                        </Link>
                      )}
                      {!item.read && (
                        <button
                          type="button"
                          className="notif__link"
                          onClick={() => markRead(item.id)}
                          aria-label={`Mark "${item.title}" as read`}
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Card>
    </div>
  )
}

export default NotificationsPage
