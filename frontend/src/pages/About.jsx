const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600">Payroll MS</h1>
        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <a href="/home" className="hover:text-blue-600 transition">Home</a>
          <a href="/about" className="text-blue-600 font-semibold">About</a>
          <a href="/services" className="hover:text-blue-600 transition">Services</a>
          <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
        </div>
        <a href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
          Sign In
        </a>
      </nav>

      {/* Hero */}
      <section className="bg-blue-50 px-8 py-20 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800">About Us</h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          We are dedicated to simplifying payroll management for businesses of all sizes.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-8 py-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
          <p className="text-slate-500 leading-relaxed">
            Our mission is to empower HR and finance teams with modern tools that automate payroll, reduce errors, and save time. We believe every business deserves a reliable and easy-to-use payroll system.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h2>
          <p className="text-slate-500 leading-relaxed">
            We envision a future where payroll processing is fully automated, transparent, and accessible to organizations everywhere — from small startups to large enterprises.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-12 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8 sm:grid-cols-4 text-center text-white">
          {[
            { value: '500+', label: 'Companies' },
            { value: '50K+', label: 'Employees Managed' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="mt-1 text-sm text-blue-100">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-10">Our Team</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { name: 'Sarah Johnson', role: 'CEO & Founder', emoji: '👩‍💼' },
            { name: 'Michael Chen', role: 'Lead Engineer', emoji: '👨‍💻' },
            { name: 'Amina Yusuf', role: 'HR Specialist', emoji: '👩‍🏫' },
          ].map((member) => (
            <div key={member.name} className="rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">{member.emoji}</div>
              <h3 className="text-lg font-bold text-slate-800">{member.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{member.role}</p>
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

export default About;