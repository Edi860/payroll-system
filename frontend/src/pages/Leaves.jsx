import { useState, useMemo } from 'react';

const initialLeaves = [
  { id: 1, employee: 'Ayesha Khan', department: 'Engineering', leaveType: 'Sick', startDate: '2026-06-15', endDate: '2026-06-16', days: 2, reason: 'Fever and rest', status: 'Approved' },
  { id: 2, employee: 'Rohan Patel', department: 'Finance', leaveType: 'Annual', startDate: '2026-06-20', endDate: '2026-06-25', days: 5, reason: 'Family vacation', status: 'Pending' },
  { id: 3, employee: 'Maria Lopez', department: 'HR', leaveType: 'Personal', startDate: '2026-06-18', endDate: '2026-06-18', days: 1, reason: 'Personal errand', status: 'Approved' },
  { id: 4, employee: 'James Smith', department: 'Engineering', leaveType: 'Sick', startDate: '2026-06-10', endDate: '2026-06-11', days: 2, reason: 'Doctor appointment', status: 'Rejected' },
  { id: 5, employee: 'Sara Ahmed', department: 'Marketing', leaveType: 'Annual', startDate: '2026-07-01', endDate: '2026-07-05', days: 5, reason: 'Holiday trip', status: 'Pending' },
  { id: 6, employee: 'David Kim', department: 'Finance', leaveType: 'Emergency', startDate: '2026-06-08', endDate: '2026-06-09', days: 2, reason: 'Family emergency', status: 'Approved' },
];

const leaveTypeColors = {
  Sick: 'bg-red-100 text-red-600',
  Annual: 'bg-blue-100 text-blue-600',
  Personal: 'bg-purple-100 text-purple-600',
  Emergency: 'bg-amber-100 text-amber-700',
};

const statusColors = {
  Approved: 'bg-green-100 text-green-700',
  Pending: 'bg-amber-100 text-amber-700',
  Rejected: 'bg-red-100 text-red-600',
};

const EMPTY = { employee: '', leaveType: 'Sick', startDate: '', endDate: '', reason: '' };

const Leaves = () => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(EMPTY);

  const filtered = useMemo(() => {
    return leaves.filter((l) => {
      const matchSearch =
        l.employee.toLowerCase().includes(search.toLowerCase()) ||
        l.leaveType.toLowerCase().includes(search.toLowerCase()) ||
        l.department.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'All' || l.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [leaves, search, filterStatus]);

  const handleSubmit = () => {
    if (!formData.employee || !formData.startDate || !formData.endDate) return;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
    setLeaves([...leaves, { ...formData, id: Date.now(), days, department: 'General', status: 'Pending' }]);
    setFormData(EMPTY);
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setLeaves(leaves.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const inputClass = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Leave Management</h1>
          <p className="mt-1 text-slate-500">Manage and track employee leave requests.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
          + Request Leave
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Requests', value: leaves.length, color: 'bg-blue-500' },
          { label: 'Approved', value: leaves.filter((l) => l.status === 'Approved').length, color: 'bg-green-500' },
          { label: 'Pending', value: leaves.filter((l) => l.status === 'Pending').length, color: 'bg-amber-500' },
          { label: 'Rejected', value: leaves.filter((l) => l.status === 'Rejected').length, color: 'bg-red-500' },
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
        <input type="text" placeholder="🔍 Search employee or leave type..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 min-w-48 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          {['All', 'Pending', 'Approved', 'Rejected'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Leave Type</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">End Date</th>
              <th className="px-4 py-3 text-left">Days</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="py-8 text-center text-slate-400">No leave requests found.</td></tr>
            ) : (
              filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">{l.employee.charAt(0)}</div>
                      <div>
                        <p className="font-semibold text-slate-800">{l.employee}</p>
                        <p className="text-xs text-slate-400">{l.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-bold ${leaveTypeColors[l.leaveType]}`}>{l.leaveType}</span></td>
                  <td className="px-4 py-3 text-slate-600">{l.startDate}</td>
                  <td className="px-4 py-3 text-slate-600">{l.endDate}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{l.days}d</td>
                  <td className="px-4 py-3 text-slate-500 text-xs max-w-32 truncate">{l.reason}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-bold ${statusColors[l.status]}`}>{l.status}</span></td>
                  <td className="px-4 py-3">
                    {l.status === 'Pending' && (
                      <div className="flex gap-1">
                        <button onClick={() => updateStatus(l.id, 'Approved')} className="rounded-lg bg-green-50 px-2 py-1 text-xs font-medium text-green-600 hover:bg-green-100 transition">Approve</button>
                        <button onClick={() => updateStatus(l.id, 'Rejected')} className="rounded-lg bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Leave Request Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Request Leave</h2>
            <div className="space-y-3">
              <div><label className="text-xs font-medium text-slate-500">Employee Name</label><input className={inputClass} value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} placeholder="Your name" /></div>
              <div>
                <label className="text-xs font-medium text-slate-500">Leave Type</label>
                <select className={inputClass} value={formData.leaveType} onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}>
                  {['Sick', 'Annual', 'Personal', 'Emergency'].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label className="text-xs font-medium text-slate-500">Start Date</label><input type="date" className={inputClass} value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} /></div>
              <div><label className="text-xs font-medium text-slate-500">End Date</label><input type="date" className={inputClass} value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} /></div>
              <div><label className="text-xs font-medium text-slate-500">Reason</label><textarea className={`${inputClass} resize-none`} rows={3} value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} placeholder="Reason for leave..." /></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSubmit} className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">Submit Request</button>
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-lg bg-slate-100 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;