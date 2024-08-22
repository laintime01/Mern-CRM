import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClientManagement from './components/ClientManagement';
import ServiceRequests from './components/ServiceRequests';
import TaskManagement from './components/TaskManagement';
import Integration from './components/Integration';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Users from './components/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Navigation />
            </>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<ClientManagement />} />
          <Route path="services" element={<ServiceRequests />} />
          <Route path="tasks" element={<TaskManagement />} />
          <Route path="integration" element={<Integration />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;