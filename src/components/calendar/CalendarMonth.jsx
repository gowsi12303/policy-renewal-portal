import { buildMonthGrid, formatFullDate, formatMonthYear } from '../../utils/dates'
import { RISK_LABELS } from '../../constants/risk'
import Button from '../common/Button'
import Icon from '../common/Icon'
import '../common/Card.css'
import '../common/RiskBadge.css'
import './calendar.css'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const LEGEND = [
  { variant: 'high', label: 'High Risk' },
  { variant: 'medium', label: 'Medium Risk' },
  { variant: 'low', label: 'Low Risk' },
  { variant: 'renewed', label: 'Renewed' },
]

const FILLED_BARS = { high: 3, medium: 2, low: 1 }

// Renewed policies get a check mark; others show 1-3 risk bars.
// Shape carries the meaning as well as colour.
function EventMarker({ variant }) {
  if (variant === 'renewed') return <Icon name="check" className="cal-marker cal-marker--check" />

  return (
    <span className="risk-badge__bars cal-marker" aria-hidden="true">
      {[1, 2, 3].map((bar) => (
        <span key={bar} className={bar <= FILLED_BARS[variant] ? 'is-filled' : ''} />
      ))}
    </span>
  )
}

function eventVariant(renewal) {
  return renewal.status === 'Renewed' ? 'renewed' : renewal.risk
}

function eventLabel(renewal) {
  return `${renewal.customer}, ${renewal.policyId}, ${RISK_LABELS[renewal.risk]}, ${renewal.status}`
}

// eventsByDate: { "YYYY-MM-DD": [renewal, ...] }
function CalendarMonth({
  year,
  month,
  eventsByDate,
  todayIso,
  selectedDate,
  selectedPolicyId,
  onPrevious,
  onNext,
  onToday,
  onSelectDate,
  onSelectEvent,
}) {
  const weeks = buildMonthGrid(year, month)
  const monthLabel = formatMonthYear(year, month)

  return (
    <section className="card cal" aria-labelledby="cal-month-title">
      <div className="cal__toolbar">
        <div className="cal__nav">
          <Button variant="secondary" className="cal__icon-button" onClick={onPrevious} aria-label="Previous month">
            <Icon name="chevronLeft" />
          </Button>
          <h2 id="cal-month-title" className="cal__title" aria-live="polite">
            {monthLabel}
          </h2>
          <Button variant="secondary" className="cal__icon-button" onClick={onNext} aria-label="Next month">
            <Icon name="chevronRight" />
          </Button>
        </div>
        <Button variant="secondary" onClick={onToday}>
          Today
        </Button>
      </div>

      <ul className="cal-legend" aria-label="Legend">
        {LEGEND.map((item) => (
          <li key={item.variant} className={`cal-legend__item cal-tone--${item.variant}`}>
            <EventMarker variant={item.variant} />
            {item.label}
          </li>
        ))}
      </ul>

      <div className="cal__scroll">
        <table className="cal__grid">
          <caption className="sr-only">Renewals in {monthLabel}</caption>
          <thead>
            <tr>
              {WEEKDAYS.map((weekday) => (
                <th key={weekday} scope="col" abbr={weekday}>
                  <span className="cal__weekday-full">{weekday}</span>
                  <span className="cal__weekday-short" aria-hidden="true">
                    {weekday.slice(0, 3)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week) => (
              <tr key={week[0].iso}>
                {week.map((day) => {
                  const events = eventsByDate[day.iso] ?? []
                  const classes = [
                    'cal__day',
                    !day.inMonth && 'is-outside',
                    day.iso === todayIso && 'is-today',
                    day.iso === selectedDate && 'is-selected',
                  ]
                    .filter(Boolean)
                    .join(' ')

                  return (
                    <td key={day.iso} className={classes}>
                      <button
                        type="button"
                        className="cal__date"
                        onClick={() => onSelectDate(day.iso)}
                        aria-label={`${formatFullDate(day.iso)}${
                          events.length ? `, ${events.length} renewal${events.length > 1 ? 's' : ''}` : ''
                        }`}
                        aria-pressed={day.iso === selectedDate}
                        aria-current={day.iso === todayIso ? 'date' : undefined}
                      >
                        {day.day}
                      </button>

                      {events.map((renewal) => {
                        const variant = eventVariant(renewal)
                        const isSelected = renewal.policyId === selectedPolicyId
                        return (
                          <button
                            key={renewal.policyId}
                            type="button"
                            className={`cal-event cal-tone--${variant} ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => onSelectEvent(renewal)}
                            aria-label={`View renewal: ${eventLabel(renewal)}`}
                            aria-pressed={isSelected}
                          >
                            <span className="cal-event__top">
                              <EventMarker variant={variant} />
                              <span className="cal-event__policy">{renewal.policyId}</span>
                            </span>
                            <span className="cal-event__customer">{renewal.customer}</span>
                          </button>
                        )
                      })}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CalendarMonth
