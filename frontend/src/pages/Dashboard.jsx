import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from 'recharts';

const data = [
  { month: 'Jan', payroll: 4000 },
  { month: 'Feb', payroll: 3000 },
  { month: 'Mar', payroll: 5000 },
  { month: 'Apr', payroll: 4500 },
];

const recentPayments = [
  { employee: 'Alice', amount: '$3,200', status: 'Completed' },
  { employee: 'Bob', amount: '$2,100', status: 'Pending' },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const v = payload[0].value;
  return (
    <div className="bg-white p-2 rounded shadow">
      <div className="text-sm">{`$${v}`}</div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-800">Payroll</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="payrollGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tickLine={false} />
              <YAxis
                tickFormatter={(v) => `$$${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="payroll"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#payrollGradient)"
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
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