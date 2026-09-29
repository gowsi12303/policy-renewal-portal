import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { RISK_COLORS } from '../../constants/risk'
import Card from '../common/Card'
import { SURFACE_COLOR } from './chartTheme'
import './RiskDistributionChart.css'

const RADIAN = Math.PI / 180

// Point on the outer edge of the hovered segment, at its middle angle.
// Recharts passes cx, cy, midAngle and outerRadius for the hovered sector.
function segmentEdgePoint({ cx, cy, midAngle, outerRadius }) {
  return {
    x: cx + outerRadius * Math.cos(-midAngle * RADIAN),
    y: cy + outerRadius * Math.sin(-midAngle * RADIAN),
  }
}

// Compact two-line tooltip, centred on the segment's outer edge. Keeping it
// narrow means it never reaches back over the "86 renewals" centre label.
function RiskTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]

  return (
    <div className="risk-chart__tooltip">
      <strong>{name}:</strong>
      <span>{value} policies</span>
    </div>
  )
}

// Used on Renewal Intelligence ("Risk Distribution") and Analytics ("Portfolio Risk Distribution").
function RiskDistributionChart({
  data,
  title = 'Risk Distribution',
  subtitle = 'Upcoming renewals grouped by risk level.',
}) {
  const [tooltipAnchor, setTooltipAnchor] = useState(null)
  const total = data.reduce((sum, item) => sum + item.count, 0)
  const withShare = data.map((item) => ({
    ...item,
    percent: Math.round((item.count / total) * 100),
  }))

  return (
    <Card title={title} subtitle={subtitle}>
      <figure
        className="risk-chart"
        aria-label={`Donut chart of ${total} upcoming renewals by risk level`}
      >
        <div className="risk-chart__plot" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={withShare}
                dataKey="count"
                nameKey="label"
                innerRadius="64%"
                outerRadius="92%"
                paddingAngle={2}
                stroke={SURFACE_COLOR}
                strokeWidth={2}
                startAngle={90}
                endAngle={-270}
                isAnimationActive={false}
                onMouseEnter={(sector) => setTooltipAnchor(segmentEdgePoint(sector))}
                onMouseLeave={() => setTooltipAnchor(null)}
              >
                {withShare.map((item) => (
                  <Cell key={item.level} fill={RISK_COLORS[item.level]} />
                ))}
              </Pie>
              {/* The tooltip follows the hovered segment: it is placed on that
                  segment's outer edge rather than at the cursor. */}
              <Tooltip
                content={<RiskTooltip />}
                position={tooltipAnchor ?? undefined}
                isAnimationActive={false}
                wrapperStyle={{ zIndex: 1, pointerEvents: 'none' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="risk-chart__center">
            <span className="risk-chart__total">{total}</span>
            <span className="risk-chart__caption">renewals</span>
          </div>
        </div>

        {/* Text legend doubles as the accessible description of the chart */}
        <figcaption>
          <ul className="risk-legend">
            {withShare.map((item) => (
              <li key={item.level} className="risk-legend__item">
                <span
                  className="risk-legend__swatch"
                  style={{ background: RISK_COLORS[item.level] }}
                  aria-hidden="true"
                />
                <span className="risk-legend__label">{item.label}</span>
                <span className="risk-legend__count">{item.count}</span>
                <span className="risk-legend__percent">{item.percent}%</span>
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </Card>
  )
}

export default RiskDistributionChart
