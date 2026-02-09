import React from 'react';

const UserList = ({ users, loading, onEdit, onDelete }) => {
  if (loading && users.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 mb-0">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-light">
        <h5 className="mb-0">Users List ({users.length})</h5>
      </div>
      <div className="card-body p-0">
        {users.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-inbox display-4 mb-3"></i>
            <p className="mb-0">No users found. Create your first user!</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
<tr key={user._id}>
                    <td>
                      <strong>{user.firstName} {user.lastName}</strong>
                    </td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
  <div className="btn-group btn-group-sm" role="group">
    <button 
      className="btn btn-outline-primary"
      onClick={() => onEdit(user)}
      title="Edit User"
    >
      ✏️ Edit
    </button>
    <button 
      className="btn btn-outline-danger"
onClick={() => onDelete(user._id)}
      title="Delete User"
    >
      🗑️ Delete
    </button>
  </div>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
