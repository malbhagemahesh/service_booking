import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { Navbar } from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto p-8 py-20">{children}</main>
    </div>
  )
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>   {/* ✅ MOVE HERE */}
      <ThemeProvider>
        <Layout>
          <AppContent />
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  )
}