import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add shadow to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Social Friction</span>
        </Link>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/focus-mode" className={location.pathname === '/focus-mode' ? 'nav-link active' : 'nav-link'}>
                  Focus
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/delay" className={location.pathname === '/delay' ? 'nav-link active' : 'nav-link'}>
                  Delay
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/rewards" className={location.pathname === '/rewards' ? 'nav-link active' : 'nav-link'}>
                  Rewards
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className={location.pathname === '/login' ? 'nav-link active' : 'nav-link'}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className={location.pathname === '/register' ? 'nav-link active' : 'nav-link'}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
