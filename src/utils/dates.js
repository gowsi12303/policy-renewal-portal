// Parses "YYYY-MM-DD" as a local date (avoids time-zone day shifts).
function parseIsoDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

// Whole days from `fromIso` to `toIso`. Negative if `toIso` is in the past.
export function daysBetween(fromIso, toIso) {
  return Math.round((parseIsoDate(toIso) - parseIsoDate(fromIso)) / MS_PER_DAY)
}

// "2026-09-28" -> "Monday, September 28, 2026"
export function formatLongDate(isoDate) {
  return parseIsoDate(isoDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// "2026-09-30" -> "September 30, 2026"
export function formatFullDate(isoDate) {
  return parseIsoDate(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// ("2026-09-30", -1) -> "2025-09-30"
export function addYears(isoDate, years) {
  const date = parseIsoDate(isoDate)
  date.setFullYear(date.getFullYear() + years)
  return toIsoDate(date)
}

// Local Date -> "YYYY-MM-DD"
export function toIsoDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

// "2026-09-28" -> { year: 2026, month: 8 } (month is 0-based, like Date)
export function monthOf(isoDate) {
  const date = parseIsoDate(isoDate)
  return { year: date.getFullYear(), month: date.getMonth() }
}

// (2026, 8) -> "September 2026"
export function formatMonthYear(year, month) {
  return new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// Moves a { year, month } by `offset` months (Date handles the year rollover).
export function shiftMonth({ year, month }, offset) {
  const date = new Date(year, month + offset, 1)
  return { year: date.getFullYear(), month: date.getMonth() }
}

// Builds the weeks shown in a month view, Sunday first. Includes the trailing
// days of the previous month and leading days of the next to fill each week.
// Returns [[{ iso, day, inMonth }, ...7], ...]
export function buildMonthGrid(year, month) {
  const leadingDays = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const weekCount = Math.ceil((leadingDays + daysInMonth) / 7)

  const weeks = []
  for (let week = 0; week < weekCount; week += 1) {
    const days = []
    for (let weekday = 0; weekday < 7; weekday += 1) {
      const date = new Date(year, month, 1 - leadingDays + week * 7 + weekday)
      days.push({
        iso: toIsoDate(date),
        day: date.getDate(),
        inMonth: date.getMonth() === month,
      })
    }
    weeks.push(days)
  }
  return weeks
}
