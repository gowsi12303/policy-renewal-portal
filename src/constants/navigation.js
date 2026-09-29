import { ROUTES } from './routes'

// Sidebar menu items. The layout reads this list, so adding a page to the
// menu only requires a new entry here. `icon` is a name from components/common/Icon.
export const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'grid' },
  { label: 'Renewal Intelligence', path: ROUTES.RENEWAL_INTELLIGENCE, icon: 'refresh' },
  { label: 'Policies', path: ROUTES.POLICIES, icon: 'document' },
  { label: 'Customers', path: ROUTES.CUSTOMERS, icon: 'users' },
  { label: 'Self-Service', path: ROUTES.SELF_SERVICE, icon: 'edit' },
  { label: 'Renewal Calendar', path: ROUTES.RENEWAL_CALENDAR, icon: 'calendar' },
  { label: 'Analytics', path: ROUTES.ANALYTICS, icon: 'chart' },
  { label: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: 'bell' },
  { label: 'My Profile', path: ROUTES.PROFILE, icon: 'user' },
]
