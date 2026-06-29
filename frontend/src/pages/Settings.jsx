import { useState } from 'react';

const Settings = () => {
  const [saved, setSaved] = useState('');
  const [company, setCompany] = useState({
    name: 'Payroll MS Inc.',
    email: 'hr@payrollms.com',
    phone: '+25142643247',
    address: 'Royal Campany Adiss Abeba Ethiopia',
    currency: 'ETB',
    timezone: 'Ethiopia/Adiss Abeba',
    fiscalYear: 'January',
  });

  const [payrollSettings, setPayrollSettings] = useState({
    payDay: '25',
    taxRate: '15',
    pensionRate: '7',
    overtimeRate: '1.5',
    autoApprove: false,
    sendPayslipEmail: true,
  });

  const [notifications, setNotifications] = useState({
    payrollReminder: true,
    leaveApproval: true,
    newEmployee: true,
    reportGenerated: false,
    systemAlerts: true,
  });

  const handleSave = (section) => {
    setSaved(section);
    setTimeout(() => setSaved(''), 3000);
  };

  const inputClass = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400';
  const labelClass = 'text-xs font-medium text-slate-500';

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
        <p className="mt-1 text-slate-500">Manage your company settings and preferences.</p>
      </div>

      {saved && (
        <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          ✅ {saved} settings saved successfully!
        </div>
      )}

      {/* Company Settings */}
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">🏢 Company Information</h2>
            <p className="text-xs text-slate-500 mt-0.5">Update your company details</p>
          </div>
          <button onClick={() => handleSave('Company')} className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition">
            Save Changes
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: 'Company Name', key: 'name' },
            { label: 'Email Address', key: 'email' },
            { label: 'Phone Number', key: 'phone' },
            { label: 'Address', key: 'address' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <input className={`mt-1 ${inputClass}`} value={company[key]} onChange={(e) => setCompany({ ...company, [key]: e.target.value })} />
            </div>
          ))}
          <div>
            <label className={labelClass}>Currency</label>
            <select className={`mt-1 ${inputClass}`} value={company.currency} onChange={(e) => setCompany({ ...company, currency: e.target.value })}>
              {['USD', 'EUR', 'GBP', 'ETB', 'KES', 'NGN'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Fiscal Year Start</label>
            <select className={`mt-1 ${inputClass}`} value={company.fiscalYear} onChange={(e) => setCompany({ ...company, fiscalYear: e.target.value })}>
              {['January', 'April', 'July', 'October'].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Payroll Settings */}
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">💰 Payroll Settings</h2>
            <p className="text-xs text-slate-500 mt-0.5">Configure payroll rules and rates</p></div>
          <button onClick={() => handleSave('Payroll')} className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition">
            Save Changes
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: 'Pay Day (Day of Month)', key: 'payDay' },
            { label: 'Tax Rate (%)', key: 'taxRate' },
            { label: 'Pension Rate (%)', key: 'pensionRate' },
            { label: 'Overtime Rate (x)', key: 'overtimeRate' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <input type="number" className={`mt-1 ${inputClass}`} value={payrollSettings[key]} onChange={(e) => setPayrollSettings({ ...payrollSettings, [key]: e.target.value })} />
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {[ 
            { label: 'Auto-approve payroll submissions', key: 'autoApprove' },
            { label: 'Send payslips via email automatically', key: 'sendPayslipEmail' },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-700">{label}</span>
              <button
                onClick={() => setPayrollSettings({ ...payrollSettings, [key]: !payrollSettings[key] })}
                className={`relative w-11 h-6 rounded-full transition-colors ${payrollSettings[key] ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${payrollSettings[key] ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">🔔 Notification Preferences</h2>
            <p className="text-xs text-slate-500 mt-0.5">Choose what notifications you receive</p>
          </div>
          <button onClick={() => handleSave('Notification')} className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition">
            Save Changes
          </button>
        </div>
        <div className="space-y-3">
          {[ 
            { label: 'Payroll processing reminders', key: 'payrollReminder' },
            { label: 'Leave approval requests', key: 'leaveApproval' },
            { label: 'New employee added', key: 'newEmployee' },
            { label: 'Report generated', key: 'reportGenerated' },
            { label: 'System alerts & updates', key: 'systemAlerts' },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-700">{label}</span>
              <button
                onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
                className={`relative w-11 h-6 rounded-full transition-colors ${notifications[key] ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications[key] ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6"><h2 className="text-lg font-semibold text-red-700 mb-2">⚠️ Danger Zone</h2>
        <p className="text-sm text-red-500 mb-4">These actions are irreversible. Please be careful.</p>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition">
            Clear All Data
          </button>
          <button className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition">
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;