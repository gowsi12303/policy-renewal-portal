import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Card from '../common/Card'
import {
  AXIS_COLOR,
  BASELINE_COLOR,
  BASELINE_DASH,
  GRID_COLOR,
  PRIMARY_COLOR,
  SURFACE_COLOR,
  TOOLTIP_STYLE,
} from './chartTheme'
import './RenewalOverviewChart.css'

// "Renewals Due" is the baseline (muted, dashed); "Renewed" is the main series (brand blue).
// Colour plus line style keeps the two lines distinguishable without relying on colour alone.
const SERIES = [
  { key: 'due', name: 'Renewals Due', color: BASELINE_COLOR, dash: BASELINE_DASH },
  { key: 'renewed', name: 'Renewed', color: PRIMARY_COLOR },
]

// Used on the Dashboard ("Renewal Overview") and Analytics ("Renewal Performance").
function RenewalOverviewChart({
  data,
  title = 'Renewal Overview',
  subtitle = 'Policy renewals and completed renewals over the last 6 months.',
}) {
  return (
    <Card title={title} subtitle={subtitle}>
      <figure className="renewal-chart" aria-label="Line chart of renewals due and renewed per month, April to September">
        <div className="renewal-chart__plot" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 16, bottom: 24, left: 8 }}>
              <CartesianGrid stroke={GRID_COLOR} vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: AXIS_COLOR, fontSize: 12 }}
                axisLine={{ stroke: GRID_COLOR }}
                tickLine={false}
                label={{ value: 'Month (2026)', position: 'insideBottom', offset: -16, fill: AXIS_COLOR, fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: AXIS_COLOR, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={48}
                label={{ value: 'Policies', angle: -90, position: 'insideLeft', fill: AXIS_COLOR, fontSize: 12 }}
              />
              <Tooltip
                cursor={{ stroke: GRID_COLOR, strokeWidth: 1 }}
                contentStyle={TOOLTIP_STYLE}
              />
              <Legend verticalAlign="top" align="right" height={32} iconType="plainline" wrapperStyle={{ fontSize: 13 }} />
              {SERIES.map((series) => (
                <Line
                  key={series.key}
                  type="monotone"
                  dataKey={series.key}
                  name={series.name}
                  stroke={series.color}
                  strokeWidth={2}
                  strokeDasharray={series.dash}
                  // Dots stay solid even on the dashed line
                  dot={{ r: 4, strokeWidth: 2, fill: SURFACE_COLOR, strokeDasharray: '0' }}
                  activeDot={{ r: 6, strokeWidth: 2, stroke: SURFACE_COLOR, strokeDasharray: '0' }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Same numbers as a table for screen reader users */}
        <table className="sr-only">
          <caption>Monthly renewals, April to September 2026</caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              {SERIES.map((series) => (
                <th key={series.key} scope="col">
                  {series.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.month}>
                <th scope="row">{row.month}</th>
                {SERIES.map((series) => (
                  <td key={series.key}>{row[series.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </Card>
  )
}

export default RenewalOverviewChart
