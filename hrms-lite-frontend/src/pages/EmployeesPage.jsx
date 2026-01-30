// src/pages/EmployeesPage.jsx
import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import { fetchEmployees, deleteEmployee } from "../api";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Unable to load employees. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Remove this employee and all attendance records?")) {
      return;
    }
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert("Unable to delete employee. Please retry.");
    }
  }

  return (
    <div className="page-grid">
      <EmployeeForm onCreated={load} />
      <EmployeeList
        employees={employees}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default EmployeesPage;
