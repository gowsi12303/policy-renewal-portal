import Button from '../common/Button'
import '../common/FilterBar.css'
import Icon from '../common/Icon'

const RISK_OPTIONS = [
  { value: 'all', label: 'All Risk' },
  { value: 'high', label: 'High Risk' },
  { value: 'medium', label: 'Medium Risk' },
  { value: 'low', label: 'Low Risk' },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'At Risk', label: 'At Risk' },
  { value: 'Pending', label: 'Pending' },
  { value: 'On Track', label: 'On Track' },
  { value: 'Renewed', label: 'Renewed' },
]

const PERIOD_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: '7', label: 'Next 7 Days' },
  { value: '30', label: 'Next 30 Days' },
  { value: '60', label: 'Next 60 Days' },
]

function SelectFilter({ id, label, value, options, onChange }) {
  return (
    <div className="filter-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// filters: { search, risk, status, period }. onChange(field, value) updates one filter.
function RenewalFilters({ filters, onChange, onReset }) {
  return (
    <div className="filters" role="search" aria-label="Filter renewals">
      <div className="filter-field filter-field--search">
        <label htmlFor="renewal-search">Search</label>
        <div className="filter-search">
          <Icon name="search" className="filter-search__icon" />
          <input
            id="renewal-search"
            type="search"
            placeholder="Search policy, customer or policy type..."
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
          />
        </div>
      </div>

      <SelectFilter
        id="renewal-risk"
        label="Risk"
        value={filters.risk}
        options={RISK_OPTIONS}
        onChange={(value) => onChange('risk', value)}
      />
      <SelectFilter
        id="renewal-status"
        label="Status"
        value={filters.status}
        options={STATUS_OPTIONS}
        onChange={(value) => onChange('status', value)}
      />
      <SelectFilter
        id="renewal-period"
        label="Renewal period"
        value={filters.period}
        options={PERIOD_OPTIONS}
        onChange={(value) => onChange('period', value)}
      />

      <Button className="filters__reset" onClick={onReset}>
        Reset Filters
      </Button>
    </div>
  )
}

export default RenewalFilters
