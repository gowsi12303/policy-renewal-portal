import Icon from './Icon'
import './EmptyState.css'

// Centered message for "nothing here" states. `action` is an optional button/link.
// headingLevel lets the title fit the page's heading order (h1 on a full page).
function EmptyState({ icon = 'search', title, description, action, headingLevel = 2, compact = false }) {
  const Heading = `h${headingLevel}`

  return (
    <div className={`empty-state ${compact ? 'empty-state--compact' : ''}`}>
      <span className="empty-state__icon">
        <Icon name={icon} />
      </span>
      <Heading className="empty-state__title">{title}</Heading>
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  )
}

export default EmptyState
