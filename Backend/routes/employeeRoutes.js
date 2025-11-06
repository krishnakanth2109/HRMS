import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Employee not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Employee.findOneAndDelete({ employeeId: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DEACTIVATE
router.patch("/deactivate/:id", async (req, res) => {
  const { endDate, reason } = req.body;
  try {
    const emp = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      { isActive: false, endDate, reason },
      { new: true }
    );
    res.json(emp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// REACTIVATE
router.patch("/reactivate/:id", async (req, res) => {
  try {
    const emp = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      { isActive: true, endDate: "", reason: "" },
      { new: true }
    );
    res.json(emp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
