import { useState } from 'react'
import CalendarMonth from '../../components/calendar/CalendarMonth'
import RenewalDetailsCard from '../../components/calendar/RenewalDetailsCard'
import UpcomingRenewalsList from '../../components/calendar/UpcomingRenewalsList'
import PageHeader from '../../components/common/PageHeader'
import { RENEWALS_AS_OF, renewals } from '../../data/renewals'
import { formatMonthYear, monthOf, shiftMonth } from '../../utils/dates'
import './RenewalCalendarPage.css'

// The mock data's as-of date acts as "today" so the demo always opens on September 2026.
const TODAY = RENEWALS_AS_OF
const TODAY_MONTH = monthOf(TODAY)
const UPCOMING_COUNT = 5

// { "YYYY-MM-DD": [renewal, ...] }
const EVENTS_BY_DATE = renewals.reduce((groups, renewal) => {
  groups[renewal.renewalDate] = [...(groups[renewal.renewalDate] ?? []), renewal]
  return groups
}, {})

// ISO dates sort correctly as strings
const UPCOMING = renewals
  .filter((renewal) => renewal.renewalDate >= TODAY)
  .sort((a, b) => a.renewalDate.localeCompare(b.renewalDate))
  .slice(0, UPCOMING_COUNT)

function RenewalCalendarPage() {
  const [view, setView] = useState(TODAY_MONTH)
  const [selectedDate, setSelectedDate] = useState(TODAY)
  const [selectedPolicyId, setSelectedPolicyId] = useState(null)

  const selectedRenewal = renewals.find((renewal) => renewal.policyId === selectedPolicyId) ?? null

  // Selecting from the upcoming list may jump to another month, so show that month.
  const selectRenewal = (renewal) => {
    setSelectedPolicyId(renewal.policyId)
    setSelectedDate(renewal.renewalDate)
    setView(monthOf(renewal.renewalDate))
  }

  const goToToday = () => {
    setView(TODAY_MONTH)
    setSelectedDate(TODAY)
  }

  return (
    <div className="page">
      <PageHeader
        title="Renewal Calendar"
        subtitle="Track upcoming renewals, deadlines and broker follow-ups."
        meta={<strong>{formatMonthYear(TODAY_MONTH.year, TODAY_MONTH.month)}</strong>}
      />

      <div className="calendar-page__layout">
        <CalendarMonth
          year={view.year}
          month={view.month}
          eventsByDate={EVENTS_BY_DATE}
          todayIso={TODAY}
          selectedDate={selectedDate}
          selectedPolicyId={selectedPolicyId}
          onPrevious={() => setView((current) => shiftMonth(current, -1))}
          onNext={() => setView((current) => shiftMonth(current, 1))}
          onToday={goToToday}
          onSelectDate={setSelectedDate}
          onSelectEvent={selectRenewal}
        />

        <div className="calendar-page__side">
          <RenewalDetailsCard renewal={selectedRenewal} />
          <UpcomingRenewalsList
            renewals={UPCOMING}
            selectedPolicyId={selectedPolicyId}
            onSelect={selectRenewal}
          />
        </div>
      </div>
    </div>
  )
}

export default RenewalCalendarPage
