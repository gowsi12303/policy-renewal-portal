import { Link } from 'react-router-dom'
import { ROUTES, policyDetailsPath } from '../../constants/routes'
import { formatCurrency, formatDate } from '../../utils/formatters'
import '../common/Button.css'
import Card from '../common/Card'
import '../common/DataTable.css'
import StatusBadge from '../common/StatusBadge'
import './dashboard.css'

function UpcomingRenewalsTable({ renewals }) {
  return (
    <Card
      title="Upcoming Renewals"
      subtitle="Policies due for renewal in the next two weeks."
      className="dashboard__table"
      action={
        <Link to={ROUTES.RENEWAL_INTELLIGENCE} className="dashboard-link">
          View all
        </Link>
      }
    >
      {/* tabIndex lets keyboard users scroll the table on small screens */}
      <div className="data-table-scroll" tabIndex={0} role="region" aria-label="Upcoming renewals table">
        <table className="data-table data-table--narrow">
          <thead>
            <tr>
              <th scope="col">Policy</th>
              <th scope="col">Customer</th>
              <th scope="col">Type</th>
              <th scope="col">Renewal Date</th>
              <th scope="col" className="data-table__num">
                Premium
              </th>
              <th scope="col">Status</th>
              <th scope="col">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {renewals.map((renewal) => (
              <tr key={renewal.policyId}>
                <td className="data-table__strong">{renewal.policyId}</td>
                <td>{renewal.customer}</td>
                <td>{renewal.type}</td>
                <td>{formatDate(renewal.renewalDate)}</td>
                <td className="data-table__num">{formatCurrency(renewal.premium)}</td>
                <td>
                  <StatusBadge status={renewal.status} />
                </td>
                <td>
                  <Link
                    to={policyDetailsPath(renewal.policyId)}
                    className="btn btn--secondary btn--sm"
                    aria-label={`View policy ${renewal.policyId} for ${renewal.customer}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default UpcomingRenewalsTable
