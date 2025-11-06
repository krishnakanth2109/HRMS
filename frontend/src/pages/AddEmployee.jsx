import React, { useState } from "react";
import axios from "axios";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    emergency: "",
    isActive: true,
    bankDetails: {
      accountNumber: "",
      bankName: "",
      ifsc: "",
      branch: "",
    },
    personalDetails: {
      dob: "",
      gender: "",
      maritalStatus: "",
      nationality: "",
      panNumber: "",
      aadharNumber: "",
    },
    experienceDetails: [
      {
        company: "",
        role: "",
        department: "",
        years: "",
        joiningDate: "",
        lastWorkingDate: "",
        salary: "",
        reason: "",
        employmentType: "",
      },
    ],
  });

  const [message, setMessage] = useState("");

  // Handle field change (including nested)
  const handleChange = (e, section, field, index) => {
    if (section === "bankDetails" || section === "personalDetails") {
      setEmployee({
        ...employee,
        [section]: { ...employee[section], [field]: e.target.value },
      });
    } else if (section === "experienceDetails") {
      const updatedExp = [...employee.experienceDetails];
      updatedExp[index][field] = e.target.value;
      setEmployee({ ...employee, experienceDetails: updatedExp });
    } else {
      setEmployee({ ...employee, [e.target.name]: e.target.value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employees", employee);
      setMessage("✅ Employee added successfully!");
      setEmployee({
        employeeId: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        emergency: "",
        isActive: true,
        bankDetails: { accountNumber: "", bankName: "", ifsc: "", branch: "" },
        personalDetails: {
          dob: "",
          gender: "",
          maritalStatus: "",
          nationality: "",
          panNumber: "",
          aadharNumber: "",
        },
        experienceDetails: [
          {
            company: "",
            role: "",
            department: "",
            years: "",
            joiningDate: "",
            lastWorkingDate: "",
            salary: "",
            reason: "",
            employmentType: "",
          },
        ],
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add employee.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          👨‍💼 Add New Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
              🧾 Basic Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="employeeId"
                value={employee.employeeId}
                onChange={handleChange}
                placeholder="Employee ID"
                className="border rounded-lg p-2 w-full"
                required
              />
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded-lg p-2 w-full"
                required
              />
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded-lg p-2 w-full"
                required
              />
              <input
                type="tel"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border rounded-lg p-2 w-full"
                required
              />
              <input
                type="password"
                name="password"
                value={employee.password}
                onChange={handleChange}
                placeholder="Password"
                className="border rounded-lg p-2 w-full"
                required
              />
              <input
                type="text"
                name="address"
                value={employee.address}
                onChange={handleChange}
                placeholder="Address"
                className="border rounded-lg p-2 w-full"
              />
              <input
                type="tel"
                name="emergency"
                value={employee.emergency}
                onChange={handleChange}
                placeholder="Emergency Contact"
                className="border rounded-lg p-2 w-full"
              />
            </div>
          </section>

          {/* Bank Details */}
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
              🏦 Bank Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.keys(employee.bankDetails).map((field) => (
                <input
                  key={field}
                  type="text"
                  value={employee.bankDetails[field]}
                  onChange={(e) => handleChange(e, "bankDetails", field)}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  className="border rounded-lg p-2 w-full"
                />
              ))}
            </div>
          </section>

          {/* Personal Details */}
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
              🧍 Personal Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.keys(employee.personalDetails).map((field) => (
                <input
                  key={field}
                  type={field === "dob" ? "date" : "text"}
                  value={employee.personalDetails[field]}
                  onChange={(e) => handleChange(e, "personalDetails", field)}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  className="border rounded-lg p-2 w-full"
                />
              ))}
            </div>
          </section>

          {/* Experience Details */}
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
              💼 Experience Details
            </h3>
            {employee.experienceDetails.map((exp, index) => (
              <div
                key={index}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
              >
                {Object.keys(exp).map((field) => (
                  <input
                    key={field}
                    type={field.includes("Date") ? "date" : "text"}
                    value={exp[field]}
                    onChange={(e) =>
                      handleChange(e, "experienceDetails", field, index)
                    }
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    className="border rounded-lg p-2 w-full"
                  />
                ))}
              </div>
            ))}
          </section>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Add Employee
            </button>
            {message && (
              <p className="mt-3 text-green-600 font-medium">{message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
