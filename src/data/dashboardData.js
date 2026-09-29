import { ROUTES, selfServiceActionPath } from '../constants/routes'
import { daysBetween } from '../utils/dates'
import { RENEWALS_AS_OF, priorityPolicyIds, renewals } from './renewals'

// Mock data for the Dashboard page. Replace with real data sources later.
// Renewal rows come from renewals.js (the single source of detailed policies),
// so the Dashboard, Renewal Intelligence and Calendar always agree.

// Detailed renewals due between the demo date and `days` from it, soonest first
function renewalsDueWithin(days) {
  return renewals
    .filter((renewal) => {
      const daysLeft = daysBetween(RENEWALS_AS_OF, renewal.renewalDate)
      return daysLeft >= 0 && daysLeft <= days
    })
    .sort((a, b) => a.renewalDate.localeCompare(b.renewalDate))
}

export const kpis = [
  {
    id: 'total-policies',
    title: 'Total Policies',
    value: '1,284',
    detail: '+8.4% vs last month',
    icon: 'document',
    tone: 'positive',
  },
  {
    id: 'renewals-month',
    title: 'Renewals This Month',
    value: '86',
    // Counted from the detailed renewals, so it matches the calendar and tables
    detail: `${renewalsDueWithin(7).length} due in next 7 days`,
    icon: 'calendar',
    tone: 'neutral',
  },
  {
    id: 'at-risk',
    title: 'At-Risk Renewals',
    value: '17',
    detail: 'Requires broker attention',
    icon: 'alert',
    tone: 'danger',
  },
  {
    id: 'retention',
    title: 'Retention Rate',
    value: '92.4%',
    detail: '+2.1% vs last quarter',
    icon: 'shield',
    tone: 'positive',
  },
]

// September is the current month, so fewer renewals are completed so far.
export const renewalTrend = [
  { month: 'Apr', due: 92, renewed: 84 },
  { month: 'May', due: 88, renewed: 81 },
  { month: 'Jun', due: 104, renewed: 95 },
  { month: 'Jul', due: 97, renewed: 90 },
  { month: 'Aug', due: 112, renewed: 104 },
  { month: 'Sep', due: 86, renewed: 62 },
]

// "Upcoming Renewals" table: every detailed renewal due in the next two weeks
export const upcomingRenewals = renewalsDueWithin(14)

// "Attention Required": the same priority policies shown on Renewal Intelligence
export const atRiskPolicies = priorityPolicyIds.map((id) =>
  renewals.find((renewal) => renewal.policyId === id),
)

export const quickActions = [
  {
    label: 'View Renewals',
    description: 'Track every upcoming renewal',
    path: ROUTES.RENEWAL_INTELLIGENCE,
    icon: 'refresh',
  },
  {
    label: 'Add Policy',
    description: 'Register a new client policy',
    // Opens Self-Service straight on the Add New Policy form
    path: selfServiceActionPath('add'),
    icon: 'plus',
  },
  {
    label: 'Customer Search',
    description: 'Find a client or policyholder',
    path: ROUTES.CUSTOMERS,
    icon: 'search',
  },
  {
    label: 'Renewal Calendar',
    description: 'See renewals by due date',
    path: ROUTES.RENEWAL_CALENDAR,
    icon: 'calendar',
  },
]

export const recentActivity = [
  {
    id: 1,
    text: 'Renewal reminder sent to Arjun Textiles',
    time: '10 min ago',
    icon: 'bell',
  },
  {
    id: 2,
    text: 'Policy POL-10621 marked as On Track',
    time: '32 min ago',
    icon: 'check',
  },
  {
    id: 3,
    text: 'Customer profile updated for Metro Logistics',
    time: '1 hour ago',
    icon: 'user',
  },
  {
    id: 4,
    text: 'Renewal document uploaded for Sunrise Hotels',
    time: '2 hours ago',
    icon: 'upload',
  },
]
