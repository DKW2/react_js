import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import '../../styles/FetchUsers.css';

function FetchUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastFetch, setLastFetch] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
      setLastFetch(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response) {
        setError(`Server error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        setError('Network error: Unable to connect to server');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setDeletingId(userId);
    setError('');

    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      // Remove the user from the local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setLastFetch(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.response) {
        setError(`Server error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        setError('Network error: Unable to connect to server');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fetch-users-container">
      <div className="fetch-users-header">
        <h2 className="fetch-users-title">Users List</h2>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="fetch-users-refresh-button"
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {lastFetch && (
        <p className="fetch-users-last-updated">
          Last updated: {lastFetch}
        </p>
      )}

      {error && (
        <div className="fetch-users-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoading && users.length === 0 ? (
        <div className="fetch-users-loading">
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div className="fetch-users-empty">
          No users found
        </div>
      ) : (
        <div className="fetch-users-table">
          <div className="fetch-users-header-row">
            <div className="fetch-users-header-cell">ID</div>
            <div className="fetch-users-header-cell">Name</div>
            <div className="fetch-users-header-cell">Email</div>
            <div className="fetch-users-header-cell">Actions</div>
          </div>
          
          {users.map((user, index) => (
            <div
              key={user.id || index}
              className="fetch-users-data-row"
            >
              <div className="fetch-users-data-cell">
                {user.id || 'N/A'}
              </div>
              <div className="fetch-users-data-cell-name">
                {user.name || 'N/A'}
              </div>
              <div className="fetch-users-data-cell-email">
                {user.email || 'N/A'}
              </div>
              <div className="fetch-users-data-cell-actions">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={deletingId === user.id || !user.id}
                  className="fetch-users-delete-button"
                >
                  {deletingId === user.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {users.length > 0 && (
        <div className="fetch-users-count">
          Total users: {users.length}
        </div>
      )}
    </div>
  );
}

export default FetchUsers;
