// Extra mock details for the policies in renewals.js, keyed by policy ID.
// Used by the Policy Details page. Coverage is the sum insured in rupees.
export const policyExtras = {
  'POL-10482': { provider: 'National Insurance Co.', coverage: 20000000 },
  'POL-10517': { provider: 'The New India Assurance Co.', coverage: 15000000 },
  'POL-10559': { provider: 'ICICI Lombard General Insurance', coverage: 25000000 },
  'POL-10621': { provider: 'Tata AIG General Insurance', coverage: 30000000 },
  'POL-10688': { provider: 'HDFC ERGO General Insurance', coverage: 18000000 },
  'POL-10593': { provider: 'United India Insurance Co.', coverage: 40000000 },
  'POL-10704': { provider: 'The Oriental Insurance Co.', coverage: 35000000 },
  'POL-10735': { provider: 'National Insurance Co.', coverage: 12000000 },
  'POL-10752': { provider: 'The New India Assurance Co.', coverage: 10000000 },
  'POL-10768': { provider: 'ICICI Lombard General Insurance', coverage: 20000000 },
  'POL-10781': { provider: 'United India Insurance Co.', coverage: 8000000 },
  'POL-10809': { provider: 'HDFC ERGO General Insurance', coverage: 50000000 },
  'POL-10826': { provider: 'Tata AIG General Insurance', coverage: 22500000 },
  'POL-10843': { provider: 'The Oriental Insurance Co.', coverage: 15000000 },
}

// Demo-only broker actions on the Policy Details page
export const brokerActions = [
  { id: 'contact', label: 'Contact Client', icon: 'message' },
  { id: 'pricing', label: 'Review Pricing', icon: 'rupee' },
  { id: 'documents', label: 'Request Documents', icon: 'document' },
  { id: 'call', label: 'Schedule Call', icon: 'calendar' },
]
