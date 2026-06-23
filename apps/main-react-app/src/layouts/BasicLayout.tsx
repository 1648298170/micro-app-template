import { MICRO_EVENTS } from '@packages/shared'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { eventBus } from '../config/event-bus'

const navItems = [
  { path: '/home', label: 'Overview', code: 'home:view' },
  { path: '/react-admin', label: 'React Admin', code: 'react-admin:view' },
  { path: '/vue-admin', label: 'Vue Admin', code: 'vue-admin:view' },
]

export function BasicLayout() {
  const location = useLocation()
  const isMicroRoute =
    location.pathname.startsWith('/react-admin') || location.pathname.startsWith('/vue-admin')

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="brand">
          <span className="brand-mark">QK</span>
          <span className="brand-text">Micro Console</span>
        </div>
        <nav className="nav-list" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="app-main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Qiankun platform</p>
            <h1 className="page-title">Production micro frontend template</h1>
          </div>
          <button
            className="ghost-button"
            type="button"
            onClick={() =>
              eventBus.emit(MICRO_EVENTS.NOTIFICATION_PUSH, {
                title: 'Host notification',
                message: 'Broadcast from React host',
              })
            }
          >
            Broadcast
          </button>
        </header>
        <section className={isMicroRoute ? 'route-content route-content-hidden' : 'route-content'}>
          <Outlet />
        </section>
        <section className={isMicroRoute ? 'micro-host micro-host-active' : 'micro-host'}>
          {/* qiankun 挂载容器必须常驻 DOM，避免子应用异步 mount 时找不到目标节点。 */}
          <div id="micro-app-container" className="micro-container" />
        </section>
      </main>
    </div>
  )
}
