const Leave = require('../models/Leave');

// Create a new leave
exports.createLeave = async (req, res) => {
  try {
    const { employee, startDate, endDate, leaveType, reason } = req.body;

    if (!employee || !startDate || !endDate) {
      return res.status(400).json({ message: 'employee, startDate, and endDate are required' });
    }

    const leave = await Leave.create({ employee, startDate, endDate, leaveType, reason });
    return res.status(201).json({ message: 'Leave created', leave });
  } catch (err) {
    console.error('createLeave error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all leaves
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('employee', 'firstName lastName email')
      .sort({ startDate: -1 });
    return res.status(200).json({ leaves });
  } catch (err) {
    console.error('getAllLeaves error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get leave by id
exports.getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate('employee', 'firstName lastName email');
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    return res.status(200).json({ leave });
  } catch (err) {
    console.error('getLeaveById error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update leave
exports.updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    return res.status(200).json({ message: 'Leave updated', leave });
  } catch (err) {
    console.error('updateLeave error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete leave
exports.deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    return res.status(200).json({ message: 'Leave deleted' });
  } catch (err) {
    console.error('deleteLeave error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
