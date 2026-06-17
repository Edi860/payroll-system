import { useState } from 'react';

const reports = [
  { id: 1, title: 'Payroll Summary', description: 'Monthly payroll totals, deductions, and net pay per employee.' },
  { id: 2, title: 'Attendance Report', description: 'Employee attendance and leave summary for the selected period.' },
  { id: 3, title: 'Expense Report', description: 'Company expenses and reimbursements for payroll processing.' },
  { id: 4, title: 'Tax Report', description: 'Tax withholding and liability details for the current financial year.' },
];

const selectClass =
  'mt-2 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

const Reports = () => {
  const [filters, setFilters] = useState({ department: 'all', month: 'all' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Applying report filters:', filters);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Reports</h1>

      <section className="rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Filter Reports</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col text-sm font-medium text-slate-700">
            Department
            <select name="department" value={filters.department} onChange={handleChange} className={selectClass}>
              <option value="all">All Departments</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
              <option value="operations">Operations</option>
            </select>
          </label>

          <label className="flex flex-col text-sm font-medium text-slate-700">
            Month
            <select name="month" value={filters.month} onChange={handleChange} className={selectClass}>
              <option value="all">All Months</option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-36 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
          >
            Apply Filters
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Available Reports</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {reports.map((report) => (
            <article key={report.id} className="rounded-2xl bg-white p-5 shadow-soft">
              <h3 className="mb-1 font-semibold text-slate-800">{report.title}</h3>
              <p className="text-sm text-slate-500">{report.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Reports;
