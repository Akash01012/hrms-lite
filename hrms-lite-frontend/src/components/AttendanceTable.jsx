// src/components/AttendanceTable.jsx
import React from "react";

function AttendanceTable({ records, isLoading, error }) {
  if (isLoading) {
    return <div className="card">Loading attendance...</div>;
  }

  if (error) {
    return <div className="card alert alert-danger">{error}</div>;
  }

  if (!records || records.length === 0) {
    return (
      <div className="card empty-state">
        <h2>No attendance records</h2>
        <p>Mark attendance to see records appear here.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Attendance Records</h2>
        <p>Log of recent attendance events.</p>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.employee.full_name}</td>
                <td>{record.employee.employee_id}</td>
                <td>{record.employee.department}</td>
                <td>
                  <span
                    className={
                      record.status === "PRESENT"
                        ? "status-pill status-pill-present"
                        : "status-pill status-pill-absent"
                    }
                  >
                    {record.status === "PRESENT" ? "Present" : "Absent"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceTable;

