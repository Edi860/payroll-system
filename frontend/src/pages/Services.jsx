const Services = () => {
  const services = [
    {
      icon: '💰',
      title: 'Payroll Processing',
      desc: 'Automate salary calculations, tax deductions, and net pay for all employees every month with zero errors.',
    },
    {
      icon: '👥',
      title: 'Employee Management',
      desc: 'Maintain complete employee records including personal info, contracts, and employment history.',
    },
    {
      icon: '📋',
      title: 'Payslip Generation',
      desc: 'Generate and distribute professional payslips to employees automatically via email or download.',
    },
    {
      icon: '📅',
      title: 'Attendance Tracking',
      desc: 'Monitor employee attendance, late arrivals, and absences integrated directly with payroll.',
    },
    {
      icon: '🌿',
      title: 'Leave Management',
      desc: 'Handle leave requests, approvals, and balances with full visibility for HR and employees.',
    },
    {
      icon: '📊',
      title: 'Reports & Analytics',
      desc: 'Get detailed payroll reports, cost breakdowns, and trends to support smarter business decisions.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600">Payroll MS</h1>
        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <a href="/home" className="hover:text-blue-600 transition">Home</a>
          <a href="/about" className="hover:text-blue-600 transition">About</a>
          <a href="/services" className="text-blue-600 font-semibold">Services</a>
          <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
        </div>
        <a href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
          Sign In
        </a>
      </nav>

      {/* Hero */}
      <section className="bg-blue-50 px-8 py-20 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800">Our Services</h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          Everything you need to manage your workforce and payroll in one powerful platform.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-slate-800">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 px-8 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
        <p className="mt-3 text-blue-100 text-lg">Join hundreds of companies already using Payroll MS.</p>
        <a
          href="/login"
          className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 transition shadow"
        >
          Start Now
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-slate-400 border-t border-slate-100">
        © 2026 Payroll MS. All rights reserved.
      </footer>
    </div>
  );
};

export default Services;