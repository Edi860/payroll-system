import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const PayrollCalculator = () => {
  const { darkMode } = useOutletContext() || {};
  const [form, setForm] = useState({
    basicSalary: '',
    allowances: '',
    overtime: '',
    taxRate: '15',
    pensionRate: '7',
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const basic = parseFloat(form.basicSalary) || 0;
    const allowances = parseFloat(form.allowances) || 0;
    const overtime = parseFloat(form.overtime) || 0;
    const taxRate = parseFloat(form.taxRate) / 100;
    const pensionRate = parseFloat(form.pensionRate) / 100;

    const grossSalary = basic + allowances + overtime;
    const tax = grossSalary * taxRate;
    const pension = basic * pensionRate;
    const netSalary = grossSalary - tax - pension;

    setResult({ grossSalary, tax, pension, netSalary });
  };

  const reset = () => {
    setForm({ basicSalary: '', allowances: '', overtime: '', taxRate: '15', pensionRate: '7' });
    setResult(null);
  };

  const card = `rounded-2xl p-6 ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} shadow-sm`;
  const input = `mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-700'}`;
  const label = `text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Payroll Calculator</h1>
        <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Calculate net salary after tax and pension deductions.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <div className={card}>
          <h2 className="text-lg font-semibold mb-4">Employee Salary Details</h2>
          <div className="space-y-4">
            <div>
              <label className={label}>Basic Salary ($)</label>
              <input name="basicSalary" value={form.basicSalary} onChange={handleChange} type="number" placeholder="e.g. 3000" className={input} />
            </div>
            <div>
              <label className={label}>Allowances ($)</label>
              <input name="allowances" value={form.allowances} onChange={handleChange} type="number" placeholder="e.g. 500" className={input} />
            </div>
            <div>
              <label className={label}>Overtime Pay ($)</label>
              <input name="overtime" value={form.overtime} onChange={handleChange} type="number" placeholder="e.g. 200" className={input} />
            </div>
            <div>
              <label className={label}>Tax Rate (%)</label>
              <input name="taxRate" value={form.taxRate} onChange={handleChange} type="number" placeholder="e.g. 15" className={input} />
            </div>
            <div>
              <label className={label}>Pension Rate (%)</label>
              <input name="pensionRate" value={form.pensionRate} onChange={handleChange} type="number" placeholder="e.g. 7" className={input} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={calculate} className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
                Calculate
              </button>
              <button onClick={reset} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${darkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                Reset
              </button>
            </div>
          </div>
        </div>{/* Result */}
        <div className={card}>
          <h2 className="text-lg font-semibold mb-4">Calculation Result</h2>
          {result ? (
            <div className="space-y-4">
              {[
                { label: 'Gross Salary', value: result.grossSalary, color: 'text-blue-500' },
                { label: 'Tax Deduction', value: -result.tax, color: 'text-red-500' },
                { label: 'Pension Deduction', value: -result.pension, color: 'text-amber-500' },
              ].map((item) => (
                <div key={item.label} className={`flex justify-between rounded-xl p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                  <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>{item.label}</span>
                  <span className={`font-bold ${item.color}`}>
                    {item.value < 0 ? '-' : ''}${Math.abs(item.value).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="rounded-xl bg-blue-600 p-4 flex justify-between">
                <span className="text-sm font-semibold text-white">Net Salary</span>
                <span className="text-xl font-extrabold text-white">${result.netSalary.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className={`flex h-48 items-center justify-center rounded-xl border-2 border-dashed ${darkMode ? 'border-slate-600 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
              <div className="text-center">
                <p className="text-4xl mb-2">🧮</p>
                <p className="text-sm">Enter salary details and click Calculate</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrollCalculator;