import React, { useEffect, useState } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";
import { fetchAttendance } from "../api";

function AttendancePage() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterEmployeeId, setFilterEmployeeId] = useState("");
  
  const totalRecords = records.length;
  const totalPresent = records.filter(r => r.status === "PRESENT").length;
  const totalAbsent = records.filter(r => r.status === "ABSENT").length;

  async function load() {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};
      if (filterDate) params.date = filterDate;
      if (filterEmployeeId) params.employee_id = filterEmployeeId;
      const data = await fetchAttendance(params);
      setRecords(data);
    } catch {
      setError("Unable to load attendance records.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [filterDate, filterEmployeeId]);

  function handleDateFilterChange(e) {
    setFilterDate(e.target.value);
  }

  function handleEmployeeFilterChange(e) {
    setFilterEmployeeId(e.target.value);
  }

  return (
    <div className="attendance-page">
      <div className="attendance-top-row">
        <AttendanceForm onMarked={load} />
        <div className="card">
          <div className="card-header">
            <h2>Filters</h2>
            <p>View attendance records for each employee or by date</p>
          </div>
          <div className="card-body grid-2">
            <label className="form-field">
              <span>Employee ID</span>
              <input
                type="text"
                value={filterEmployeeId}
                onChange={handleEmployeeFilterChange}
                placeholder="EMP-001"
              />
            </label>
            <label className="form-field">
              <span>Date</span>
              <input
                type="date"
                value={filterDate}
                onChange={handleDateFilterChange}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Summary</h2>
          <p>Attendance Overview. Select filters above.</p>
        </div>
        <div className="card-body grid-3">
          <div className="form-field">
            <span>Total Records</span>
            <strong>{totalRecords}</strong>
          </div>
          <div className="form-field">
            <span>Present</span>
            <strong>{totalPresent}</strong>
          </div>
          <div className="form-field">
            <span>Absent</span>
            <strong>{totalAbsent}</strong>
          </div>
        </div>
      </div>

      <AttendanceTable
        records={records}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default AttendancePage;
