const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
      index: true,
    },
    payPeriod: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
    baseSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    allowances: {
      type: Number,
      default: 0,
      min: 0,
    },
    bonuses: {
      type: Number,
      default: 0,
      min: 0,
    },
    deductions: {
      type: Number,
      default: 0,
      min: 0,
    },
    taxWithheld: {
      type: Number,
      default: 0,
      min: 0,
    },
    netPay: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processed', 'Paid'],
      default: 'Pending',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PayrollSchema.pre('validate', function (next) {
  const grossPay = this.baseSalary + this.allowances + this.bonuses;
  const totalDeductions = this.deductions + this.taxWithheld;
  this.netPay = Math.max(0, grossPay - totalDeductions);
  next();
});

module.exports = mongoose.models.Payroll || mongoose.model('Payroll', PayrollSchema);
