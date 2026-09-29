// Display labels and chart colours for renewal risk levels.
export const RISK_LEVELS = ['high', 'medium', 'low']

export const RISK_LABELS = {
  high: 'High Risk',
  medium: 'Medium Risk',
  low: 'Low Risk',
}

// Hex values match --color-danger / --color-warning / --color-success
// (SVG chart attributes can't read CSS variables).
export const RISK_COLORS = {
  high: '#b91c1c',
  medium: '#b45309',
  low: '#15803d',
}
