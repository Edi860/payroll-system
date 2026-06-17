import { useCallback, useEffect, useState } from 'react';
import { get, post, del } from '../api/axios';

const EMPTY = {
  employee: '',
  leaveType: 'Sick',
  startDate: '',
  endDate: '',
  reason: '',
};

const fieldClass =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(EMPTY);

  const fetchLeaves = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await get('/leaves');
      setLeaves(Array.isArray(data) ? data : data.leaves || []);
    } catch (err) {
      setError('Failed to load leaves');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await post('/leaves', formData);
      setFormData(EMPTY);
      setShowForm(false);
      await fetchLeaves();
    } catch (err) {
      setError(err.message || 'Failed to submit leave request');
    }
  };

  const handleDeleteLeave = async (id) => {
    try {
      await del(`/leaves/${id}`);
      await fetchLeaves();
    } catch (err) {
      setError('Failed to delete leave');
    }
  };

  const employeeName = (leave) => {
    if (leave.employee && typeof leave.employee === 'object') {
      return `${leave.employee.firstName || ''} ${leave.employee.lastName || ''}`.trim() || leave.employee.email;
    }
    return leave.employee || '—';
  };

  const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : '—');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Leave Management</h1>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
        >
          {showForm ? 'Cancel' : 'Request Leave'}
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl bg-white p-6 shadow-soft sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Employee ID</label>
            <input type="text" name="employee" value={formData.employee} onChange={handleInputChange} className={fieldClass} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Leave Type</label>
            <select name="leaveType" value={formData.leaveType} onChange={handleInputChange} className={fieldClass}>
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
              <option value="Annual">Annual</option>
              <option value="Maternity">Maternity</option>
              <option value="Paternity">Paternity</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className={fieldClass} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">End Date</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className={fieldClass} required />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Reason</label>
            <textarea name="reason" value={formData.reason} onChange={handleInputChange} rows="3" className={fieldClass} />
          </div>
          <div>
            <button
              type="submit"
              className="rounded-lg bg-success px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl bg-white shadow-soft">
        {loading ? (
          <p className="p-6 text-sm text-slate-500">Loading...</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-600">
                <th className="px-4 py-3 font-semibold">Employee</th>
                <th className="px-4 py-3 font-semibold">Leave Type</th>
                <th className="px-4 py-3 font-semibold">Start Date</th>
                <th className="px-4 py-3 font-semibold">End Date</th>
                <th className="px-4 py-3 font-semibold">Reason</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-slate-500">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                leaves.map((leave) => (
                  <tr key={leave._id || leave.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">{employeeName(leave)}</td>
                    <td className="px-4 py-3">{leave.leaveType}</td>
                    <td className="px-4 py-3">{formatDate(leave.startDate)}</td>
                    <td className="px-4 py-3">{formatDate(leave.endDate)}</td>
                    <td className="px-4 py-3 text-slate-500">{leave.reason}</td>
                    <td className="px-4 py-3">{leave.status}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteLeave(leave._id || leave.id)}
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
        )}
      </div>
    </div>
  );
};

export default Leaves;
