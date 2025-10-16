import React from 'react';
import ArgumentInput from './ArgumentInput';

function ArgumentManager({ arguments: args, onArgumentsChange }) {
  const addArgument = () => {
    const newArgument = {
      type: 'number',
      name: '',
      value: ''
    };
    onArgumentsChange([...args, newArgument]);
  };

  const updateArgument = (index, updatedArgument) => {
    const newArguments = [...args];
    newArguments[index] = updatedArgument;
    onArgumentsChange(newArguments);
  };

  const deleteArgument = (index) => {
    const newArguments = args.filter((_, i) => i !== index);
    onArgumentsChange(newArguments);
  };


  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '12px' 
      }}>
        <h3 style={{ margin: 0 }}>Arguments</h3>
        <button 
          onClick={addArgument}
          style={{ 
            padding: '6px 12px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Argument
        </button>
      </div>
      
      {args.length === 0 ? (
        <p style={{ color: 'white', fontStyle: 'italic' }}>
          No arguments added. Click "Add Argument" to get started.
        </p>
      ) : (
        <div>
          {args.map((argument, index) => (
            <ArgumentInput
              key={index}
              argument={argument}
              onUpdate={updateArgument}
              onDelete={deleteArgument}
              index={index}
            />
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <strong style={{ color: '#333' }}>Arguments Preview:</strong>
        <pre style={{ margin: '4px 0 0 0', fontSize: '12px', overflow: 'auto', color: '#333' }}>
          {JSON.stringify(args, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default ArgumentManager;
