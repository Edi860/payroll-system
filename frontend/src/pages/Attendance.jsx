import { useState, useMemo } from 'react';

const attendanceData = [
  { id: 1, employeeId: 'EMP001', name: 'Ayesha Khan', department: 'Engineering', date: '2026-06-12', checkIn: '08:55', checkOut: '17:00', status: 'Present', hours: 8.1, notes: 'On time' },
  { id: 2, employeeId: 'EMP002', name: 'Rohan Patel', department: 'Finance', date: '2026-06-12', checkIn: '09:30', checkOut: '17:30', status: 'Late', hours: 8.0, notes: 'Traffic delay' },
  { id: 3, employeeId: 'EMP003', name: 'Maria Lopez', department: 'HR', date: '2026-06-12', checkIn: '09:10', checkOut: '17:00', status: 'Present', hours: 7.8, notes: 'Traffic code review' },
  { id: 4, employeeId: 'EMP004', name: 'James Smith', department: 'Sales', date: '2026-06-12', checkIn: '08:15', checkOut: '16:45', status: 'Present', hours: 8.5, notes: 'Client calls' },
  { id: 5, employeeId: 'EMP005', name: 'Sara Ahmed', department: 'HR', date: '2026-06-11', checkIn: '08:00', checkOut: '17:05', status: 'Present', hours: 9.1, notes: 'Interview schedule' },
  { id: 6, employeeId: 'EMP006', name: 'David Kim', department: 'Engineering', date: '2026-06-11', checkIn: '08:20', checkOut: '16:50', status: 'Present', hours: 8.5, notes: 'Code review' },
  { id: 7, employeeId: 'EMP007', name: 'Maya Iqbal', department: 'Finance', date: '2026-06-11', checkIn: '09:00', checkOut: '17:30', status: 'Late', hours: 7.5, notes: 'Bank reconciliation' },
  { id: 8, employeeId: 'EMP008', name: 'Bilal Hassan', department: 'Engineering', date: '2026-06-10', checkIn: '08:10', checkOut: '17:10', status: 'Present', hours: 9.0, notes: 'Deployment support' },
  { id: 9, employeeId: 'EMP009', name: 'Nadia Shah', department: 'Operations', date: '2026-06-10', checkIn: '08:45', checkOut: '17:00', status: 'Present', hours: 8.2, notes: 'Inventory audit' },
  { id: 10, employeeId: 'EMP010', name: 'Faisal Ahmed', department: 'Sales', date: '2026-06-10', checkIn: '08:30', checkOut: '16:40', status: 'Present', hours: 8.1, notes: 'Proposals' },
  { id: 11, employeeId: 'EMP011', name: 'Hina Qureshi', department: 'HR', date: '2026-06-09', checkIn: '08:00', checkOut: '16:55', status: 'Present', hours: 8.8, notes: 'Employee onboarding' },
  { id: 12, employeeId: 'EMP012', name: 'Sami Rafi', department: 'Engineering', date: '2026-06-09', checkIn: '09:20', checkOut: '17:20', status: 'Late', hours: 7.7, notes: 'System testing' },
];

const statusColors = {
  Present: 'bg-green-100 text-green-700',
  Late: 'bg-amber-100 text-amber-700',
  Absent: 'bg-red-100 text-red-600',
};

const Attendance = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDept, setFilterDept] = useState('All');

  const departments = ['All', ...new Set(attendanceData.map(a => a.department))];

  const filtered = useMemo(() => {
    return attendanceData.filter((a) => {
      const matchSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        a.department.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'All' || a.status === filterStatus;
      const matchDept = filterDept === 'All' || a.department === filterDept;
      return matchSearch && matchStatus && matchDept;
    });
  }, [search, filterStatus, filterDept]);

  const presentCount = attendanceData.filter(a => a.status === 'Present').length;
  const lateCount = attendanceData.filter(a => a.status === 'Late').length;
  const absentCount = attendanceData.filter(a => a.status === 'Absent').length;
  const avgHours = (attendanceData.reduce((sum, a) => sum + a.hours, 0) / attendanceData.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Attendance</h1>
        <p className="mt-1 text-slate-500">Track and monitor employee attendance records.</p>
      </div>{/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Present', value: presentCount, color: 'bg-green-500' },
          { label: 'Late', value: lateCount, color: 'bg-amber-500' },
          { label: 'Absent', value: absentCount, color: 'bg-red-500' },
          { label: 'Avg Hours', value: avgHours, color: 'bg-blue-500' },
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
          placeholder="🔍 Search by name, ID or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          {['All', 'Present', 'Late', 'Absent'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <span className="flex items-center text-sm text-slate-500">{filtered.length} records</span>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Check In</th>
              <th className="px-4 py-3 text-left">Check Out</th>
              <th className="px-4 py-3 text-left">Hours</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="py-8 text-center text-slate-400">No records found.</td></tr>
            ) : (
              filtered.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">{a.name.charAt(0)}</div>
                      <div>
                        <p className="font-semibold text-slate-800">{a.name}</p>
                        <p className="text-xs text-slate-400">{a.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{a.department}</td>
                  <td className="px-4 py-3 text-slate-600">{a.date}</td>
                  <td className="px-4 py-3 text-slate-600">{a.checkIn}</td><td className="px-4 py-3 text-slate-600">{a.checkOut}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{a.hours}h</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-bold ${statusColors[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{a.notes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;