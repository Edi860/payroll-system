import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const monthlyData = [
  { month: 'Jan', payroll: 44200, employees: 120 },
  { month: 'Feb', payroll: 45100, employees: 122 },
  { month: 'Mar', payroll: 43800, employees: 121 },
  { month: 'Apr', payroll: 46500, employees: 124 },
  { month: 'May', payroll: 47200, employees: 126 },
  { month: 'Jun', payroll: 48760, employees: 128 },
];

const departmentData = [
  { name: 'Engineering', value: 35, color: '#3b82f6' },
  { name: 'Finance', value: 20, color: '#10b981' },
  { name: 'HR', value: 15, color: '#f59e0b' },
  { name: 'Marketing', value: 18, color: '#8b5cf6' },
  { name: 'Operations', value: 12, color: '#ef4444' },
];

const reportTemplates = [
  { id: 1, title: 'Monthly Payroll Report', description: 'Complete payroll breakdown for the current month.', icon: '💰' },
  { id: 2, title: 'Employee Summary Report', description: 'Overview of all employees and their details.', icon: '👥' },
  { id: 3, title: 'Attendance Report', description: 'Attendance records and statistics.', icon: '📅' },
  { id: 4, title: 'Leave Report', description: 'Leave requests and balances.', icon: '🌿' },
  { id: 5, title: 'Tax Report', description: 'Tax withholding and liability details.', icon: '📋' },
  { id: 6, title: 'Expense Report', description: 'Company expenses and reimbursements.', icon: '🧾' },
];

const Reports = () => {
  const [generated, setGenerated] = useState(null);

  const handleGenerate = (report) => {
    setGenerated(report.title);
    setTimeout(() => setGenerated(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Reports & Analytics</h1>
        <p className="mt-1 text-slate-500">View insights and generate reports for your organization.</p>
      </div>

      {generated && (
        <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          ✅ {generated} has been generated successfully!
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Payroll', value: '$48,760', color: 'bg-blue-500' },
          { label: 'Total Employees', value: '128', color: 'bg-green-500' },
          { label: 'Avg Salary', value: '$2,850', color: 'bg-purple-500' },
          { label: 'Tax Withheld', value: '$3,920', color: 'bg-amber-500' },
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

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Bar Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Monthly Payroll Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={45} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Payroll']} />
              <Bar dataKey="payroll" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>{/* Pie Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Employees by Department</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {departmentData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ fontSize: 11, color: '#64748b' }}>{value}</span>} />
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Templates */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Generate Reports</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportTemplates.map((report) => (
            <div key={report.id} className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{report.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">{report.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{report.description}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleGenerate(report)}
                className="mt-4 w-full rounded-lg bg-blue-50 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition"
              >
                Generate Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;