import { useMemo, useState } from 'react';

const attendanceRecords = [
  { id: 1, employeeId: 'EMP001', name: 'Amira Patel', department: 'Finance', date: '2026-06-12', checkIn: '08:05', checkOut: '17:00', status: 'Present', hours: 8.9, notes: 'Completed monthly closing' },
  { id: 2, employeeId: 'EMP002', name: 'Danish Ali', department: 'Engineering', date: '2026-06-12', checkIn: '08:35', checkOut: '17:15', status: 'Present', hours: 8.7, notes: 'Worked on sprint tasks' },
  { id: 3, employeeId: 'EMP003', name: 'Sara Malik', department: 'Operations', date: '2026-06-12', checkIn: '09:10', checkOut: '17:20', status: 'Late', hours: 7.8, notes: 'Traffic delay' },
  { id: 4, employeeId: 'EMP004', name: 'Omar Shaikh', department: 'Sales', date: '2026-06-12', checkIn: '08:15', checkOut: '16:45', status: 'Present', hours: 8.5, notes: 'Client calls' },
  { id: 5, employeeId: 'EMP005', name: 'Lina Raza', department: 'HR', date: '2026-06-11', checkIn: '08:00', checkOut: '17:05', status: 'Present', hours: 9.1, notes: 'Interview schedule' },
  { id: 6, employeeId: 'EMP006', name: 'Adeel Khan', department: 'Engineering', date: '2026-06-11', checkIn: '08:20', checkOut: '16:50', status: 'Present', hours: 8.5, notes: 'Code review' },
  { id: 7, employeeId: 'EMP007', name: 'Maya Iqbal', department: 'Finance', date: '2026-06-11', checkIn: '09:00', checkOut: '17:30', status: 'Late', hours: 7.5, notes: 'Bank reconciliation' },
  { id: 8, employeeId: 'EMP008', name: 'Bilal Hassan', department: 'Engineering', date: '2026-06-10', checkIn: '08:10', checkOut: '17:10', status: 'Present', hours: 9.0, notes: 'Deployment support' },
  { id: 9, employeeId: 'EMP009', name: 'Nadia Shah', department: 'Operations', date: '2026-06-10', checkIn: '08:45', checkOut: '17:00', status: 'Present', hours: 8.2, notes: 'Inventory audit' },
  { id: 10, employeeId: 'EMP010', name: 'Faisal Ahmed', department: 'Sales', date: '2026-06-10', checkIn: '08:30', checkOut: '16:40', status: 'Present', hours: 8.1, notes: 'Proposals' },
  { id: 11, employeeId: 'EMP011', name: 'Hina Qureshi', department: 'HR', date: '2026-06-09', checkIn: '08:00', checkOut: '16:55', status: 'Present', hours: 8.8, notes: 'Employee onboarding' },
  { id: 12, employeeId: 'EMP012', name: 'Sami Rafi', department: 'Engineering', date: '2026-06-09', checkIn: '09:20', checkOut: '17:20', status: 'Late', hours: 7.7, notes: 'System testing' },
];

const columnLabels = [
  { key: 'employeeId', label: 'Employee ID' },
  { key: 'department', label: 'Department' },
  { key: 'date', label: 'Date' },
  { key: 'checkIn', label: 'Check In' },
  { key: 'checkOut', label: 'Check Out' },
  { key: 'status', label: 'Status' },
  { key: 'hours', label: 'Hours' },
];

const rowsPerPage = 6;
const fieldClass =
  'mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const filteredRecords = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();
    return attendanceRecords
      .filter((record) => {
        const matchesSearch =
          record.employeeId.toLowerCase().includes(search) || record.department.toLowerCase().includes(search);
        const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
        const dateValue = new Date(record.date).getTime();
        const matchesStart = startDate ? dateValue >= new Date(startDate).getTime() : true;
        const matchesEnd = endDate ? dateValue <= new Date(endDate).getTime() : true;
        return matchesSearch && matchesStatus && matchesStart && matchesEnd;
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (sortField === 'hours') return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        if (sortField === 'date') {
          const aTime = new Date(aValue).getTime();
          const bTime = new Date(bValue).getTime();
          return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
        }
        const normalizedA = String(aValue).toLowerCase();
        const normalizedB = String(bValue).toLowerCase();
        if (normalizedA < normalizedB) return sortOrder === 'asc' ? -1 : 1;
        if (normalizedA > normalizedB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [searchQuery, statusFilter, startDate, endDate, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / rowsPerPage));
  const pageRecords = filteredRecords.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalHours = filteredRecords.reduce((sum, record) => sum + record.hours, 0).toFixed(1);
  const presentCount = filteredRecords.filter((record) => record.status === 'Present').length;
  const lateCount = filteredRecords.filter((record) => record.status === 'Late').length;

  const toggleSelect = (id) => {
    setSelectedRows((current) =>
      current.includes(id) ? current.filter((rowId) => rowId !== id) : [...current, id]
    );
  };

  const selectAllOnPage = () => {
    const pageIds = pageRecords.map((record) => record.id);
    const allSelected = pageIds.every((id) => selectedRows.includes(id));
    setSelectedRows((current) =>
      allSelected ? current.filter((id) => !pageIds.includes(id)) : Array.from(new Set([...current, ...pageIds]))
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  const changeSort = (field) => {
    if (field === sortField) setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
    else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  const stats = [
    { label: 'Total Records', value: filteredRecords.length },
    { label: 'Total Hours', value: totalHours },
    { label: 'Present', value: presentCount },
    { label: 'Late', value: lateCount },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Attendance</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review attendance trends, filter by team, and manage check in/out records.
          </p>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
        >
          Reset filters
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-soft">
            <span className="text-sm text-slate-500">{stat.label}</span>
            <p className="mt-1 text-2xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-soft">
        <div className="flex flex-wrap gap-4">
          <label className="flex flex-col text-sm font-medium text-slate-700">
            Search employee
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="ID or department"
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col text-sm font-medium text-slate-700">
            Status
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className={fieldClass}
            >
              <option value="All">All</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
            </select>
          </label>
          <label className="flex flex-col text-sm font-medium text-slate-700">
            Start date
            <input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setPage(1); }} className={fieldClass} />
          </label>
          <label className="flex flex-col text-sm font-medium text-slate-700">
            End date
            <input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); setPage(1); }} className={fieldClass} />
          </label>
          <label className="flex flex-col text-sm font-medium text-slate-700">
            Sort by
            <select value={sortField} onChange={(e) => changeSort(e.target.value)} className={fieldClass}>
              <option value="date">Date</option>
              <option value="department">Department</option>
              <option value="hours">Hours</option>
            </select>
          </label>
        </div>
      </section>

      <section className="overflow-x-auto rounded-2xl bg-white shadow-soft">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600">
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={pageRecords.length > 0 && pageRecords.every((record) => selectedRows.includes(record.id))}
                  onChange={selectAllOnPage}
                />
              </th>
              {columnLabels.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {pageRecords.length === 0 ? (
              <tr>
                <td colSpan={columnLabels.length + 2} className="px-4 py-6 text-center text-slate-500">
                  No attendance records match the current filters.
                </td>
              </tr>
            ) : (
              pageRecords.map((record) => (
                <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selectedRows.includes(record.id)} onChange={() => toggleSelect(record.id)} />
                  </td>
                  <td className="px-4 py-3">{record.employeeId}</td>
                  <td className="px-4 py-3">{record.department}</td>
                  <td className="px-4 py-3">{record.date}</td>
                  <td className="px-4 py-3">{record.checkIn}</td>
                  <td className="px-4 py-3">{record.checkOut}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        record.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{record.hours}</td>
                  <td className="px-4 py-3 text-slate-500">{record.notes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <div>
          Showing {pageRecords.length} of {filteredRecords.length} records
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-lg border border-slate-300 px-3 py-1.5 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="rounded-lg border border-slate-300 px-3 py-1.5 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Attendance;
