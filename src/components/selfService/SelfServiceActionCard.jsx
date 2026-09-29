import Button from '../common/Button'
import Icon from '../common/Icon'
import './selfService.css'

// The whole card is clickable for mouse users; the button is the keyboard target.
function SelfServiceActionCard({ action, isActive, targetId, onSelect }) {
  return (
    <article
      className={`ss-action ${isActive ? 'is-active' : ''}`}
      onClick={() => onSelect(action.id)}
    >
      <span className="ss-action__icon">
        <Icon name={action.icon} />
      </span>
      <h3 className="ss-action__title">{action.title}</h3>
      <p className="ss-action__description">{action.description}</p>
      <Button
        variant={isActive ? 'primary' : 'secondary'}
        className="ss-action__button"
        aria-controls={targetId}
        aria-label={`${action.buttonLabel}: ${action.title}`}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(action.id)
        }}
      >
        {action.buttonLabel}
        <Icon name="arrowRight" />
      </Button>
    </article>
  )
}

export default SelfServiceActionCard
