import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600">Payroll MS</h1>
        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <a href="/home" className="text-blue-600 font-semibold">Home</a>
          <a href="/about" className="hover:text-blue-600 transition">About</a>
          <a href="/services" className="hover:text-blue-600 transition">Services</a>
          <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-blue-50 to-white">
        <span className="mb-4 rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-600 uppercase tracking-wide">
          Payroll Made Simple
        </span>
        <h1 className="text-5xl font-extrabold text-slate-800 leading-tight max-w-3xl">
          Manage Payroll <span className="text-blue-600">Smarter</span> &amp; Faster
        </h1>
        <p className="mt-6 text-lg text-slate-500 max-w-xl">
          Automate your payroll process, manage employees, track attendance, and generate reports — all in one place.
        </p>
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-md"
          >
            Get Started
          </button>
          <a
            href="/about"
            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 max-w-5xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-slate-800 mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { icon: '💰', title: 'Automated Payroll', desc: 'Calculate salaries, taxes, and deductions automatically every month.' },
            { icon: '👥', title: 'Employee Management', desc: 'Add, edit, and manage all your employees from one dashboard.' },
            { icon: '📊', title: 'Detailed Reports', desc: 'Generate payroll reports and payslips with a single click.' },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm text-center hover:shadow-md transition">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-slate-800">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-slate-400 border-t border-slate-100">
        © 2026 Payroll MS. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;