const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');

// Create a payroll record
exports.createPayroll = async (req, res) => {
  try {
    const { employee, payPeriod, baseSalary, allowances, bonuses, deductions, taxWithheld, status, notes } = req.body;

    if (!employee) return res.status(400).json({ message: 'employee is required' });
    if (!payPeriod || !payPeriod.startDate || !payPeriod.endDate) {
      return res.status(400).json({ message: 'payPeriod.startDate and payPeriod.endDate are required' });
    }

    const existingEmployee = await Employee.findById(employee);
    if (!existingEmployee) return res.status(404).json({ message: 'Employee not found' });

    const payroll = await Payroll.create({
      employee,
      payPeriod,
      baseSalary: Number(baseSalary) || 0,
      allowances: Number(allowances) || 0,
      bonuses: Number(bonuses) || 0,
      deductions: Number(deductions) || 0,
      taxWithheld: Number(taxWithheld) || 0,
      netPay: 0, // recomputed by the model's pre('validate') hook
      status,
      notes,
    });

    return res.status(201).json(payroll);
  } catch (err) {
    console.error('createPayroll error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a payroll by ID
exports.getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id)
      .populate('employee', 'firstName lastName email position department')
      .lean();
    if (!payroll) return res.status(404).json({ message: 'Payroll not found' });
    return res.json(payroll);
  } catch (err) {
    console.error('getPayrollById error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// List payrolls with pagination & filtering
exports.getPayrolls = async (req, res) => {
  try {
    const { page = 1, limit = 25, from, to, employee } = req.query;
    const q = {};
    if (employee) q.employee = employee;
    if (from || to) q['payPeriod.startDate'] = {};
    if (from) q['payPeriod.startDate'].$gte = new Date(from);
    if (to) q['payPeriod.startDate'].$lte = new Date(to);

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    const [data, total] = await Promise.all([
      Payroll.find(q)
        .populate('employee', 'firstName lastName email position department')
        .sort({ 'payPeriod.startDate': -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Payroll.countDocuments(q),
    ]);

    return res.json({ data, meta: { total, page: pageNum, limit: limitNum } });
  } catch (err) {
    console.error('getPayrolls error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update payroll
exports.updatePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);
    if (!payroll) return res.status(404).json({ message: 'Payroll not found' });

    const fields = ['payPeriod', 'baseSalary', 'allowances', 'bonuses', 'deductions', 'taxWithheld', 'status', 'notes'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) payroll[field] = req.body[field];
    });

    await payroll.save(); // pre('validate') recomputes netPay
    return res.json(payroll);
  } catch (err) {
    console.error('updatePayroll error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete payroll
exports.deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndDelete(req.params.id);
    if (!payroll) return res.status(404).json({ message: 'Payroll not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('deletePayroll error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
