import PolicyTypeValueChart from '../../components/analytics/PolicyTypeValueChart'
import RenewalInsights from '../../components/analytics/RenewalInsights'
import RetentionTrendChart from '../../components/analytics/RetentionTrendChart'
import PageHeader from '../../components/common/PageHeader'
import RenewalOverviewChart from '../../components/charts/RenewalOverviewChart'
import RiskDistributionChart from '../../components/charts/RiskDistributionChart'
import KpiCard from '../../components/common/KpiCard'
import { analyticsKpis, renewalInsights, retentionTrend, valueByPolicyType } from '../../data/analytics'
import { renewalTrend } from '../../data/dashboardData'
import { RENEWALS_AS_OF, riskDistribution } from '../../data/renewals'
import { formatMonthYear, monthOf } from '../../utils/dates'
import './AnalyticsPage.css'

const REPORT_MONTH = monthOf(RENEWALS_AS_OF)

function AnalyticsPage() {
  return (
    <div className="page">
      <PageHeader
        title="Analytics"
        subtitle="Understand renewal performance, retention trends and portfolio risk."
        meta={<strong>{formatMonthYear(REPORT_MONTH.year, REPORT_MONTH.month)}</strong>}
      />

      <section aria-labelledby="analytics-kpi-heading">
        <h2 id="analytics-kpi-heading" className="sr-only">
          Key metrics
        </h2>
        <div className="analytics-page__kpis">
          {analyticsKpis.map((kpi) => (
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

      <div className="analytics-page__grid">
        <RenewalOverviewChart
          data={renewalTrend}
          title="Renewal Performance"
          subtitle="Renewals due versus successfully renewed."
        />
        <RetentionTrendChart data={retentionTrend} />
        <PolicyTypeValueChart data={valueByPolicyType} />
        <RiskDistributionChart
          data={riskDistribution}
          title="Portfolio Risk Distribution"
          subtitle="Upcoming renewals by risk level, with share of total."
        />
        <RenewalInsights insights={renewalInsights} />
      </div>
    </div>
  )
}

export default AnalyticsPage
