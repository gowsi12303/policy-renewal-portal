import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../components/common/Button.css'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import '../../components/common/DataTable.css'
import EmptyState from '../../components/common/EmptyState'
import Icon from '../../components/common/Icon'
import PageHeader from '../../components/common/PageHeader'
import RiskBadge from '../../components/common/RiskBadge'
import StatusBadge from '../../components/common/StatusBadge'
import '../../components/common/FilterBar.css'
import { policyDetailsPath } from '../../constants/routes'
import { renewals } from '../../data/renewals'
import { formatCurrency, formatDate } from '../../utils/formatters'

const DEFAULT_FILTERS = { search: '', type: 'all', status: 'all' }
const STATUS_ORDER = ['At Risk', 'Pending', 'On Track', 'Renewed']

// Options come from the data so they always match what's in the table
const POLICY_TYPES = [...new Set(renewals.map((policy) => policy.type))].sort()
const POLICIES = [...renewals].sort((a, b) => a.renewalDate.localeCompare(b.renewalDate))

function matchesFilters(policy, filters) {
  const query = filters.search.trim().toLowerCase()
  if (query) {
    const haystack = `${policy.policyId} ${policy.customer} ${policy.type}`.toLowerCase()
    if (!haystack.includes(query)) return false
  }
  if (filters.type !== 'all' && policy.type !== filters.type) return false
  if (filters.status !== 'all' && policy.status !== filters.status) return false
  return true
}

function PoliciesPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const filtered = useMemo(() => POLICIES.filter((policy) => matchesFilters(policy, filters)), [filters])

  const setFilter = (field, value) => setFilters((current) => ({ ...current, [field]: value }))

  return (
    <div className="page">
      <PageHeader
        title="Policies"
        subtitle="View and manage policies across your broker portfolio."
        meta={<strong>{POLICIES.length} policies in view</strong>}
      />

      <Card title="Policy Portfolio" subtitle="Select a policy to view its full details.">
        <div className="filters" role="search" aria-label="Filter policies">
          <div className="filter-field filter-field--search">
            <label htmlFor="policy-search">Search</label>
            <div className="filter-search">
              <Icon name="search" className="filter-search__icon" />
              <input
                id="policy-search"
                type="search"
                placeholder="Search policy ID, customer or type..."
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-field">
            <label htmlFor="policy-type">Policy type</label>
            <select id="policy-type" value={filters.type} onChange={(e) => setFilter('type', e.target.value)}>
              <option value="all">All types</option>
              {POLICY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="policy-status">Status</label>
            <select
              id="policy-status"
              value={filters.status}
              onChange={(e) => setFilter('status', e.target.value)}
            >
              <option value="all">All status</option>
              {STATUS_ORDER.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <Button className="filters__reset" onClick={() => setFilters(DEFAULT_FILTERS)}>
            Reset Filters
          </Button>
        </div>

        <p className="results-bar" role="status">
          <span>
            Showing <strong>{filtered.length}</strong> of <strong>{POLICIES.length}</strong> policies
          </span>
        </p>

        <div className="data-table-scroll" tabIndex={0} role="region" aria-label="Policies table">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Policy ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Policy Type</th>
                <th scope="col">Renewal Date</th>
                <th scope="col" className="data-table__num">
                  Premium
                </th>
                <th scope="col">Risk</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="data-table__empty">
                    <EmptyState
                      compact
                      headingLevel={3}
                      title="No policies found"
                      description="No policies match your current filters. Try a different search or reset the filters."
                    />
                  </td>
                </tr>
              ) : (
                filtered.map((policy) => (
                  <tr key={policy.policyId}>
                    <td className="data-table__strong">{policy.policyId}</td>
                    <td>{policy.customer}</td>
                    <td>{policy.type}</td>
                    <td>{formatDate(policy.renewalDate)}</td>
                    <td className="data-table__num">{formatCurrency(policy.premium)}</td>
                    <td>
                      <RiskBadge level={policy.risk} />
                    </td>
                    <td>
                      <StatusBadge status={policy.status} />
                    </td>
                    <td>
                      <Link
                        to={policyDetailsPath(policy.policyId)}
                        className="btn btn--secondary btn--sm"
                        aria-label={`View policy ${policy.policyId} for ${policy.customer}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default PoliciesPage
