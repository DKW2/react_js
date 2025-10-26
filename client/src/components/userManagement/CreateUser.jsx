import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import 'styles/CreateUser.css';

function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users`, formData);
      setResult(`User created successfully! ID: ${response.data.id || 'N/A'}`);
      setFormData({ name: '', email: '' }); // Reset form
    } catch (error) {
      console.error('Error creating user:', error);
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

  return (
    <div className="create-user-container">
      <h2 className="create-user-title">Create User</h2>
      
      <form onSubmit={handleSubmit} className="create-user-form">
        <div className="create-user-input-group">
          <label className="create-user-label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter user name"
            className="create-user-input"
            disabled={isLoading}
          />
        </div>

        <div className="create-user-input-group">
          <label className="create-user-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            className="create-user-input"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`create-user-button create-user-button-primary`}
        >
          {isLoading ? 'Creating...' : 'Create User'}
        </button>
      </form>

      {error && (
        <div className="create-user-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="create-user-success">
          <strong>Success:</strong> {result}
        </div>
      )}
    </div>
  );
}

export default CreateUser;
