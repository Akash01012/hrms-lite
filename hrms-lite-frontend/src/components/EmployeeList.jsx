import React from "react";

function EmployeeList({ employees, isLoading, error, onDelete }) {
  if (isLoading) {
    return <div className="card">Loading employees...</div>;
  }

  if (error) {
    return <div className="card alert alert-danger">{error}</div>;
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="card empty-state">
        <h2>No employees yet</h2>
        <p>Add your first employee to start tracking attendance.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Employees</h2>
        <p>Directory of all active employees.</p>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Present Days</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.total_present_days ?? 0}</td>
                <td className="cell-actions">
                  <button
                    className="btn-danger"
                    onClick={() => onDelete(emp.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
