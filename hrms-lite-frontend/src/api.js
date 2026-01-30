// src/api.js
import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function fetchEmployees() {
  const response = await api.get("/employees/");
  return response.data;
}

export async function createEmployee(data) {
  const response = await api.post("/employees/", data);
  return response.data;
}

export async function deleteEmployee(id) {
  await api.delete(`/employees/${id}/`);
}

export async function markAttendance(data) {
  const response = await api.post("/attendance/", data);
  return response.data;
}

export async function fetchAttendance(params) {
  const response = await api.get("/attendance/", { params });
  return response.data;
}

export async function fetchEmployeeAttendance(employeeId, date) {
  const response = await api.get(`/employees/${employeeId}/attendance/`, {
    params: date ? { date } : undefined,
  });
  return response.data;
}
