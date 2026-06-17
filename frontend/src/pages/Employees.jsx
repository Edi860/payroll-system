import { useCallback, useEffect, useState } from 'react';
import { get, post, del } from '../api/axios';
import EmployeeForm from '../components/EmployeeForm';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await get('/employees');
      setEmployees(Array.isArray(data) ? data : data.employees || []);
    } catch (err) {
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const fullName = (emp) => `${emp.firstName || ''} ${emp.lastName || ''}`.trim();

  const filteredEmployees = employees.filter((emp) =>
    `${fullName(emp)} ${emp.email || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddEmployee = async (payload) => {
    setLoading(true);
    setError('');
    try {
      await post('/employees', payload);
      setShowForm(false);
      await fetchEmployees();
    } catch (err) {
      setError(err.message || 'Failed to add employee');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError('');
    try {
      await del(`/employees/${id}`);
      await fetchEmployees();
    } catch (err) {
      setError('Failed to delete employee');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Employees</h1>
          <p className="mt-1 text-sm text-slate-500">Total employees: {employees.length}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
        >
          {showForm ? 'Close' : 'Add Employee'}
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {showForm && (
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Add Employee</h2>
          <EmployeeForm onSubmit={handleAddEmployee} />
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          className="mb-4 w-full max-w-sm rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        {loading && <p className="text-sm text-slate-500">Loading...</p>}

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-600">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Department</th>
                <th className="px-4 py-3 text-right font-semibold">Salary</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                    No employees found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id || emp.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">{fullName(emp) || '—'}</td>
                    <td className="px-4 py-3">{emp.email}</td>
                    <td className="px-4 py-3">{emp.department || '—'}</td>
                    <td className="px-4 py-3 text-right">${Number(emp.salary || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(emp._id || emp.id)}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
