// Central list of URL paths. Import from here instead of hard-coding strings.
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  RENEWAL_INTELLIGENCE: '/renewals',
  POLICIES: '/policies',
  POLICY_DETAILS: '/policies/:policyId',
  CUSTOMERS: '/customers',
  SELF_SERVICE: '/self-service',
  RENEWAL_CALENDAR: '/calendar',
  ANALYTICS: '/analytics',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
}

// Builds a concrete policy URL, e.g. policyDetailsPath('POL-1001') -> '/policies/POL-1001'
export const policyDetailsPath = (policyId) => `/policies/${policyId}`

// Opens Self-Service on one of its quick actions: 'add' | 'update' | 'upload' | 'request'
// e.g. selfServiceActionPath('add') -> '/self-service?action=add'
export const selfServiceActionPath = (action) => `${ROUTES.SELF_SERVICE}?action=${action}`
