const Employee = require('../models/Employee');

const respond = (res, status, data) => res.status(status).json(data);

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, position, department, salary, hireDate } = req.body;

    if (!firstName || !lastName || !email) {
      return respond(res, 422, { message: 'firstName, lastName, and email are required' });
    }

    const exists = await Employee.findOne({ email });
    if (exists) return respond(res, 409, { message: 'Employee with this email already exists' });

    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      position,
      department,
      salary: Number(salary) || 0,
      hireDate,
    });
    return respond(res, 201, { message: 'Employee created', employee });
  } catch (err) {
    console.error('createEmployee error:', err);
    return respond(res, 500, { message: 'Server error' });
  }
};

// Get list of employees with basic pagination & filtering
exports.getAllEmployees = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 25, 1), 100);
    const skip = (page - 1) * limit;
    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.position) filter.position = req.query.position;

    const [total, employees] = await Promise.all([
      Employee.countDocuments(filter),
      Employee.find(filter).sort({ lastName: 1, firstName: 1 }).skip(skip).limit(limit),
    ]);

    return respond(res, 200, { total, page, limit, employees });
  } catch (err) {
    console.error('getAllEmployees error:', err);
    return respond(res, 500, { message: 'Server error' });
  }
};

// Get single employee by id
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return respond(res, 404, { message: 'Employee not found' });
    return respond(res, 200, { employee });
  } catch (err) {
    console.error('getEmployeeById error:', err);
    return respond(res, 500, { message: 'Server error' });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, position, department, salary, hireDate } = req.body;
    const updates = { firstName, lastName, position, department, hireDate };
    if (salary != null) updates.salary = Number(salary);
    Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!employee) return respond(res, 404, { message: 'Employee not found' });
    return respond(res, 200, { message: 'Employee updated', employee });
  } catch (err) {
    console.error('updateEmployee error:', err);
    return respond(res, 500, { message: 'Server error' });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return respond(res, 404, { message: 'Employee not found' });
    return respond(res, 200, { message: 'Employee deleted' });
  } catch (err) {
    console.error('deleteEmployee error:', err);
    return respond(res, 500, { message: 'Server error' });
  }
};
