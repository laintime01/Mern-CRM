import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar / Navigation */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 bg-blue-600">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            {/* Replace with your actual icon or logo */}
            <span className="text-blue-600 text-xl font-bold">CRM</span>
          </div>
        </div>
        <nav className="mt-8">
          <Link to="/dashboard" className={`flex items-center py-3 px-6 ${isActive('/dashboard')}`}>
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Overview
          </Link>
          <Link to="/dashboard/clients" className={`flex items-center py-3 px-6 ${isActive('/dashboard/clients')}`}>
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Client Management
          </Link>
          <Link to="/dashboard/services" className={`flex items-center py-3 px-6 ${isActive('/dashboard/services')}`}>
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Service Requests
          </Link>
          <Link to="/dashboard/tasks" className={`flex items-center py-3 px-6 ${isActive('/dashboard/tasks')}`}>
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Task Management
          </Link>
          <Link to="/dashboard/integration" className={`flex items-center py-3 px-6 ${isActive('/dashboard/integration')}`}>
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
            Integration & Automation
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;