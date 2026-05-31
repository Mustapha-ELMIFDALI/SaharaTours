import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ui/ErrorBoundary'
import { ToastProvider } from './components/ui/Toast'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminRoute from './components/auth/AdminRoute'
import Home from './pages/Home'
import Activities from './pages/Activities'
import ActivityDetail from './pages/ActivityDetail'
import Transport from './pages/Transport'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Reservations from './pages/Reservations'
import Profile from './pages/Profile'
import Dashboard from './pages/admin/Dashboard'
import ActivitiesAdmin from './pages/admin/ActivitiesAdmin'
import TransportAdmin from './pages/admin/TransportAdmin'
import UsersAdmin from './pages/admin/UsersAdmin'
import ReservationsAdmin from './pages/admin/ReservationsAdmin'

export default function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="activities" element={<ActivitiesAdmin />} />
                <Route path="transport" element={<TransportAdmin />} />
                <Route path="users" element={<UsersAdmin />} />
                <Route path="reservations" element={<ReservationsAdmin />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
    </ErrorBoundary>
  )
}
