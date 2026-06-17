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

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Payroll Dashboard</h1>
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
            <p className="text-sm text-slate-500">Monthly Payroll Trend</p>
            <div className="mt-2 flex h-56 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
              Chart Placeholder
            </div>
          </div>
        </section>

        <aside className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-800">Recent Payments</h2>
          <div className="mt-4 space-y-3">
            {recentPayments.map((payment) => (
              <div key={payment.employee} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-800">{payment.employee}</p>
                  <p className="text-sm text-slate-500">{payment.amount}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    payment.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
