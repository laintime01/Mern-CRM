import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser, assignRole } from '../api/users';

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      setNewUser({ name: '', email: '', password: '', role: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editingUser.id, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAssignRole = async (userId, role) => {
    try {
      await assignRole(userId, role);
      fetchUsers();
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Create User Form */}
      <form onSubmit={handleCreateUser} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="p-2 mr-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="p-2 mr-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="p-2 mr-2 border rounded"
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="p-2 mr-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create User</button>
      </form>

      {/* User List */}
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} className="mb-4 p-4 border rounded">
            {editingUser && editingUser.id === user.id ? (
              <form onSubmit={handleUpdateUser}>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="p-2 mr-2 border rounded"
                  required
                />
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="p-2 mr-2 border rounded"
                  required
                />
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="p-2 mr-2 border rounded"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <button type="submit" className="bg-green-500 text-white p-2 rounded mr-2">Save</button>
                <button onClick={() => setEditingUser(null)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
              </form>
            ) : (
              <>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <button onClick={() => setEditingUser(user)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white p-2 rounded mr-2">Delete</button>
                <select
                  value={user.role}
                  onChange={(e) => handleAssignRole(user.id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;