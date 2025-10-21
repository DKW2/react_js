import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

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
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <h2 style={{ margin: 0, color: "white" }}>Users List</h2>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: isLoading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {lastFetch && (
        <p style={{ color: '#ccc', fontSize: '14px', margin: '0 0 1rem 0' }}>
          Last updated: {lastFetch}
        </p>
      )}

      {error && (
        <div style={{
          marginBottom: '1rem',
          padding: '0.75rem',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          color: '#721c24'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoading && users.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: 'white' 
        }}>
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: '#ccc',
          fontStyle: 'italic'
        }}>
          No users found
        </div>
      ) : (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 200px 100px',
            padding: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            fontWeight: 'bold',
            color: 'white',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.2)', paddingRight: '1rem' }}>ID</div>
            <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.2)', paddingRight: '1rem', paddingLeft: '1rem' }}>Name</div>
            <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.2)', paddingRight: '1rem', paddingLeft: '1rem' }}>Email</div>
            <div style={{ paddingLeft: '1rem', textAlign: 'center' }}>Actions</div>
          </div>
          
          {users.map((user, index) => (
            <div
              key={user.id || index}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 200px 100px',
                padding: '1rem',
                borderBottom: index < users.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                alignItems: 'center'
              }}
            >
              <div style={{ 
                color: '#ccc', 
                fontFamily: 'monospace',
                borderRight: '1px solid rgba(255, 255, 255, 0.2)',
                paddingRight: '1rem',
                textAlign: 'center'
              }}>
                {user.id || 'N/A'}
              </div>
              <div style={{ 
                color: 'white',
                borderRight: '1px solid rgba(255, 255, 255, 0.2)',
                paddingRight: '1rem',
                paddingLeft: '1rem',
                wordBreak: 'break-word'
              }}>
                {user.name || 'N/A'}
              </div>
              <div style={{ 
                color: '#ccc',
                borderRight: '1px solid rgba(255, 255, 255, 0.2)',
                paddingRight: '1rem',
                paddingLeft: '1rem',
                wordBreak: 'break-word'
              }}>
                {user.email || 'N/A'}
              </div>
              <div style={{ 
                paddingLeft: '1rem',
                textAlign: 'center'
              }}>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={deletingId === user.id || !user.id}
                  style={{
                    padding: '4px 8px',
                    fontSize: '12px',
                    backgroundColor: deletingId === user.id ? '#ccc' : '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: deletingId === user.id || !user.id ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >
                  {deletingId === user.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {users.length > 0 && (
        <div style={{ 
          marginTop: '1rem', 
          textAlign: 'center', 
          color: '#ccc', 
          fontSize: '14px' 
        }}>
          Total users: {users.length}
        </div>
      )}
    </div>
  );
}

export default FetchUsers;
