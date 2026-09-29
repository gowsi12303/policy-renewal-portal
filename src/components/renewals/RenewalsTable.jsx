import { Link, useNavigate } from 'react-router-dom'
import { policyDetailsPath } from '../../constants/routes'
import { formatCurrency, formatDate } from '../../utils/formatters'
import Button from '../common/Button'
import RiskBadge from '../common/RiskBadge'
import StatusBadge from '../common/StatusBadge'
import '../common/DataTable.css'
import './renewals.css'

function formatDaysLeft(days) {
  if (days < 0) return 'Overdue'
  if (days === 0) return 'Today'
  return days === 1 ? '1 day' : `${days} days`
}

// rows: renewals with a precomputed `daysLeft`. onAction(renewal) handles the action button.
function RenewalsTable({ rows, onAction }) {
  const navigate = useNavigate()

  return (
    <div className="data-table-scroll" tabIndex={0} role="region" aria-label="Renewal policies table">
      <table className="data-table data-table--wide">
        <thead>
          <tr>
            <th scope="col">Policy</th>
            <th scope="col">Customer</th>
            <th scope="col">Type</th>
            <th scope="col">Renewal Date</th>
            <th scope="col" className="data-table__num">
              Days Left
            </th>
            <th scope="col" className="data-table__num">
              Premium
            </th>
            <th scope="col">Risk</th>
            <th scope="col">Status</th>
            <th scope="col">Recommended Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={9} className="data-table__message">
                No renewals match your current filters.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              // Mouse users can click anywhere on the row; keyboard users use the policy link.
              <tr
                key={row.policyId}
                className="data-table__row--clickable"
                onClick={() => navigate(policyDetailsPath(row.policyId))}
              >
                <td>
                  <Link
                    to={policyDetailsPath(row.policyId)}
                    className="data-table__link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {row.policyId}
                  </Link>
                </td>
                <td className="renewals-grid__customer">{row.customer}</td>
                <td>{row.type}</td>
                <td>{formatDate(row.renewalDate)}</td>
                <td
                  className={`data-table__num ${row.daysLeft <= 7 ? 'data-table__urgent' : ''}`}
                >
                  {formatDaysLeft(row.daysLeft)}
                </td>
                <td className="data-table__num">{formatCurrency(row.premium)}</td>
                <td>
                  <RiskBadge level={row.risk} />
                </td>
                <td>
                  <StatusBadge status={row.status} />
                </td>
                <td>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAction(row)
                    }}
                    aria-label={`${row.action} for ${row.customer}, policy ${row.policyId}`}
                  >
                    {row.action}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RenewalsTable
