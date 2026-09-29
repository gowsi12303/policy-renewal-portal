import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navigation'
import { ROUTES } from '../../constants/routes'
import Icon from '../common/Icon'
import './layout.css'

// Breadcrumb trail for the current URL, e.g. [{ label: 'Policies', path }, { label: 'POL-10482' }]
function getBreadcrumbs(pathname) {
  const policyMatch = matchPath(ROUTES.POLICY_DETAILS, pathname)
  if (policyMatch) {
    return [{ label: 'Policies', path: ROUTES.POLICIES }, { label: policyMatch.params.policyId }]
  }
  const item = NAV_ITEMS.find((navItem) => matchPath({ path: navItem.path, end: false }, pathname))
  return item ? [{ label: item.label }] : []
}

function Topbar({ menuButtonRef, menuId, isMenuOpen, onMenuToggle }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = getBreadcrumbs(pathname)

  // Demo only: there is no real session to end.
  const handleLogout = () => navigate(ROUTES.LOGIN)

  return (
    <header className="topbar">
      <button
        ref={menuButtonRef}
        type="button"
        className="topbar__icon-button topbar__menu"
        onClick={onMenuToggle}
        aria-label="Open navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls={menuId}
      >
        <Icon name="menu" />
      </button>

      <nav className="topbar__breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li className="topbar__crumb-root">
            <Link to={ROUTES.DASHBOARD}>Portal</Link>
          </li>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            return (
              <li key={crumb.label}>
                {isLast ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  <Link to={crumb.path}>{crumb.label}</Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="topbar__actions">
        <Link to={ROUTES.NOTIFICATIONS} className="topbar__icon-button" aria-label="Notifications">
          <Icon name="bell" />
        </Link>
        <Link to={ROUTES.PROFILE} className="topbar__profile" aria-label="Broker profile">
          <span className="topbar__avatar">
            <Icon name="user" />
          </span>
          <span className="topbar__profile-label" aria-hidden="true">
            Broker
          </span>
        </Link>
        <button type="button" className="topbar__logout" onClick={handleLogout}>
          <Icon name="logout" />
          <span className="topbar__logout-label">Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Topbar
