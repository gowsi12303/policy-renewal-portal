// Mock broker profile. Emails use the reserved ".example" domain (clearly fictional).

export const brokerProfile = {
  name: 'Gowsikan LV',
  initials: 'GL',
  role: 'Broker',
  email: 'gowsikan.lv@broker-portal.example',
  company: 'Demo Insurance Brokers Pvt. Ltd.',
  licenceNumber: 'DEMO-BRK-20417',
  location: 'Chennai, Tamil Nadu',
  memberSince: 'April 2021',
}

// Portfolio figures shown on the profile (match the Dashboard KPIs)
export const profileStats = [
  { label: 'Policies managed', value: '1,284' },
  { label: 'Retention rate', value: '92.4%' },
  { label: 'Renewals this month', value: '86' },
]

export const notificationPreferences = [
  {
    id: 'renewal-alerts',
    label: 'Renewal alerts',
    description: 'Email me when a renewal is due within 7 days.',
    enabled: true,
  },
  {
    id: 'document-reminders',
    label: 'Document reminders',
    description: 'Notify me when client documents are uploaded or overdue.',
    enabled: true,
  },
  {
    id: 'risk-changes',
    label: 'Risk level changes',
    description: 'Alert me when a policy moves to High Risk.',
    enabled: true,
  },
  {
    id: 'weekly-summary',
    label: 'Weekly portfolio summary',
    description: 'Send a summary of renewals and retention every Monday.',
    enabled: false,
  },
]
