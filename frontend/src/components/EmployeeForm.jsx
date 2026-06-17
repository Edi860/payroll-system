import { useState } from 'react';

const EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
  position: '',
  department: '',
  salary: '',
  hireDate: '',
};

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20';
const labelClass = 'mb-1 block text-sm font-medium text-slate-700';

const EmployeeForm = ({ onSubmit }) => {
  const [employee, setEmployee] = useState(EMPTY);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { ...employee, salary: Number(employee.salary) || 0 };

    if (onSubmit) {
      onSubmit(payload);
    }

    setEmployee(EMPTY);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" className={inputClass} value={employee.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" className={inputClass} value={employee.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={inputClass} value={employee.email} onChange={handleChange} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="position">Position</label>
          <input id="position" name="position" type="text" className={inputClass} value={employee.position} onChange={handleChange} />
        </div>
        <div>
          <label className={labelClass} htmlFor="department">Department</label>
          <input id="department" name="department" type="text" className={inputClass} value={employee.department} onChange={handleChange} />
        </div>
        <div>
          <label className={labelClass} htmlFor="salary">Salary</label>
          <input id="salary" name="salary" type="number" min="0" className={inputClass} value={employee.salary} onChange={handleChange} />
        </div>
        <div>
          <label className={labelClass} htmlFor="hireDate">Hire Date</label>
          <input id="hireDate" name="hireDate" type="date" className={inputClass} value={employee.hireDate} onChange={handleChange} />
        </div>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
      >
        Save Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
