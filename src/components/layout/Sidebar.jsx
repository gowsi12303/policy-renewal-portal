import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navigation'
import Icon from '../common/Icon'
import './layout.css'

// Always visible on desktop. On smaller screens it is an off-canvas drawer:
// `isOpen` slides it in, and it is hidden (not focusable) while closed.
function Sidebar({ id, ref, isOpen, onClose, onNavigate }) {
  return (
    <aside id={id} ref={ref} className={`sidebar ${isOpen ? 'is-open' : ''}`}>
      <div className="sidebar__brand">
        <span className="sidebar__mark">
          <Icon name="shield" />
        </span>
        <div className="sidebar__brand-text">
          <p className="sidebar__name">Policy Renewal Intelligence</p>
          <p className="sidebar__subtitle">Broker Self-Serve Portal</p>
        </div>
        <button
          type="button"
          className="sidebar__close"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <Icon name="close" />
        </button>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              {/* NavLink adds aria-current="page" and the "active" class automatically */}
              <NavLink to={item.path} className="sidebar__link" onClick={onNavigate}>
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
