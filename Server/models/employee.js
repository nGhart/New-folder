const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  employeeRole: {
    type: String,
    required: true,
  },
  employeeNumber: {
    type: String,
    required: true,
  },
  employeeDepartment: {
    type: String,
    required: true,
  },
  employeeSalary: {
    type: Number,
    required: true,
  },
  employeeStartDate: {
    type: String,
    required: false,
  },
  employeeEndDate: {
    type: String,
    required: false,
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
