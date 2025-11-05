const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new employee
router.post('/add', async (req, res) => {
  const employee = new Employee({
    employeeId: req.body.employeeId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    experienceDetails: req.body.experienceDetails,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DEACTIVATE an employee
router.put('/deactivate/:employeeId', async (req, res) => {
  const { endDate, reason } = req.body;

  try {
    const employee = await Employee.findOne({ employeeId: req.params.employeeId });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.isActive = false;
    employee.deactivationInfo = { endDate, reason };

    // Find the current experience and update the last working date
    const currentExperience = employee.experienceDetails.find(exp => exp.lastWorkingDate === 'Present');
    if (currentExperience) {
      currentExperience.lastWorkingDate = endDate;
    }

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;