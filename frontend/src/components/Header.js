import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, register } from '../api/auth';

function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await register(newUser.name, newUser.email, newUser.password);
      setShowAddUser(false);
      setNewUser({ name: '', email: '', password: '' });
      alert('User added successfully');
    } catch (error) {
      console.error('Error adding new user:', error);
      alert('Failed to add new user');
    }
  };

  return (
    <header className="bg-blue-800 text-white p-4">
      <div className="container justify-between items-center">
        <h1 className="text-2xl font-bold ml-4">CRM System</h1>
        {currentUser && (
          <div className="flex items-center">
            <span className="mr-4 text-gray-300">Welcome, {currentUser.name}</span>
            <button
              onClick={() => setShowAddUser(true)}
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 transition-colors duration-200"
            >
              Add User
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {showAddUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New User</h3>
              <form onSubmit={handleAddUser} className="mt-2 text-left">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="mt-2 p-2 w-full border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="mt-2 p-2 w-full border rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="mt-2 p-2 w-full border rounded"
                  required
                />
                <div className="items-center px-4 py-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Add User
                  </button>
                </div>
              </form>
              <button
                onClick={() => setShowAddUser(false)}
                className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;