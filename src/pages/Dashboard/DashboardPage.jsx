import RenewalOverviewChart from '../../components/charts/RenewalOverviewChart'
import KpiCard from '../../components/common/KpiCard'
import RecentActivity from '../../components/common/RecentActivity'
import AttentionRequired from '../../components/dashboard/AttentionRequired'
import QuickActions from '../../components/dashboard/QuickActions'
import UpcomingRenewalsTable from '../../components/dashboard/UpcomingRenewalsTable'
import {
  atRiskPolicies,
  kpis,
  quickActions,
  recentActivity,
  renewalTrend,
  upcomingRenewals,
} from '../../data/dashboardData'
import { RENEWALS_AS_OF } from '../../data/renewals'
import { formatLongDate } from '../../utils/dates'
import './DashboardPage.css'

function DashboardPage() {
  return (
    <div className="page">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">
            Monitor your policy portfolio, upcoming renewals and client retention.
          </p>
        </div>
        <div className="dashboard__status">
          {/* Fixed demo date shared with the other pages, so the header matches the mock data */}
          <time dateTime={RENEWALS_AS_OF} className="dashboard__date">
            {formatLongDate(RENEWALS_AS_OF)}
          </time>
          <span className="dashboard__status-label">Portfolio overview</span>
        </div>
      </header>

      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">
          Key metrics
        </h2>
        <div className="dashboard__kpis">
          {kpis.map((kpi) => (
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

      <div className="dashboard__grid">
        <RenewalOverviewChart data={renewalTrend} />
        <AttentionRequired policies={atRiskPolicies} />
        <UpcomingRenewalsTable renewals={upcomingRenewals} />
        <QuickActions actions={quickActions} />
        <RecentActivity activities={recentActivity} />
      </div>
    </div>
  )
}

export default DashboardPage
