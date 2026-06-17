import { useMemo, useState } from 'react';

const defaultPayrollData = [
  { id: 1, employee: 'Ana Smith', role: 'Software Engineer', hours: 176, rate: 45, deductions: 320 },
  { id: 2, employee: 'Brandon Lee', role: 'Project Manager', hours: 160, rate: 52, deductions: 400 },
  { id: 3, employee: 'Clara Jones', role: 'HR Specialist', hours: 168, rate: 38, deductions: 280 },
];

const calculateNetPay = (entry) => entry.hours * entry.rate - entry.deductions;

const cellClass = 'px-4 py-3 border-b border-slate-100';

function Payroll() {
  const [payrollData] = useState(defaultPayrollData);
  const [filter, setFilter] = useState('');

  const filteredPayroll = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) return payrollData;
    return payrollData.filter(
      (row) =>
        row.employee.toLowerCase().includes(normalized) || row.role.toLowerCase().includes(normalized)
    );
  }, [filter, payrollData]);

  const totals = useMemo(
    () => ({
      gross: filteredPayroll.reduce((sum, row) => sum + row.hours * row.rate, 0),
      deductions: filteredPayroll.reduce((sum, row) => sum + row.deductions, 0),
      net: filteredPayroll.reduce((sum, row) => sum + calculateNetPay(row), 0),
    }),
    [filteredPayroll]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Payroll</h1>

      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search by employee or role"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <div>
            <span className="font-semibold">Total Gross:</span> ${totals.gross.toFixed(2)}
          </div>
          <div>
            <span className="font-semibold">Total Deductions:</span> ${totals.deductions.toFixed(2)}
          </div>
          <div>
            <span className="font-semibold">Total Net:</span> ${totals.net.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-soft">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-600">
              <th className="px-4 py-3 text-left font-semibold">Employee</th>
              <th className="px-4 py-3 text-left font-semibold">Role</th>
              <th className="px-4 py-3 text-right font-semibold">Hours</th>
              <th className="px-4 py-3 text-right font-semibold">Rate</th>
              <th className="px-4 py-3 text-right font-semibold">Deductions</th>
              <th className="px-4 py-3 text-right font-semibold">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayroll.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className={cellClass}>{row.employee}</td>
                <td className={cellClass}>{row.role}</td>
                <td className={`${cellClass} text-right`}>{row.hours}</td>
                <td className={`${cellClass} text-right`}>${row.rate.toFixed(2)}</td>
                <td className={`${cellClass} text-right`}>${row.deductions.toFixed(2)}</td>
                <td className={`${cellClass} text-right font-semibold`}>${calculateNetPay(row).toFixed(2)}</td>
              </tr>
            ))}
            {filteredPayroll.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                  No payroll records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payroll;
