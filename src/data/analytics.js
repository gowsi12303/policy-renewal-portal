// Mock data for the Analytics page.
// Renewal performance and risk distribution reuse dashboardData.js and renewals.js.

export const analyticsKpis = [
  {
    id: 'renewal-rate',
    title: 'Renewal Rate',
    value: '92.4%',
    detail: '+2.1% vs last quarter',
    icon: 'shield',
    tone: 'positive',
  },
  {
    id: 'policies-renewed',
    title: 'Policies Renewed',
    value: '1,186',
    detail: '+6.8% vs last quarter',
    icon: 'refresh',
    tone: 'positive',
  },
  {
    id: 'renewal-value',
    title: 'Renewal Value',
    value: '₹2.84 Cr',
    detail: '+9.3% vs last quarter',
    icon: 'rupee',
    tone: 'positive',
  },
  {
    id: 'at-risk',
    title: 'At-Risk Policies',
    value: '17',
    detail: '3 fewer than last month',
    icon: 'alert',
    tone: 'neutral',
  },
]

// Retention rate in percent
export const retentionTrend = [
  { month: 'Apr', rate: 89.8 },
  { month: 'May', rate: 90.4 },
  { month: 'Jun', rate: 91.1 },
  { month: 'Jul', rate: 91.5 },
  { month: 'Aug', rate: 92.0 },
  { month: 'Sep', rate: 92.4 },
]

// Renewal value in lakhs (₹L). Adds up to 284L = ₹2.84 Cr, matching the Renewal Value KPI.
export const valueByPolicyType = [
  { type: 'Commercial', value: 78 },
  { type: 'Property', value: 52 },
  { type: 'Liability', value: 41 },
  { type: 'Fleet', value: 36 },
  { type: 'Engineering', value: 29 },
  { type: 'Marine', value: 19 },
  { type: 'Cyber', value: 15 },
  { type: 'Health', value: 14 },
]

// tone: 'positive' | 'danger' | 'neutral' | 'warning'
export const renewalInsights = [
  {
    id: 'retention',
    text: 'Retention improved by 2.1 percentage points compared with last quarter.',
    icon: 'trendUp',
    tone: 'positive',
  },
  {
    id: 'high-risk',
    text: '17 upcoming renewals are currently classified as high risk.',
    icon: 'alert',
    tone: 'danger',
  },
  {
    id: 'commercial',
    text: 'Commercial policies contribute the largest share of renewal value.',
    icon: 'rupee',
    tone: 'neutral',
  },
  {
    id: 'september',
    text: 'September renewal completion is currently below the previous two months.',
    icon: 'calendar',
    tone: 'warning',
  },
]
