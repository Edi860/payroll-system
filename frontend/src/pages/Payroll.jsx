import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';

const initialPayroll = [
  { id: 1, employee: 'Ayesha Khan', department: 'Engineering', basicSalary: 2850, deductions: 427, netPay: 2423, month: 'June 2026', status: 'Pending' },
  { id: 2, employee: 'Rohan Patel', department: 'Finance', basicSalary: 3120, deductions: 468, netPay: 2652, month: 'June 2026', status: 'Approved' },
  { id: 3, employee: 'Maria Lopez', department: 'HR', basicSalary: 1980, deductions: 297, netPay: 1683, month: 'June 2026', status: 'Pending' },
  { id: 4, employee: 'James Smith', department: 'Engineering', basicSalary: 2340, deductions: 351, netPay: 1989, month: 'June 2026', status: 'Rejected' },
  { id: 5, employee: 'Sara Ahmed', department: 'Marketing', basicSalary: 2600, deductions: 390, netPay: 2210, month: 'June 2026', status: 'Approved' },
  { id: 6, employee: 'David Kim', department: 'Finance', basicSalary: 2900, deductions: 435, netPay: 2465, month: 'June 2026', status: 'Pending' },
];

const statusColors = {
  Pending: 'bg-amber-100 text-amber-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-600',
};

const Payroll = () => {
  const { isHR, isAdmin } = useAuth();
  const [payroll, setPayroll] = useState(initialPayroll);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDept, setFilterDept] = useState('All');

  const filtered = useMemo(() => {
    return payroll.filter((p) => {
      const matchSearch =
        p.employee.toLowerCase().includes(search.toLowerCase()) ||
        p.department.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'All' || p.status === filterStatus;
      const matchDept = filterDept === 'All' || p.department === filterDept;
      return matchSearch && matchStatus && matchDept;
    });
  }, [payroll, search, filterStatus, filterDept]);

  const updateStatus = (id, newStatus) => {
    if (!isHR) return alert('Only HR/Admin can approve or reject payroll.');
    setPayroll(payroll.map((p) => p.id === id ? { ...p, status: newStatus } : p));
  };

  const approveAll = () => {
    if (!isAdmin) return alert('Only Admins can approve all payroll.');
    setPayroll(payroll.map((p) => p.status === 'Pending' ? { ...p, status: 'Approved' } : p));
  };

  const pendingCount = payroll.filter((p) => p.status === 'Pending').length;
  const approvedCount = payroll.filter((p) => p.status === 'Approved').length;
  const totalApproved = payroll.filter((p) => p.status === 'Approved').reduce((sum, p) => sum + p.netPay, 0);

  const departments = ['All', ...new Set(payroll.map((p) => p.department))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Payroll Approval</h1>
          <p className="mt-1 text-slate-500">Review, approve or reject payroll submissions.</p>
        </div>
        {isAdmin && pendingCount > 0 && (
          <button
            onClick={approveAll}
            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition"
          >
            ✅ Approve All Pending ({pendingCount})
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Pending', value: pendingCount, color: 'bg-amber-500' },
          { label: 'Approved', value: approvedCount, color: 'bg-green-500' },
          { label: 'Total Approved', value: `$${totalApproved.toLocaleString()}`, color: 'bg-blue-500' },
        ].map((card) => (
          <div key={card.label} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className={`h-1.5 ${card.color}`} />
            <div className="p-4">
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="🔍 Search employee or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {['All', 'Pending', 'Approved', 'Rejected'].map((s) => <option key={s}>{s}</option>)}
        </select>
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* Payroll Table */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-right">Basic Salary</th>
              <th className="px-4 py-3 text-right">Deductions</th>
              <th className="px-4 py-3 text-right">Net Pay</th>
              <th className="px-4 py-3 text-left">Status</th>
              {isHR && <th className="px-4 py-3 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={isHR ? 7 : 6} className="py-8 text-center text-slate-400">
                  No payroll records found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">
                        {row.employee.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{row.employee}</p>
                        <p className="text-xs text-slate-400">{row.month}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.department}</td>
                  <td className="px-4 py-3 text-right text-slate-700">${row.basicSalary.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-red-500">-${row.deductions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-800">${row.netPay.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-bold ${statusColors[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  {isHR && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {row.status !== 'Approved' && (
                          <button
                            onClick={() => updateStatus(row.id, 'Approved')}
                            className="rounded-lg bg-green-50 px-2 py-1 text-xs font-medium text-green-600 hover:bg-green-100 transition"
                          >
                            Approve
                          </button>
                        )}
                        {row.status !== 'Rejected' && (
                          <button
                            onClick={() => updateStatus(row.id, 'Rejected')}
                            className="rounded-lg bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;