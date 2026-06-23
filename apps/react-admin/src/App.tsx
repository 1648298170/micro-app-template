import type { MicroAppRuntimeProps } from '@packages/shared'
import { Link, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { UsersPage } from './pages/UsersPage'

interface AppProps {
  runtimeProps?: Partial<MicroAppRuntimeProps>
}

export function App({ runtimeProps }: AppProps) {
  const user = runtimeProps?.getUserInfo?.()

  return (
    <div className="react-admin-root">
      <header className="micro-topline">
        <div>
          <p className="micro-kicker">React micro app</p>
          <h2>User operations</h2>
        </div>
        <span className="tenant-chip">{user?.tenantId ?? 'standalone'}</span>
      </header>
      <nav className="micro-tabs">
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </div>
  )
}
