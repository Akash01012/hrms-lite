import React, { useState, useEffect } from "react";
import { markAttendance } from "../api";

function AttendanceForm({ onMarked }) {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState(() => {
    return new Date().toISOString().slice(0, 10);
  });
  const [status, setStatus] = useState("PRESENT");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    try {
      await markAttendance({
        employee_id: employeeId.trim(),
        date,
        status,
      });
      setEmployeeId("");
      setDate(new Date().toISOString().slice(0, 10));
      setStatus("PRESENT");
      setSuccess("Attendance saved.");
      onMarked();
    } catch (err) {
      const apiError = err?.response?.data;
      setError(
        apiError?.message ||
          apiError?.employee_id ||
          "Unable to mark attendance. Verify Employee ID and date."
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
        <h2>Mark Attendance</h2>
        <p>Record daily presence for employees.</p>
      </div>
      <div className="card-body grid-3">
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
          <span>Date</span>
          <input
            type="date"
            value={date}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label className="form-field">
          <span>Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>
        </label>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="card-footer">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Attendance"}
        </button>
      </div>
    </form>
  );
}

export default AttendanceForm;
