import { Navigate, Route, Routes } from 'react-router-dom'
import { BasicLayout } from './layouts/BasicLayout'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { MicroAppPage } from './pages/MicroAppPage'

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<BasicLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/react-admin/*" element={<MicroAppPage />} />
        <Route path="/vue-admin/*" element={<MicroAppPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
