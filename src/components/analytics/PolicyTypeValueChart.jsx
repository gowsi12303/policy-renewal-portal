import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Card from '../common/Card'
import ChartDataTable from './ChartDataTable'
import {
  AXIS_COLOR,
  CURSOR_FILL,
  GRID_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
  TOOLTIP_STYLE,
} from '../charts/chartTheme'
import './analytics.css'

const formatLakhs = (value) => `₹${value}L`
const ROW_HEIGHT = 40

// data: [{ type, value }] with value in lakhs, largest first.
function PolicyTypeValueChart({ data }) {
  return (
    <Card
      title="Renewal Value by Policy Type"
      subtitle="Premium due for renewal, in lakhs (₹L)."
      className="analytics-page__wide"
    >
      <figure className="analytics-chart" aria-label="Horizontal bar chart of renewal value by policy type">
        <div
          className="analytics-chart__bars"
          style={{ height: data.length * ROW_HEIGHT + 32 }}
          aria-hidden="true"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 48, bottom: 0, left: 8 }}>
              <CartesianGrid stroke={GRID_COLOR} horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={formatLakhs}
                tick={{ fill: AXIS_COLOR, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="type"
                width={96}
                tick={{ fill: AXIS_COLOR, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [formatLakhs(value), 'Renewal value']}
                cursor={{ fill: CURSOR_FILL }}
                contentStyle={TOOLTIP_STYLE}
              />
              <Bar dataKey="value" name="Renewal value" fill={PRIMARY_COLOR} radius={[0, 4, 4, 0]} barSize={20}>
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={formatLakhs}
                  style={{ fill: TEXT_COLOR, fontSize: 12, fontWeight: 600 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ChartDataTable
          caption="Renewal value by policy type, in lakhs of rupees"
          columns={[
            { key: 'type', label: 'Policy type' },
            { key: 'value', label: 'Renewal value', format: formatLakhs },
          ]}
          rows={data}
        />
      </figure>
    </Card>
  )
}

export default PolicyTypeValueChart
