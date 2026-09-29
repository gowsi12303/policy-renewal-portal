import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Card from '../common/Card'
import ChartDataTable from './ChartDataTable'
import { AXIS_COLOR, GRID_COLOR, PRIMARY_COLOR, SURFACE_COLOR, TOOLTIP_STYLE } from '../charts/chartTheme'
import './analytics.css'

// The rates sit in a narrow band, so the axis is zoomed in (and says so).
const Y_DOMAIN = [88, 93]
const formatPercent = (value) => `${value.toFixed(1)}%`

function RetentionTrendChart({ data }) {
  return (
    <Card title="Retention Trend" subtitle="Monthly customer retention rate.">
      <figure className="analytics-chart" aria-label="Area chart of monthly retention rate, April to September">
        <div className="analytics-chart__plot" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
              <defs>
                <linearGradient id="retention-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PRIMARY_COLOR} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={PRIMARY_COLOR} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={GRID_COLOR} vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: AXIS_COLOR, fontSize: 12 }}
                axisLine={{ stroke: GRID_COLOR }}
                tickLine={false}
              />
              <YAxis
                domain={Y_DOMAIN}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: AXIS_COLOR, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip
                formatter={(value) => [formatPercent(value), 'Retention rate']}
                cursor={{ stroke: GRID_COLOR }}
                contentStyle={TOOLTIP_STYLE}
              />
              <Area
                type="monotone"
                dataKey="rate"
                name="Retention rate"
                stroke={PRIMARY_COLOR}
                strokeWidth={2}
                fill="url(#retention-fill)"
                baseValue={Y_DOMAIN[0]}
                dot={{ r: 4, strokeWidth: 2, fill: SURFACE_COLOR }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: SURFACE_COLOR }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <ChartDataTable
          caption="Monthly retention rate, April to September 2026"
          columns={[
            { key: 'month', label: 'Month' },
            { key: 'rate', label: 'Retention rate', format: formatPercent },
          ]}
          rows={data}
        />
        <figcaption className="analytics-chart__note">
          Axis starts at {Y_DOMAIN[0]}% to show month-to-month change.
        </figcaption>
      </figure>
    </Card>
  )
}

export default RetentionTrendChart
