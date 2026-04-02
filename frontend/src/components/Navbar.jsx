import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { Button } from './Button.jsx'
import { Menu, User, LogOut, Sun, Moon } from 'lucide-react'

export function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <nav className="backdrop-blur-md bg-white/80 border-b border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-all">
            ServiceBook
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-1">
              <Link to="/" className={location.pathname === '/' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}>
                Home
              </Link>
              <Link to="/services" className={location.pathname === '/services' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}>
                Services
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary">
                Dashboard
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              {user ? (
                <>
                  <div className="flex items-center space-x-2 p-1 rounded-lg bg-accent text-sm">
                    <User className="h-5 w-5" />
                    <span>{user.username}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button size="sm">Login</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

