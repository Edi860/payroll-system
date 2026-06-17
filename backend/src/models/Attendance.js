const mongoose = require('mongoose');

const { Schema, model, Types } = mongoose;

const ATTENDANCE_STATUSES = Object.freeze(['Present', 'Absent', 'Leave', 'Holiday', 'Remote', 'Late']);

const AttendanceSchema = new Schema(
  {
    employee: {
      type: Types.ObjectId,
      ref: 'Employee',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
      set: (value) => {
        const normalizedDate = new Date(value);
        normalizedDate.setHours(0, 0, 0, 0);
        return normalizedDate;
      },
    },
    status: {
      type: String,
      enum: ATTENDANCE_STATUSES,
      default: 'Present',
      required: true,
    },
    checkIn: {
      type: Date,
      default: null,
    },
    checkOut: {
      type: Date,
      default: null,
    },
    hoursWorked: {
      type: Number,
      min: 0,
      default: 0,
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

AttendanceSchema.index({ employee: 1, date: 1 }, { unique: true, background: true });

AttendanceSchema.methods.calculateHoursWorked = function () {
  if (!this.checkIn || !this.checkOut) {
    this.hoursWorked = 0;
    return this.hoursWorked;
  }

  const start = new Date(this.checkIn);
  const end = new Date(this.checkOut);
  const durationMs = Math.max(0, end - start);
  const hours = durationMs / 1000 / 60 / 60;

  this.hoursWorked = Number(hours.toFixed(2));
  return this.hoursWorked;
};

AttendanceSchema.statics.findByEmployeeAndDate = function (employeeId, date) {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  return this.findOne({
    employee: employeeId,
    date: { $gte: targetDate, $lte: endOfDay },
  });
};

AttendanceSchema.pre('save', function (next) {
  if (this.checkIn && this.checkOut) {
    this.calculateHoursWorked();
  } else {
    this.hoursWorked = 0;
  }
  next();
});

module.exports = model('Attendance', AttendanceSchema);
