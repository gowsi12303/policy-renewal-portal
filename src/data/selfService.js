// Mock data for the Broker Self-Service page. Nothing here is persisted.

export const selfServiceActions = [
  {
    id: 'add',
    title: 'Add New Policy',
    description: 'Create a new policy record and capture client details.',
    buttonLabel: 'Start',
    icon: 'plus',
  },
  {
    id: 'update',
    title: 'Update Policy',
    description: 'Update coverage, premium or policy information.',
    buttonLabel: 'Update',
    icon: 'refresh',
  },
  {
    id: 'upload',
    title: 'Upload Documents',
    description: 'Attach renewal and supporting documents.',
    buttonLabel: 'Upload',
    icon: 'upload',
  },
  {
    id: 'request',
    title: 'Request Client Documents',
    description: 'Send a document request to a client.',
    buttonLabel: 'Request',
    icon: 'message',
  },
]

export const POLICY_TYPES = [
  'Commercial',
  'Property',
  'Liability',
  'Fleet',
  'Marine',
  'Engineering',
  'Cyber',
  'Health',
]

export const INSURANCE_PROVIDERS = [
  'National Insurance Co.',
  'The New India Assurance Co.',
  'United India Insurance Co.',
  'The Oriental Insurance Co.',
  'ICICI Lombard General Insurance',
  'HDFC ERGO General Insurance',
  'Tata AIG General Insurance',
]

export const RISK_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export const POLICY_STATUSES = ['On Track', 'Pending', 'At Risk', 'Renewed']

// Amounts are stored as digit strings because they come from text inputs.
export const existingPolicy = {
  policyId: 'POL-10912',
  customer: 'Bharat Industrial Solutions',
  type: 'Commercial',
  provider: 'National Insurance Co.',
  startDate: '2025-10-01',
  expiryDate: '2026-10-01',
  premium: '325000',
  coverage: '25000000',
  risk: 'medium',
  status: 'Pending',
}

export const newPolicy = {
  policyId: 'POL-10913',
  customer: '',
  type: '',
  provider: '',
  startDate: '',
  expiryDate: '',
  premium: '',
  coverage: '',
  risk: '',
  status: 'Pending',
}

// status values map to StatusBadge variants
export const renewalDocuments = [
  {
    id: 'doc-1',
    name: 'Renewal Proposal Form',
    policyId: 'POL-10482',
    uploadedBy: 'Broker',
    uploadedDate: '2026-09-24',
    status: 'Received',
    action: 'View',
  },
  {
    id: 'doc-2',
    name: 'Client Financial Statement',
    policyId: 'POL-10559',
    uploadedBy: 'Client',
    uploadedDate: '2026-09-25',
    status: 'Pending Review',
    action: 'Review',
  },
  {
    id: 'doc-3',
    name: 'Property Valuation Report',
    policyId: 'POL-10688',
    uploadedBy: 'Broker',
    uploadedDate: '2026-09-26',
    status: 'Received',
    action: 'View',
  },
  {
    id: 'doc-4',
    name: 'Loss History Report',
    policyId: 'POL-10593',
    uploadedBy: 'Client',
    uploadedDate: '2026-09-27',
    status: 'Requested',
    action: 'Request Again',
  },
]

export const ACCEPTED_FILE_TYPES = ['pdf', 'docx', 'xlsx', 'jpg', 'jpeg', 'png']

export const REQUEST_CUSTOMERS = [
  'Arjun Textiles',
  'Greenfield Foods',
  'Kaveri Pharma',
  'Deccan Builders',
  'Metro Logistics',
  'Sunrise Hotels',
]

export const DOCUMENT_TYPES = [
  'Renewal Proposal Form',
  'Financial Statement',
  'Loss History',
  'Property Valuation',
  'Other',
]

export const DEFAULT_REQUEST_MESSAGE =
  'Please upload the requested document before the renewal review date so we can complete your policy renewal.'

export const selfServiceActivity = [
  {
    id: 1,
    text: 'Renewal Proposal Form uploaded for Arjun Textiles',
    time: '10 min ago',
    icon: 'upload',
  },
  {
    id: 2,
    text: 'Document request sent to Kaveri Pharma',
    time: '32 min ago',
    icon: 'message',
  },
  {
    id: 3,
    text: 'Policy POL-10621 updated',
    time: '1 hour ago',
    icon: 'refresh',
  },
  {
    id: 4,
    text: 'Property Valuation Report uploaded for Sunrise Hotels',
    time: '2 hours ago',
    icon: 'upload',
  },
]
