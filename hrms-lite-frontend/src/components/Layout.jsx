import React from "react";
import "./Layout.css";
import logo from "../images/icon-logo-2.png";

function Layout({ children, currentView, onChangeView }) {
  return (
    <div className="layout-root">
      <header className="layout-header">
        <div className="layout-brand">
          <img
            src={logo}
            alt="HRMS Lite Logo"
            className="brand-logo"
          />
          <span className="brand-text">HRMS Lite</span>
        </div>
        <nav className="layout-nav">
          <button
            className={
              currentView === "employees"
                ? "nav-link nav-link-active"
                : "nav-link"
            }
            onClick={() => onChangeView("employees")}
          >
            Employees
          </button>
          <button
            className={
              currentView === "attendance"
                ? "nav-link nav-link-active"
                : "nav-link"
            }
            onClick={() => onChangeView("attendance")}
          >
            Attendance
          </button>
        </nav>
      </header>
      <main className="layout-main">{children}</main>
      <footer className="layout-footer">
        <span>HRMS Lite · Internal HR Tool</span>
      </footer>
    </div>
  );
}

export default Layout;
