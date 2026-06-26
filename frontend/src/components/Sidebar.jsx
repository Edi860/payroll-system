import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { id: 1, label: 'Dashboard', path: '/', icon: '📊', end: true },
  { id: 2, label: 'Employees', path: '/employees', icon: '👥' },
  { id: 3, label: 'Payroll', path: '/payroll', icon: '💰' },
  { id: 4, label: 'Payslips', path: '/payslips', icon: '🧾' },
  { id: 5, label: 'Attendance', path: '/attendance', icon: '📅' },
  { id: 6, label: 'Leaves', path: '/leaves', icon: '🌿' },
  { id: 7, label: 'Reports', path: '/reports', icon: '📈' },
  { id: 8, label: 'Calculator', path: '/calculator', icon: '🧮' },
  { id: 9, label: 'Settings', path: '/settings', icon: '⚙️' },
  { id: 10, label: 'Profile', path: '/profile', icon: '👤' },
];

const Sidebar = ({ darkMode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen bg-gradient-to-b from-blue-700 via-blue-800 to-indigo-900 shadow-xl`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">💼</span>
            <h2 className="text-lg font-extrabold text-white tracking-tight">Payroll MS</h2>
          </div>
        )}
        {collapsed && <span className="text-2xl mx-auto">💼</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-white/60 hover:text-white transition text-lg ${collapsed ? 'mx-auto mt-2' : ''}`}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white font-bold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-blue-200 capitalize">{user?.role || 'Employee'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition ${collapsed ? 'justify-center' : ''}`}
        >
          <span className="text-lg">🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;