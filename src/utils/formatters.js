const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

// 248000 -> "₹2,48,000"
export function formatCurrency(amount) {
  return currencyFormatter.format(amount)
}

// "2026-09-30" -> "Sep 30, 2026"
// Builds the date from its parts so it never shifts a day because of time zones.
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}
