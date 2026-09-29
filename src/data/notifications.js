// Mock notifications. `read` is the starting state; changes are not persisted.
// type: 'renewal' | 'document' | 'policy' | 'customer'

export const NOTIFICATION_TYPES = {
  renewal: { label: 'Renewal alert', icon: 'alert' },
  document: { label: 'Document', icon: 'document' },
  policy: { label: 'Policy update', icon: 'refresh' },
  customer: { label: 'Customer activity', icon: 'users' },
}

export const notifications = [
  {
    id: 'n1',
    type: 'renewal',
    title: 'Renewal due in 2 days',
    description: 'Arjun Textiles (POL-10482) renews on Sep 30. No client response has been recorded yet.',
    time: '15 min ago',
    policyId: 'POL-10482',
    read: false,
  },
  {
    id: 'n2',
    type: 'document',
    title: 'Financial statement awaiting review',
    description: 'Kaveri Pharma uploaded a Client Financial Statement for POL-10559.',
    time: '1 hour ago',
    policyId: 'POL-10559',
    read: false,
  },
  {
    id: 'n3',
    type: 'renewal',
    title: 'Competitor quote detected',
    description: 'Deccan Builders (POL-10593) has received a competing quote ahead of its Oct 9 renewal.',
    time: '2 hours ago',
    policyId: 'POL-10593',
    read: false,
  },
  {
    id: 'n4',
    type: 'policy',
    title: 'Policy marked On Track',
    description: 'Metro Logistics (POL-10621) accepted the renewal terms.',
    time: '3 hours ago',
    policyId: 'POL-10621',
    read: true,
  },
  {
    id: 'n5',
    type: 'document',
    title: 'Loss history report requested',
    description: 'A reminder was sent to Deccan Builders for the Loss History Report.',
    time: 'Yesterday',
    policyId: 'POL-10593',
    read: true,
  },
  {
    id: 'n6',
    type: 'customer',
    title: 'Customer profile updated',
    description: 'Contact details were updated for Metro Logistics.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 'n7',
    type: 'policy',
    title: 'Renewal completed',
    description: 'Nilgiri Tea Estates (POL-10752) renewed early.',
    time: '2 days ago',
    policyId: 'POL-10752',
    read: true,
  },
  {
    id: 'n8',
    type: 'customer',
    title: 'Client replied to renewal quote',
    description: 'Greenfield Foods requested revised terms for POL-10517.',
    time: '2 days ago',
    policyId: 'POL-10517',
    read: true,
  },
]
