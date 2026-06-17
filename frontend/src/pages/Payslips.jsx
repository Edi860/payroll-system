import { useCallback, useEffect, useState } from 'react';
import { get } from '../api/axios';

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPayslips = useCallback(async () => {
    setLoading(true);
    try {
      const data = await get('/payroll');
      const records = (data.data || []).map((p) => ({
        id: p._id,
        employeeId: p.employee?._id || '',
        employeeName: p.employee
          ? `${p.employee.firstName || ''} ${p.employee.lastName || ''}`.trim()
          : 'Unknown',
        period:
          p.payPeriod?.startDate && p.payPeriod?.endDate
            ? `${new Date(p.payPeriod.startDate).toLocaleDateString()} – ${new Date(p.payPeriod.endDate).toLocaleDateString()}`
            : '—',
        basicSalary: Number(p.baseSalary || 0),
        deductions: Number(p.deductions || 0) + Number(p.taxWithheld || 0),
        netSalary: Number(p.netPay || 0),
      }));
      setPayslips(records);
      setError(null);
    } catch (err) {
      setError('Failed to fetch payslips');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  const filteredPayslips = payslips.filter(
    (slip) =>
      String(slip.employeeId).includes(searchTerm) ||
      slip.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-sm text-slate-500">Loading payslips...</p>;
  if (error) return <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Payslips</h1>

      <input
        type="text"
        placeholder="Search by Employee ID or Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <div className="overflow-x-auto rounded-2xl bg-white shadow-soft">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600">
              <th className="px-4 py-3 font-semibold">Employee</th>
              <th className="px-4 py-3 font-semibold">Period</th>
              <th className="px-4 py-3 text-right font-semibold">Basic Salary</th>
              <th className="px-4 py-3 text-right font-semibold">Deductions</th>
              <th className="px-4 py-3 text-right font-semibold">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayslips.length > 0 ? (
              filteredPayslips.map((slip) => (
                <tr key={slip.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">{slip.employeeName}</td>
                  <td className="px-4 py-3">{slip.period}</td>
                  <td className="px-4 py-3 text-right">${slip.basicSalary.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">${slip.deductions.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-semibold">${slip.netSalary.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  No payslips found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payslips;
