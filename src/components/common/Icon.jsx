// Small outline icon set (24x24, stroke based). Add new icons to ICON_PATHS.
const ICON_PATHS = {
  document: ['M7 3h7l5 5v13H7z', 'M14 3v5h5', 'M10 13h6', 'M10 17h6'],
  calendar: [
    'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z',
    'M3 10h18',
    'M8 3v4',
    'M16 3v4',
  ],
  alert: ['M12 3 2 21h20L12 3z', 'M12 10v5', 'M12 18h.01'],
  shield: ['M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3z', 'm9 12 2 2 4-4'],
  trendUp: ['M3 17l6-6 4 4 8-8', 'M15 7h6v6'],
  refresh: ['M20 11a8 8 0 0 0-14.9-3', 'M4 4v4h4', 'M4 13a8 8 0 0 0 14.9 3', 'M20 20v-4h-4'],
  plus: ['M12 5v14', 'M5 12h14'],
  search: ['M4 11a7 7 0 1 0 14 0a7 7 0 1 0 -14 0', 'M20 20l-4-4'],
  bell: ['M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z', 'M10 21h4'],
  check: ['M5 12l5 5 9-10'],
  user: ['M8 8a4 4 0 1 0 8 0a4 4 0 1 0 -8 0', 'M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8'],
  upload: ['M12 16V4', 'M7 9l5-5 5 5', 'M4 20h16'],
  arrowRight: ['M5 12h14', 'M13 6l6 6-6 6'],
  rupee: ['M7 4h11', 'M7 9h11', 'M7 4h3a5 5 0 0 1 0 10H7l8 7'],
  message: ['M4 5h16v11H9l-5 4z'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  chevronLeft: ['M15 6l-6 6 6 6'],
  chevronRight: ['M9 6l6 6-6 6'],
  grid: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],
  users: [
    'M6 8a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
    'M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6',
    'M16 5.2a3 3 0 0 1 0 5.6',
    'M18 14.5c1.8.8 3 2.6 3 4.5',
  ],
  chart: ['M4 20h16', 'M7 16v-5', 'M12 16V6', 'M17 16v-8'],
  edit: ['M4 20h4L19 9l-4-4L4 16z', 'M13 7l4 4'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  logout: ['M10 4H5v16h5', 'M15 8l4 4-4 4', 'M19 12H9'],
}

function Icon({ name, className = '' }) {
  const paths = ICON_PATHS[name] ?? []

  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export default Icon
