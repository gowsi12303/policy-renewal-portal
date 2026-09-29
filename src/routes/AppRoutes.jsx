import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'

import LoginPage from '../pages/Login/LoginPage'
import DashboardPage from '../pages/Dashboard/DashboardPage'
import RenewalIntelligencePage from '../pages/RenewalIntelligence/RenewalIntelligencePage'
import PoliciesPage from '../pages/Policies/PoliciesPage'
import PolicyDetailsPage from '../pages/PolicyDetails/PolicyDetailsPage'
import CustomersPage from '../pages/Customers/CustomersPage'
import BrokerSelfServicePage from '../pages/BrokerSelfService/BrokerSelfServicePage'
import RenewalCalendarPage from '../pages/RenewalCalendar/RenewalCalendarPage'
import AnalyticsPage from '../pages/Analytics/AnalyticsPage'
import NotificationsPage from '../pages/Notifications/NotificationsPage'
import BrokerProfilePage from '../pages/BrokerProfile/BrokerProfilePage'
import NotFoundPage from '../pages/NotFound/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      {/* Public pages (no sidebar) */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>

      {/* Portal pages (sidebar + top bar) */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.RENEWAL_INTELLIGENCE} element={<RenewalIntelligencePage />} />
        <Route path={ROUTES.POLICIES} element={<PoliciesPage />} />
        <Route path={ROUTES.POLICY_DETAILS} element={<PolicyDetailsPage />} />
        <Route path={ROUTES.CUSTOMERS} element={<CustomersPage />} />
        <Route path={ROUTES.SELF_SERVICE} element={<BrokerSelfServicePage />} />
        <Route path={ROUTES.RENEWAL_CALENDAR} element={<RenewalCalendarPage />} />
        <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
        <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
        <Route path={ROUTES.PROFILE} element={<BrokerProfilePage />} />
      </Route>

      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
