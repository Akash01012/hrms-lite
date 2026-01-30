import React, { useState, useEffect } from "react"; 
import { createEmployee } from "../api";

function EmployeeForm({ onCreated }) {
  const [employeeId, setEmployeeId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    
    try {
      await createEmployee({
        employee_id: employeeId.trim(),
        full_name: fullName.trim(),
        email: email.trim(),
        department: department.trim(),
      });
      setEmployeeId("");
      setFullName("");
      setEmail("");
      setDepartment("");
      
      setSuccess("Employee created!");
      onCreated();
      
    } catch (err) {
      const apiError = err?.response?.data;
      setError(
        apiError?.message ||
          "Unable to create employee. Please verify details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header">
        <h2>New Employee</h2>
        <p>Add a new employee to the directory.</p>
      </div>
      <div className="card-body grid-2">
        <label className="form-field">
          <span>Employee ID</span>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            placeholder="EMP-001"
          />
        </label>
        <label className="form-field">
          <span>Full Name</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Akash Kumar"
          />
        </label>
        <label className="form-field">
          <span>Email Address</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="akash@gmail.com"
          />
        </label>
        <label className="form-field">
          <span>Department</span>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            placeholder="Engineering"
          />
        </label>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="card-footer">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Employee"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
