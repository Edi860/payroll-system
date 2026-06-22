import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';

const notifications = [
  { id: 1, message: 'Payroll for June is ready', time: '2 min ago', read: false },
  { id: 2, message: 'Maria Lopez payslip pending', time: '1 hour ago', read: false },
  { id: 3, message: 'New employee James Smith added', time: '3 hours ago', read: true },
  { id: 4, message: 'Monthly report generated', time: 'Yesterday', read: true },
];

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`flex items-center justify-between border-b px-6 py-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
        Payroll Management System
      </div>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            darkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative rounded-lg p-2 transition ${darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className={`absolute right-0 top-10 z-50 w-80 rounded-2xl shadow-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
              <div className={`border-b px-4 py-3 ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex gap-3 px-4 py-3 border-b last:border-0 ${darkMode ? 'border-slate-700' : 'border-slate-50'} ${!n.read ? (darkMode ? 'bg-slate-700' : 'bg-blue-50') : ''}`}
                  >
                    <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${!n.read ? 'bg-blue-500' : 'bg-transparent'}`} />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{n.message}</p>
                      <p className="text-xs mt-0.5 text-slate-400">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User / Auth */}
        {isAuthenticated ? (
          <>
            <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {user?.name || user?.email || 'User'}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${darkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;