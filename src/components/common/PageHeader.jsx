import './PageHeader.css'

// Page title + subtitle, with optional context (date, status) on the right.
function PageHeader({ title, subtitle, meta }) {
  return (
    <header className="page-header">
      <div>
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {meta && <div className="page-header__meta">{meta}</div>}
    </header>
  )
}

export default PageHeader
