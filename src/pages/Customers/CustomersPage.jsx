import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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
import { customerDetails } from '../../data/customers'
import { renewals } from '../../data/renewals'
import { formatDate } from '../../utils/formatters'
import { preferredScrollBehavior } from '../../utils/motion'
import './CustomersPage.css'

const RISK_RANK = { high: 3, medium: 2, low: 1 }

// One row per customer, built from their renewing policies
const CUSTOMERS = Object.values(
  renewals.reduce((groups, policy) => {
    const group = groups[policy.customer] ?? { name: policy.customer, policies: [] }
    group.policies.push(policy)
    groups[policy.customer] = group
    return groups
  }, {}),
)
  .map((customer) => {
    const byDate = [...customer.policies].sort((a, b) => a.renewalDate.localeCompare(b.renewalDate))
    const highestRisk = customer.policies.reduce((top, policy) =>
      RISK_RANK[policy.risk] > RISK_RANK[top.risk] ? policy : top,
    ).risk
    return {
      ...customer,
      ...customerDetails[customer.name],
      nextRenewal: byDate[0],
      risk: highestRisk,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

function CustomersPage() {
  const [search, setSearch] = useState('')
  const [selectedName, setSelectedName] = useState(null)
  const detailsRef = useRef(null)

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return CUSTOMERS
    return CUSTOMERS.filter((customer) =>
      `${customer.name} ${customer.contact} ${customer.city}`.toLowerCase().includes(query),
    )
  }, [search])

  const selected = CUSTOMERS.find((customer) => customer.name === selectedName) ?? null

  const handleView = (name) => {
    setSelectedName(name)
    // Below 1024px the details card is under the table (see .page__split), so bring it into view
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      detailsRef.current?.scrollIntoView({ behavior: preferredScrollBehavior(), block: 'start' })
    }
    detailsRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="page">
      <PageHeader
        title="Customers"
        subtitle="Search and manage your broker customer portfolio."
        meta={<strong>{CUSTOMERS.length} customers with upcoming renewals</strong>}
      />

      <div className="page__split">
        <Card title="Customer Portfolio" subtitle="Select a customer to see contact and policy details.">
          <div className="filters customers-search" role="search" aria-label="Search customers">
            <div className="filter-field">
              <label htmlFor="customer-search">Search</label>
              <div className="filter-search">
                <Icon name="search" className="filter-search__icon" />
                <input
                  id="customer-search"
                  type="search"
                  placeholder="Search customer, contact or city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <p className="results-bar" role="status">
            <span>
              Showing <strong>{filtered.length}</strong> of <strong>{CUSTOMERS.length}</strong> customers
            </span>
          </p>

          <div className="data-table-scroll" tabIndex={0} role="region" aria-label="Customers table">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Customer</th>
                  <th scope="col" className="data-table__num">
                    Active Policies
                  </th>
                  <th scope="col">Upcoming Renewal</th>
                  <th scope="col">Renewal Status</th>
                  <th scope="col">Risk</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="data-table__empty">
                      <EmptyState
                        compact
                        headingLevel={3}
                        title="No customers found"
                        description="No customers match your search. Try a different name, contact or city."
                      />
                    </td>
                  </tr>
                ) : (
                  filtered.map((customer) => (
                    <tr key={customer.name} className={customer.name === selectedName ? 'is-selected' : ''}>
                      <td>
                        <span className="data-table__strong">{customer.name}</span>
                        <span className="customers-table__city">{customer.city}</span>
                      </td>
                      <td className="data-table__num">{customer.activePolicies}</td>
                      <td>
                        {formatDate(customer.nextRenewal.renewalDate)}
                        <span className="customers-table__city">{customer.nextRenewal.policyId}</span>
                      </td>
                      <td>
                        <StatusBadge status={customer.nextRenewal.status} />
                      </td>
                      <td>
                        <RiskBadge level={customer.risk} />
                      </td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() => handleView(customer.name)}
                          aria-label={`View details for ${customer.name}`}
                          aria-controls="customer-details"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <div id="customer-details" ref={detailsRef} tabIndex={-1} className="customers-details">
          <Card title="Customer Details">
            {selected ? (
              <div className="customer-card">
                <div className="customer-card__header">
                  <span className="customer-card__avatar" aria-hidden="true">
                    {selected.name.charAt(0)}
                  </span>
                  <div>
                    <p className="customer-card__name">{selected.name}</p>
                    <p className="customer-card__meta">
                      {selected.city} · Customer since {selected.customerSince}
                    </p>
                  </div>
                </div>

                <dl className="customer-card__list">
                  <div>
                    <dt>Primary contact</dt>
                    <dd>{selected.contact}</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd className="customer-card__email">{selected.email}</dd>
                  </div>
                  <div>
                    <dt>Active policies</dt>
                    <dd>{selected.activePolicies}</dd>
                  </div>
                  <div>
                    <dt>Highest risk</dt>
                    <dd>
                      <RiskBadge level={selected.risk} />
                    </dd>
                  </div>
                </dl>

                <div>
                  <h3 className="customer-card__subheading">Upcoming renewals</h3>
                  <ul className="customer-card__policies">
                    {selected.policies.map((policy) => (
                      <li key={policy.policyId}>
                        <Link to={policyDetailsPath(policy.policyId)} className="customer-card__policy">
                          <span>
                            <span className="customer-card__policy-id">{policy.policyId}</span>
                            <span className="customer-card__policy-meta">
                              {policy.type} · Renews {formatDate(policy.renewalDate)}
                            </span>
                          </span>
                          <Icon name="arrowRight" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <EmptyState
                compact
                icon="users"
                headingLevel={3}
                title="No customer selected"
                description="Choose View on a customer to see their contact details and policies."
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CustomersPage
