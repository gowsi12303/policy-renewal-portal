import './StatusBadge.css'

// Maps a renewal or document status to its colour variant.
const STATUS_VARIANTS = {
  'On Track': 'success',
  Pending: 'warning',
  'At Risk': 'danger',
  Renewed: 'info',
  Received: 'success',
  'Pending Review': 'warning',
  Requested: 'info',
}

function StatusBadge({ status }) {
  const variant = STATUS_VARIANTS[status] ?? 'neutral'

  return <span className={`status-badge status-badge--${variant}`}>{status}</span>
}

export default StatusBadge
