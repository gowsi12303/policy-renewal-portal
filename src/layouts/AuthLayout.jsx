import { Outlet } from 'react-router-dom'

// Wrapper for public pages such as Login. Styling comes in a later step.
function AuthLayout() {
  return (
    <main className="auth-layout">
      <Outlet />
    </main>
  )
}

export default AuthLayout
