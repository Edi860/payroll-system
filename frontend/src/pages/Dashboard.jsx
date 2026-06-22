import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const summaryCards = [
  { label: 'Total Employees', value: 128, accent: 'bg-green-500' },
  { label: 'Payroll This Month', value: '$48,760', accent: 'bg-blue-500' },
  { label: 'Pending Approvals', value: 7, accent: 'bg-amber-500' },
  { label: 'Recent Hires', value: 5, accent: 'bg-purple-500' },
];

const recentPayments = [
  { employee: 'Ayesha Khan', amount: '$2,850', status: 'Completed' },
  { employee: 'Rohan Patel', amount: '$3,120', status: 'Completed' },
  { employee: 'Maria Lopez', amount: '$1,980', status: 'Pending' },
  { employee: 'James Smith', amount: '$2,340', status: 'Completed' },
];

const payrollStats = [
  { label: 'Net Salary Total', value: '$42,340' },
  { label: 'Tax Deductions', value: '$3,920' },
  { label: 'Benefits Paid', value: '$2,500' },
];

const monthlyTrend = [
  { month: 'Jan', payroll: 44200 },
  { month: 'Feb', payroll: 45100 },
  { month: 'Mar', payroll: 43800 },
  { month: 'Apr', payroll: 46500 },
  { month: 'May', payroll: 47200 },
  { month: 'Jun', payroll: 48760 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-white px-4 py-2 shadow-lg border border-slate-100">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="text-sm text-blue-600">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-red-500">Payroll Dashboard</h1>
        <p className="mt-1 text-slate-500">
          Overview of employee payroll, approvals, and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="overflow-hidden rounded-2xl bg-white shadow-soft">
            <div className={`h-1.5 ${card.accent}`} />
            <div className="p-5">
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-2xl bg-white p-6 shadow-soft lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-800">Payroll Summary</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {payrollStats.map((stat) => (
              <div key={stat.label} className="flex-1 rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <h3 className="mt-1 text-xl font-bold text-slate-800">{stat.value}</h3>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-500 mb-3">Monthly Payroll Trend</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="payrollGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#93c5fd', strokeWidth: 2 }} />
                <Area
                  type="monotone"
                  dataKey="payroll"
                  stroke="#3b82f6"
                  fill="url(#payrollGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <aside className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-800">Recent Payments</h2>
          <div className="mt-4 space-y-4">
            {recentPayments.map((payment) => (
              <div key={payment.employee} className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">{payment.employee}</p>
                <p className="text-sm text-slate-500">{payment.amount}</p>
                <p
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    payment.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {payment.status}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
