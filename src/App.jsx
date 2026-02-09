import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './components/userList';
import UserForm from './components/userForm';
import { userApi } from './services/api';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
     const data = await userApi.getAll();

const normalized = data.map((user) => ({
  ...user,
  id: user._id,
}));

setUsers(normalized);

    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await userApi.create(formData);
      setShowForm(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      setError('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

 const handleUpdate = async (formData) => {
  if (!selectedUser) return;
  
  try {
    setLoading(true);
    setError('');
    await userApi.update(selectedUser.id, formData);
    setShowForm(false);
    setSelectedUser(null);
    fetchUsers();
  } catch (err) {
    setError('Failed to update user');
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      setLoading(true);
      await userApi.delete(id);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">
            <i className="bi bi-people me-2"></i>User Management
          </h1>
          
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError('')}
              ></button>
            </div>
          )}

          {!showForm && (
            <div className="mb-3">
              <button 
                className="btn btn-success mb-3"
                onClick={() => setShowForm(true)}
                disabled={loading}
              >
                <i className="bi bi-plus-circle me-2"></i>Add New User
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <UserList 
            users={users}
            loading={loading}
            onEdit={(user) => {
              setSelectedUser(user);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        </div>
        
        <div className="col-lg-4">
          {showForm && (
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  {selectedUser ? 'Edit User' : 'Add New User'}
                </h5>
              </div>
              <div className="card-body p-4">
                <UserForm
                  user={selectedUser}
                  onSubmit={selectedUser ? handleUpdate : handleCreate}
                  onCancel={() => {
                    setShowForm(false);
                    setSelectedUser(null);
                  }}
                  loading={loading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
