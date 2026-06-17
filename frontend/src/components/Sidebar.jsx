import { NavLink } from 'react-router-dom';

const menuItems = [
  { id: 1, label: 'Dashboard', path: '/', icon: '🏠', end: true },
  { id: 2, label: 'Employees', path: '/employees', icon: '👥' },
  { id: 3, label: 'Payroll', path: '/payroll', icon: '💰' },
  { id: 4, label: 'Payslips', path: '/payslips', icon: '🧾' },
  { id: 5, label: 'Attendance', path: '/attendance', icon: '🕒' },
  { id: 6, label: 'Leaves', path: '/leaves', icon: '🌴' },
  { id: 7, label: 'Reports', path: '/reports', icon: '📊' },
  { id: 8, label: 'Profile', path: '/profile', icon: '⚙️' },
];

const Sidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-slate-900 text-slate-100 md:flex">
      <div className="border-b border-slate-700 px-6 py-5">
        <h2 className="text-xl font-bold text-white">Payroll MS</h2>
      </div>
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
