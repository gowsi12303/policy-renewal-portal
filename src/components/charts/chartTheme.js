// Shared colours and styles for every Recharts chart.
// Recharts draws SVG, whose colour props can't read CSS variables, so this file
// is the bridge: each value mirrors a token in src/styles/variables.css.
// Change a token there and update the matching value here.
// Risk colours (high/medium/low) live in src/constants/risk.js.

export const PRIMARY_COLOR = '#1d4ed8' // --color-primary: main series (renewed, retention, value)
export const BASELINE_COLOR = '#64748b' // --color-text-muted: comparison/baseline series (drawn dashed)
export const AXIS_COLOR = '#64748b' // --color-text-muted: axis ticks and labels
export const GRID_COLOR = '#e2e8f0' // --color-border: grid lines, axis lines, hover cursor line
export const SURFACE_COLOR = '#ffffff' // --color-surface: dot fills, gaps between donut slices
export const TEXT_COLOR = '#1e293b' // --color-text: value labels drawn on the chart
export const CURSOR_FILL = '#f5f7fb' // --color-bg: hover band behind a bar

// Dash pattern for the baseline series, so it isn't told apart by colour alone
export const BASELINE_DASH = '6 4'

export const TOOLTIP_STYLE = {
  borderRadius: 8,
  border: `1px solid ${GRID_COLOR}`,
  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
  fontSize: 13,
}
