import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';

const initialEmployees = [
  { id: 1, name: 'Ayesha Khan', email: 'ayesha@company.com', department: 'Engineering', role: 'Senior Developer', salary: 2850, status: 'Active' },
  { id: 2, name: 'Rohan Patel', email: 'rohan@company.com', department: 'Finance', role: 'Accountant', salary: 3120, status: 'Active' },
  { id: 3, name: 'Maria Lopez', email: 'maria@company.com', department: 'HR', role: 'HR Manager', salary: 1980, status: 'Active' },
  { id: 4, name: 'James Smith', email: 'james@company.com', department: 'Engineering', role: 'Junior Developer', salary: 2340, status: 'Active' },
  { id: 5, name: 'Sara Ahmed', email: 'sara@company.com', department: 'Marketing', role: 'Marketing Lead', salary: 2600, status: 'Inactive' },
  { id: 6, name: 'David Kim', email: 'david@company.com', department: 'Finance', role: 'Financial Analyst', salary: 2900, status: 'Active' },
];

const departments = ['All', 'Engineering', 'Finance', 'HR', 'Marketing'];
const statuses = ['All', 'Active', 'Inactive'];

const Employees = () => {
  const { isHR, isAdmin } = useAuth();
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', department: 'Engineering', role: '', salary: '' });

  const filtered = useMemo(() => {
    return employees.filter((emp) => {
      const matchSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.role.toLowerCase().includes(search.toLowerCase());
      const matchDept = department === 'All' || emp.department === department;
      const matchStatus = status === 'All' || emp.status === status;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, search, department, status]);

  const handleDelete = (id) => {
    if (!isAdmin) return alert('Only Admins can delete employees.');
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const handleAdd = () => {
    if (!newEmployee.name || !newEmployee.email) return;
    setEmployees([...employees, { ...newEmployee, id: Date.now(), salary: parseFloat(newEmployee.salary) || 0, status: 'Active' }]);
    setNewEmployee({ name: '', email: '', department: 'Engineering', role: '', salary: '' });
    setShowAddModal(false);
  };

  const inputClass = 'rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full mt-1';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Employees</h1>
          <p className="mt-1 text-slate-500">Manage and search all employees.</p>
        </div>
        {isHR && (
          <button
            onClick={() => setShowAddModal(true)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            + Add Employee
          </button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="🔍 Search by name, email or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <span className="flex items-center text-sm text-slate-500">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Salary</th>
              <th className="px-4 py-3 text-left">Status</th>
              {isHR && <th className="px-4 py-3 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={isHR ? 6 : 5} className="py-8 text-center text-slate-400">
                  No employees found.
                </td>
              </tr>
            ) : (
              filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{emp.name}</p>
                        <p className="text-xs text-slate-400">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{emp.department}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.role}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">${emp.salary.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-bold ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {emp.status}
                    </span>
                  </td>
                  {isHR && (
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Add New Employee</h2><div className="space-y-3">
              <div><label className="text-xs font-medium text-slate-500">Full Name</label><input className={inputClass} value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} placeholder="John Doe" /></div>
              <div><label className="text-xs font-medium text-slate-500">Email</label><input className={inputClass} value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} placeholder="john@company.com" /></div>
              <div><label className="text-xs font-medium text-slate-500">Role</label><input className={inputClass} value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} placeholder="e.g. Developer" /></div>
              <div>
                <label className="text-xs font-medium text-slate-500">Department</label>
                <select className={inputClass} value={newEmployee.department} onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}>
                  {departments.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div><label className="text-xs font-medium text-slate-500">Salary ($)</label><input className={inputClass} type="number" value={newEmployee.salary} onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })} placeholder="e.g. 3000" /></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleAdd} className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">Add Employee</button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 rounded-lg bg-slate-100 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;