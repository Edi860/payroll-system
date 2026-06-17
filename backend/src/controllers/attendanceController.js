const Attendance = require('../models/Attendance');

// Get all attendance records (optionally filter by employee or date range)
exports.getAttendanceRecords = async (req, res) => {
  try {
    const { employee, from, to } = req.query;
    const filter = {};
    if (employee) filter.employee = employee;
    if (from || to) filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);

    const records = await Attendance.find(filter)
      .populate('employee', 'firstName lastName email department')
      .sort({ date: -1 });
    return res.status(200).json({ records });
  } catch (err) {
    console.error('getAttendanceRecords error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a single attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id).populate('employee', 'firstName lastName email department');
    if (!record) return res.status(404).json({ message: 'Attendance record not found' });
    return res.status(200).json({ record });
  } catch (err) {
    console.error('getAttendanceById error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const { employee, date, status, checkIn, checkOut, remarks } = req.body;

    if (!employee || !date) {
      return res.status(400).json({ message: 'employee and date are required' });
    }

    const record = await Attendance.create({ employee, date, status, checkIn, checkOut, remarks });
    return res.status(201).json({ message: 'Attendance recorded', record });
  } catch (err) {
    console.error('createAttendance error', err);
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Attendance for this employee and date already exists' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing attendance record
exports.updateAttendance = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Attendance record not found' });

    ['date', 'status', 'checkIn', 'checkOut', 'remarks'].forEach((field) => {
      if (req.body[field] !== undefined) record[field] = req.body[field];
    });

    await record.save(); // pre('save') recomputes hoursWorked
    return res.status(200).json({ message: 'Attendance updated', record });
  } catch (err) {
    console.error('updateAttendance error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Attendance record not found' });
    return res.status(200).json({ message: 'Attendance deleted' });
  } catch (err) {
    console.error('deleteAttendance error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
