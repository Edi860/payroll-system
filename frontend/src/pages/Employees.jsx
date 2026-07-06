import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';

const initialEmployees = [
  { id: 1, name: 'Ayesha Khan', email: 'ayesha@company.com', department: 'Engineering', role: 'Senior Developer', salary: 2850, status: 'Active', phone: '+1-555-0101', joinDate: '2022-03-15', avatar: 'A' },
  { id: 2, name: 'Rohan Patel', email: 'rohan@company.com', department: 'Finance', role: 'Accountant', salary: 3120, status: 'Active', phone: '+1-555-0102', joinDate: '2021-07-20', avatar: 'R' },
  { id: 3, name: 'Maria Lopez', email: 'maria@company.com', department: 'HR', role: 'HR Manager', salary: 1980, status: 'Active', phone: '+1-555-0103', joinDate: '2023-01-10', avatar: 'M' },
  { id: 4, name: 'James Smith', email: 'james@company.com', department: 'Engineering', role: 'Junior Developer', salary: 2340, status: 'Active', phone: '+1-555-0104', joinDate: '2023-06-01', avatar: 'J' },
  { id: 5, name: 'Sara Ahmed', email: 'sara@company.com', department: 'Marketing', role: 'Marketing Lead', salary: 2600, status: 'Inactive', phone: '+1-555-0105', joinDate: '2022-11-15', avatar: 'S' },
  { id: 6, name: 'David Kim', email: 'david@company.com', department: 'Finance', role: 'Financial Analyst', salary: 2900, status: 'Active', phone: '+1-555-0106', joinDate: '2021-09-05', avatar: 'D' },
];

const departments = ['All', 'Engineering', 'Finance', 'HR', 'Marketing'];
const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500'];
const EMPTY = { name: '', email: '', phone: '', department: 'Engineering', role: '', salary: '', status: 'Active', joinDate: '' };

