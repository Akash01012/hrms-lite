# HRMS Lite

HRMS Lite is a lightweight, production-ready Human Resource Management System designed for internal administrative use.  
It enables efficient employee management and daily attendance tracking through a clean, responsive dashboard.

---

## Project Overview

### Core Features

- **Employee Management**
  - Add employees (ID, name, email, department)
  - View complete employee directory  
  - Delete employees
  - Automatic present-day count per employee

- **Attendance Management**
  - Mark Present / Absent for any employee on any date
  - **View attendance records for each employee** (Employee ID search)
  - **Date filtering** 
  - **Combined filters** (Employee + Date)
  - Live summary (Total / Present / Absent counts)
  - One attendance record per employee per day

- **UI & UX**
  - Responsive dashboard
  - Professional dark-themed interface
  - Loading states and error handling

### Key Capabilities

- RESTful APIs with server-side validation
- Unique employee ID and email enforcement
- Proper error handling (400 / 404 with messages)
- Reusable frontend components
- **Single admin usage** (no authentication)

---

## Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React (JavaScript), Axios |
| Backend | Django, Django REST Framework |
| Database | PostgreSQL |
| Styling | Custom CSS |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## Local Run Commands

**Backend:**
```bash
cd hrms-lite-backend
pip install -r requirements.txt

# Set PostgreSQL env vars (one-time)
export POSTGRES_DB=hrms_lite
export POSTGRES_USER=hrms_user
export POSTGRES_PASSWORD=hrms_password
export POSTGRES_HOST=localhost
export POSTGRES_PORT=5432

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000

Backend: http://localhost:8000

Frontend:
bash
cd hrms-lite-frontend
npm install
npm start

Frontend: http://localhost:3000
PostgreSQL: Auto-configured in settings.py.
Production Deployment
Live App: https://hrms-lite-zeta.vercel.app
Backend API: https://hrms-lite-backend-7h3w.onrender.com/api
Repository: https://github.com/Akash01012/hrms-lite
