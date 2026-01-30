import React, { useEffect, useState } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";
import { fetchAttendance } from "../api";

function AttendancePage() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const totalRecords = records.length;
  const totalPresent = records.filter(r => r.status === "PRESENT").length;
  const totalAbsent = records.filter(r => r.status === "ABSENT").length;


  async function load(date) {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAttendance(date ? { date } : undefined);
      setRecords(data);
    } catch {
      setError("Unable to load attendance records.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleFilterChange(e) {
    const value = e.target.value;
    setFilterDate(value);
    load(value || undefined);
  }

return (
  <div className="attendance-page">
    <div className="attendance-top-row">
      <AttendanceForm onMarked={() => load(filterDate || undefined)} />

      <div className="card">
        <div className="card-header">
          <h2>Filters</h2>
          <p>Check attendance data by date.</p>
        </div>
        <div className="card-body">
          <label className="form-field">
            <span>Date</span>
            <input
              type="date"
              value={filterDate}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <h2>Summary</h2>
        <p>Attendance Overview. Select a date to check attendance for that day.</p>
      </div>
      <div className="card-body grid-3">
        <div className="form-field">
          <span>Total Records</span>
          <strong>{records.length}</strong>
        </div>
        <div className="form-field">
          <span>Present</span>
          <strong>{records.filter(r => r.status === "PRESENT").length}</strong>
        </div>
        <div className="form-field">
          <span>Absent</span>
          <strong>{records.filter(r => r.status === "ABSENT").length}</strong>
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