const Employees = () => {
  const { isHR, isAdmin } = useAuth();
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(EMPTY);
  const [salaryAmount, setSalaryAmount] = useState('');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [advanceReason, setAdvanceReason] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const closeModal = () => { setModal(null); setSelected(null); setFormData(EMPTY); setSalaryAmount(''); setAdvanceAmount(''); setAdvanceReason(''); };

  const filtered = useMemo(() => employees.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch = e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.role.toLowerCase().includes(q);
    const matchDept = filterDept === 'All' || e.department === filterDept;
    const matchStatus = filterStatus === 'All' || e.status === filterStatus;
    return matchSearch && matchDept && matchStatus;
  }), [employees, search, filterDept, filterStatus]);

  const handleAdd = () => {
    if (!formData.name || !formData.email) return;
    setEmployees([...employees, { ...formData, id: Date.now(), salary: parseFloat(formData.salary) || 0, avatar: formData.name.charAt(0) }]);
    showToast('✅ Employee added!'); closeModal();
  };
  const handleEdit = () => {
    if (!formData.name || !formData.email) return;
    setEmployees(employees.map((e) => e.id === selected.id ? { ...e, ...formData, salary: parseFloat(formData.salary) || e.salary } : e));
    showToast('✅ Employee updated!'); closeModal();
  };
  const handleDelete = () => { setEmployees(employees.filter((e) => e.id !== selected.id)); showToast('🗑️ Employee deleted.'); closeModal(); };
  const handleSalaryUpdate = () => { if (!salaryAmount) return; setEmployees(employees.map((e) => e.id === selected.id ? { ...e, salary: parseFloat(salaryAmount) } : e)); showToast(`💰 Salary updated to $${parseFloat(salaryAmount).toLocaleString()}`); closeModal(); };
  const handleAdvance = () => { if (!advanceAmount) return; showToast(`💵 Advance of $${parseFloat(advanceAmount).toLocaleString()} approved for ${selected.name}`); closeModal(); };
  const toggleStatus = (emp) => { setEmployees(employees.map((e) => e.id === emp.id ? { ...e, status: e.status === 'Active' ? 'Inactive' : 'Active' } : e)); showToast(`Status updated for ${emp.name}`); };

  const inputClass = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1';
  const activeCount = employees.filter(e => e.status === 'Active').length;
  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);return (
    <div className="space-y-6">
      {toast && <div className="fixed top-4 right-4 z-50 rounded-xl bg-slate-800 px-5 py-3 text-sm font-medium text-white shadow-xl">{toast}</div>}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Employee Management</h1>
          <p className="mt-1 text-slate-500">Manage, update and monitor all employees.</p>
        </div>
        {isHR && <button onClick={() => { setFormData(EMPTY); setModal('add'); }} className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition shadow">+ Add Employee</button>}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Employees', value: employees.length, color: 'bg-blue-500' },
          { label: 'Active', value: activeCount, color: 'bg-green-500' },
          { label: 'Inactive', value: employees.length - activeCount, color: 'bg-red-500' },
          { label: 'Total Salary', value: `$${totalSalary.toLocaleString()}`, color: 'bg-purple-500' },
        ].map((card) => (
          <div key={card.label} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className={`h-1.5 ${card.color}`} />
            <div className="p-4"><p className="text-sm text-slate-500">{card.label}</p><p className="mt-1 text-2xl font-bold text-slate-800">{card.value}</p></div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <input type="text" placeholder="🔍 Search by name, email or role..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 min-w-48 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">{departments.map((d) => <option key={d}>{d}</option>)}</select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">{['All','Active','Inactive'].map((s) => <option key={s}>{s}</option>)}</select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-3 py-12 text-center text-slate-400">No employees found.</div>
        ) : filtered.map((emp, i) => (
          <div key={emp.id} className="rounded-2xl bg-white shadow-sm hover:shadow-md transition overflow-hidden">
            <div className={`h-2 ${avatarColors[i % avatarColors.length]}`} />
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${avatarColors[i % avatarColors.length]} text-white font-bold text-lg`}>{emp.avatar}</div>
                  <div>
                    <h3 className="font-bold text-slate-800">{emp.name}</h3>
                    <p className="text-xs text-slate-500">{emp.role}</p>
                    <p className="text-xs text-slate-400">{emp.department}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-bold ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{emp.status}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
                <div>📧 {emp.email}</div><div>📞 {emp.phone}</div>
                <div>📅 {emp.joinDate}</div>
                <div>💰 ${emp.salary.toLocaleString()}/mo</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={() => { setSelected(emp); setModal('view'); }} className="rounded-lg bg-slate-50 px-2 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition">👁️ View</button>
                {isHR && <button onClick={() => { setSelected(emp); setFormData({ name: emp.name, email: emp.email, phone: emp.phone, department: emp.department, role: emp.role, salary: emp.salary, status: emp.status, joinDate: emp.joinDate }); setModal('edit'); }} className="rounded-lg bg-blue-50 px-2 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition">✏️ Edit</button>}
                {isHR && <button onClick={() => { setSelected(emp); setSalaryAmount(emp.salary); setModal('salary'); }} className="rounded-lg bg-green-50 px-2 py-2 text-xs font-semibold text-green-600 hover:bg-green-100 transition">💰 Salary</button>}
                {isHR && <button onClick={() => { setSelected(emp); setModal('advance'); }} className="rounded-lg bg-purple-50 px-2 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-100 transition">💵 Advance</button>}
                {isHR && <button onClick={() => toggleStatus(emp)} className={`rounded-lg px-2 py-2 text-xs font-semibold transition ${emp.status === 'Active' ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>{emp.status === 'Active' ? '⏸️ Deactivate' : '▶️ Activate'}</button>}
                {isAdmin && <button onClick={() => { setSelected(emp); setModal('delete'); }} className="rounded-lg bg-red-50 px-2 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition">🗑️ Delete</button>}
              </div>
            </div>
          </div>
        ))}
      </div>{modal === 'view' && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white font-bold text-2xl">{selected.avatar}</div>
                  <div><h2 className="text-xl font-bold text-white">{selected.name}</h2><p className="text-blue-100 text-sm">{selected.role} · {selected.department}</p></div>
                </div>
                <button onClick={closeModal} className="text-white/70 hover:text-white text-xl">✕</button>
              </div>
            </div>
            <div className="p-6 space-y-2">
              {[{label:'📧 Email',value:selected.email},{label:'📞 Phone',value:selected.phone},{label:'🏢 Department',value:selected.department},{label:'💼 Role',value:selected.role},{label:'💰 Salary',value:`$${selected.salary.toLocaleString()}/month`},{label:'📅 Join Date',value:selected.joinDate},{label:'✅ Status',value:selected.status}].map((item) => (
                <div key={item.label} className="flex justify-between rounded-xl bg-slate-50 px-4 py-2.5">
                  <span className="text-sm text-slate-500">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-700">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6"><button onClick={closeModal} className="w-full rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 transition">Close</button></div>
          </div>
        </div>
      )}

      {(modal === 'add' || modal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 max-h-screen overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-800 mb-4">{modal === 'add' ? '➕ Add New Employee' : '✏️ Edit Employee'}</h2>
            <div className="space-y-3">
              {[{label:'Full Name',key:'name',type:'text',placeholder:'John Doe'},{label:'Email',key:'email',type:'email',placeholder:'john@company.com'},{label:'Phone',key:'phone',type:'text',placeholder:'+1-555-0000'},{label:'Role',key:'role',type:'text',placeholder:'e.g. Developer'},{label:'Salary ($)',key:'salary',type:'number',placeholder:'e.g. 3000'},{label:'Join Date',key:'joinDate',type:'date',placeholder:''}].map(({label,key,type,placeholder}) => (
                <div key={key}><label className="text-xs font-medium text-slate-500">{label}</label><input type={type} className={inputClass} value={formData[key]} placeholder={placeholder} onChange={(e) => setFormData({...formData,[key]:e.target.value})} /></div>
              ))}
              <div><label className="text-xs font-medium text-slate-500">Department</label><select className={inputClass} value={formData.department} onChange={(e) => setFormData({...formData,department:e.target.value})}>{departments.filter(d=>d!=='All').map(d=><option key={d}>{d}</option>)}</select></div>
              <div><label className="text-xs font-medium text-slate-500">Status</label><select className={inputClass} value={formData.status} onChange={(e) => setFormData({...formData,status:e.target.value})}>{['Active','Inactive'].map(s=><option key={s}>{s}</option>)}</select></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={modal === 'add' ? handleAdd : handleEdit} className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">{modal === 'add' ? 'Add Employee' : 'Save Changes'}</button><button onClick={closeModal} className="flex-1 rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'salary' && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-1">💰 Update Salary</h2>
            <p className="text-sm text-slate-500 mb-4">{selected.name} · Current: <strong>${selected.salary.toLocaleString()}</strong></p>
            <label className="text-xs font-medium text-slate-500">New Salary ($)</label>
            <input type="number" className={inputClass} value={salaryAmount} onChange={(e) => setSalaryAmount(e.target.value)} placeholder="Enter new salary" />
            <div className="flex gap-3 mt-4">
              <button onClick={handleSalaryUpdate} className="flex-1 rounded-xl bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700 transition">Update</button>
              <button onClick={closeModal} className="flex-1 rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'advance' && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-1">💵 Advance Payment</h2>
            <p className="text-sm text-slate-500 mb-4">{selected.name} · Salary: <strong>${selected.salary.toLocaleString()}</strong></p>
            <div className="space-y-3">
              <div><label className="text-xs font-medium text-slate-500">Advance Amount ($)</label><input type="number" className={inputClass} value={advanceAmount} onChange={(e) => setAdvanceAmount(e.target.value)} placeholder="e.g. 500" /></div>
              <div><label className="text-xs font-medium text-slate-500">Reason</label><textarea className={`${inputClass} resize-none`} rows={3} value={advanceReason} onChange={(e) => setAdvanceReason(e.target.value)} placeholder="Reason for advance..." /></div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleAdvance} className="flex-1 rounded-xl bg-purple-600 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition">Approve</button>
              <button onClick={closeModal} className="flex-1 rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'delete' && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 text-center">
            <div className="text-5xl mb-3">⚠️</div>
            <h2 className="text-lg font-bold text-slate-800">Delete Employee?</h2>
            <p className="text-sm text-slate-500 mt-2">Are you sure you want to delete <strong>{selected.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3 mt-5">
              <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 transition">Delete</button>
              <button onClick={closeModal} className="flex-1 rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;