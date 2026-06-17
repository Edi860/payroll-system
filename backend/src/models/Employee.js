const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    position: { type: String, trim: true, default: '' },
    department: { type: String, trim: true, default: '' },
    salary: { type: Number, required: true, min: 0, default: 0 },
    hireDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
