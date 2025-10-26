import React from 'react';

function ArgumentInput({ argument, onUpdate, onDelete, index }) {
  const handleTypeChange = (e) => {
    onUpdate(index, { ...argument, type: e.target.value });
  };

  const handleNameChange = (e) => {
    onUpdate(index, { ...argument, name: e.target.value });
  };

  const handleValueChange = (e) => {
    onUpdate(index, { ...argument, value: e.target.value });
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      alignItems: 'center', 
      marginBottom: '8px',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#f9f9f9'
    }}>
      <select 
        value={argument.type} 
        onChange={handleTypeChange}
        style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="number">Number</option>
        <option value="string">String</option>
        <option value="boolean">Boolean</option>
        <option value="array">Array</option>
        <option value="object">Object</option>
      </select>
      
      <input
        type="text"
        placeholder="Argument name"
        value={argument.name}
        onChange={handleNameChange}
        style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
      />
      
      <input
        type="text"
        placeholder="Value"
        value={argument.value}
        onChange={handleValueChange}
        style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
      />
      
      <button 
        onClick={() => onDelete(index)}
        style={{ 
          padding: '4px 8px', 
          backgroundColor: '#ff4444', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default ArgumentInput;
