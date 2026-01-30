// src/App.jsx
import React, { useState } from "react";
import Layout from "./components/Layout";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import "./App.css";

function App() {
  const [view, setView] = useState("employees");

  return (
    <Layout currentView={view} onChangeView={setView}>
      {view === "employees" ? <EmployeesPage /> : <AttendancePage />}
    </Layout>
  );
}

export default App;
