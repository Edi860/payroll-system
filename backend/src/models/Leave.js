const mongoose = require('mongoose');

const { Schema } = mongoose;

const LeaveSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    leaveType: {
      type: String,
      enum: ['Annual', 'Sick', 'Casual', 'Maternity', 'Paternity', 'Unpaid', 'Other'],
      default: 'Annual',
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      trim: true,
      maxlength: 500,
      default: 'Not specified',
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
      default: 'Pending',
      trim: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

LeaveSchema.index({ employee: 1, startDate: 1, endDate: 1 });

LeaveSchema.pre('save', function (next) {
  if (this.endDate < this.startDate) {
    return next(new Error('Leave end date must be equal or after start date'));
  }
  next();
});

LeaveSchema.virtual('durationDays').get(function () {
  if (!this.startDate || !this.endDate) return 0;
  const diff = this.endDate.getTime() - this.startDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
});

module.exports = mongoose.model('Leave', LeaveSchema);
