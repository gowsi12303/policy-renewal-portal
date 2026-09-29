import { Link } from 'react-router-dom'
import '../../components/common/Button.css'
import EmptyState from '../../components/common/EmptyState'
import { ROUTES } from '../../constants/routes'
import './NotFoundPage.css'

// Shown for any unknown URL (outside the main layout, so it stands on its own).
function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found__card">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <EmptyState
          icon="search"
          headingLevel={1}
          title="Page not found"
          description="The page you're looking for doesn't exist or may have been moved. Check the address, or head back to your dashboard."
          action={
            <Link to={ROUTES.DASHBOARD} className="btn btn--primary">
              Back to Dashboard
            </Link>
          }
        />
      </div>
    </main>
  )
}

export default NotFoundPage
