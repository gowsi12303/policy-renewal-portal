import { useId } from 'react'
import './Card.css'

// White content card with a heading, optional subtitle and optional header action.
function Card({ title, subtitle, action, className = '', children }) {
  const titleId = useId()

  return (
    <section className={`card ${className}`.trim()} aria-labelledby={titleId}>
      <header className="card__header">
        <div>
          <h2 id={titleId} className="card__title">
            {title}
          </h2>
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>
        {action && <div className="card__action">{action}</div>}
      </header>
      {children}
    </section>
  )
}

export default Card
