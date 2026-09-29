import { useMemo, useState } from 'react'
import Card from '../../components/common/Card'
import PageHeader from '../../components/common/PageHeader'
import Toast from '../../components/common/Toast'
import RiskDistributionChart from '../../components/charts/RiskDistributionChart'
import '../../components/common/FilterBar.css'
import KpiCard from '../../components/common/KpiCard'
import PriorityRenewals from '../../components/renewals/PriorityRenewals'
import RenewalFilters from '../../components/renewals/RenewalFilters'
import RenewalsTable from '../../components/renewals/RenewalsTable'
import RiskSignals from '../../components/renewals/RiskSignals'
import {
  PORTFOLIO_UPCOMING_RENEWALS,
  RENEWALS_AS_OF,
  priorityPolicyIds,
  renewalKpis,
  renewals,
  riskDistribution,
  riskSignals,
} from '../../data/renewals'
import { useToast } from '../../hooks/useToast'
import { daysBetween, formatLongDate } from '../../utils/dates'
import './RenewalIntelligencePage.css'

const DEFAULT_FILTERS = {
  search: '',
  risk: 'all',
  status: 'all',
  period: 'all',
}

// Add "days left" once, relative to the mock data's as-of date.
const RENEWAL_ROWS = renewals.map((renewal) => ({
  ...renewal,
  daysLeft: daysBetween(RENEWALS_AS_OF, renewal.renewalDate),
}))

const PRIORITY_POLICIES = priorityPolicyIds.map((id) =>
  RENEWAL_ROWS.find((row) => row.policyId === id),
)

function matchesFilters(row, filters) {
  const query = filters.search.trim().toLowerCase()
  if (query) {
    const haystack = `${row.policyId} ${row.customer} ${row.type}`.toLowerCase()
    if (!haystack.includes(query)) return false
  }
  if (filters.risk !== 'all' && row.risk !== filters.risk) return false
  if (filters.status !== 'all' && row.status !== filters.status) return false
  if (filters.period !== 'all') {
    const maxDays = Number(filters.period)
    if (row.daysLeft < 0 || row.daysLeft > maxDays) return false
  }
  return true
}

function RenewalIntelligencePage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const { toast, showToast, closeToast } = useToast()

  const filteredRows = useMemo(
    () => RENEWAL_ROWS.filter((row) => matchesFilters(row, filters)),
    [filters],
  )

  const handleFilterChange = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  // Demo only: no message is actually sent.
  const handleAction = (row) => {
    showToast(`"${row.action}" logged for ${row.customer} (${row.policyId}). Demo mode: nothing was sent.`)
  }

  return (
    <div className="page">
      <PageHeader
        title="Renewal Intelligence"
        subtitle="Prioritize upcoming renewals with risk insights and recommended actions."
        meta={
          <>
            <strong>
              <time dateTime={RENEWALS_AS_OF}>{formatLongDate(RENEWALS_AS_OF)}</time>
            </strong>
            <span>Renewal pipeline · Next 60 days</span>
          </>
        }
      />

      <section aria-labelledby="renewal-kpi-heading">
        <h2 id="renewal-kpi-heading" className="sr-only">
          Renewal summary
        </h2>
        <div className="renewals-page__kpis">
          {renewalKpis.map((kpi) => (
            <KpiCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              detail={kpi.detail}
              icon={kpi.icon}
              tone={kpi.tone}
            />
          ))}
        </div>
      </section>

      <div className="renewals-page__insights">
        <RiskDistributionChart data={riskDistribution} />
        <RiskSignals signals={riskSignals} />
      </div>

      <Card
        title="Renewal Pipeline"
        subtitle="Click a row to open the policy. Use the action button to log a follow-up."
      >
        <RenewalFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />

        <div className="results-bar">
          <p role="status">
            Showing <strong>{filteredRows.length}</strong> of{' '}
            <strong>{RENEWAL_ROWS.length}</strong> sample renewals from{' '}
            <strong>{PORTFOLIO_UPCOMING_RENEWALS}</strong> upcoming in the portfolio
          </p>
        </div>

        <RenewalsTable rows={filteredRows} onAction={handleAction} />
      </Card>

      <PriorityRenewals policies={PRIORITY_POLICIES} />

      <Toast toast={toast} onClose={closeToast} />
    </div>
  )
}

export default RenewalIntelligencePage
