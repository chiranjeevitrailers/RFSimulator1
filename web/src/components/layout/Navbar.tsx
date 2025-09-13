import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setIsUserMenuOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar bg-base-100 shadow-sm border-b border-base-300">
      <div className="navbar-start">
        {/* Mobile menu button */}
        <div className="dropdown lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <li>
              <Link
                to="/"
                className={isActive('/') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className={isActive('/pricing') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/docs"
                className={isActive('/docs') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Documentation
              </Link>
            </li>
            {user ? (
              <li>
                <Link
                  to="/app/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={isActive('/login') ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className={isActive('/signup') ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl">
          <span className="font-bold text-primary">5G</span>
          <span className="font-bold">LabX</span>
          <span className="text-sm text-base-content/70 ml-1">Cloud</span>
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/"
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className={isActive('/pricing') ? 'active' : ''}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/docs"
              className={isActive('/docs') ? 'active' : ''}
            >
              Documentation
            </Link>
          </li>
        </ul>
      </div>

      {/* Right side */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <div className="w-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
                isUserMenuOpen ? 'block' : 'hidden'
              }`}
            >
              <li className="menu-title">
                <span>{user.full_name || user.email}</span>
              </li>
              <li>
                <Link to="/app/dashboard" onClick={() => setIsUserMenuOpen(false)}>
                  <User size={16} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/app/account" onClick={() => setIsUserMenuOpen(false)}>
                  <Settings size={16} />
                  Account
                </Link>
              </li>
              <li>
                <button onClick={handleSignOut}>
                  <LogOut size={16} />
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className={`btn btn-ghost ${isActive('/login') ? 'btn-active' : ''}`}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={`btn btn-primary ${isActive('/signup') ? 'btn-active' : ''}`}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar