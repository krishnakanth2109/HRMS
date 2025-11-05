const mongoose = require('mongoose');

const ExperienceDetailSchema = new mongoose.Schema({
  companyName: String,
  role: String,
  department: String,
  joiningDate: String,
  lastWorkingDate: String,
  salary: Number,
});

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  deactivationInfo: {
    endDate: String,
    reason: String,
  },
  experienceDetails: [ExperienceDetailSchema],
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);