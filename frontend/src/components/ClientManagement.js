import React, { useState, useEffect, useCallback } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { getClients, createClient, updateClient, deleteClient } from '../api/clients';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentClient, setCurrentClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getClients();
      setClients(res.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching clients', err);
      setClients([]);
      setError('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleCreateClient = async (clientData) => {
    setLoading(true);
    try {
      await createClient(clientData);
      fetchClients();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error creating client', err);
      setError('Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClient = async (clientData) => {
    setLoading(true);
    try {
      await updateClient(clientData._id, clientData);
      fetchClients();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error updating client', err);
      setError('Failed to update client');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setLoading(true);
      try {
        await deleteClient(clientId);
        fetchClients();
      } catch (err) {
        console.error('Error deleting client', err);
        setError('Failed to delete client');
      } finally {
        setLoading(false);
      }
    }
  };

  const openModal = (client = null) => {
    setCurrentClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentClient(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Client Management</h2>
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg flex items-center transition duration-300 ease-in-out"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Client
        </button>
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.length > 0 ? (
              clients.map(client => (
                <tr key={client._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openModal(client)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  {loading ? 'Loading...' : 'No clients found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <ClientModal
          client={currentClient}
          onClose={closeModal}
          onSave={currentClient ? handleUpdateClient : handleCreateClient}
        />
      )}
    </div>
  );
};

const ClientModal = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState(client || {
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          {client ? 'Edit Client' : 'Add New Client'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientManagement;