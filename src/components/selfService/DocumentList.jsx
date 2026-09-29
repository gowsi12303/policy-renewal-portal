import { formatDate } from '../../utils/formatters'
import Button from '../common/Button'
import Card from '../common/Card'
import '../common/DataTable.css'
import StatusBadge from '../common/StatusBadge'
import './selfService.css'

// onAction(document) is called when a row's action button is clicked.
function DocumentList({ documents, onAction }) {
  return (
    <Card title="Renewal Documents" subtitle="Documents received and requested for upcoming renewals.">
      <div className="data-table-scroll" tabIndex={0} role="region" aria-label="Renewal documents table">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Document</th>
              <th scope="col">Policy</th>
              <th scope="col">Uploaded By</th>
              <th scope="col">Uploaded Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="data-table__strong">{doc.name}</td>
                <td>{doc.policyId}</td>
                <td>{doc.uploadedBy}</td>
                <td>{formatDate(doc.uploadedDate)}</td>
                <td>
                  <StatusBadge status={doc.status} />
                </td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => onAction(doc)}
                    aria-label={`${doc.action}: ${doc.name} for ${doc.policyId}`}
                  >
                    {doc.action}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default DocumentList
