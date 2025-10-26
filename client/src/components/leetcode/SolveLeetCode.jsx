import { useState } from "react";
import axios from "axios";
import ProblemSelector from './ProblemSelector';
import ArgumentManager from './ArgumentManager';
import { API_URL } from "config";

export default function SolveLeetCode() {
  const [problemName, setProblemName] = useState("");
  const [args, setArgs] = useState([]);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const convertToArgsObject = () => {
    const argsObject = {};
    if (!Array.isArray(args)) return argsObject;
    
    args.forEach((arg, index) => {
      // Type checking for argument structure
      if (!arg || typeof arg !== 'object') {
        console.warn(`Argument at index ${index} is not a valid object, skipping.`);
        return;
      }
      
      // Validate required properties
      if (!arg.name || typeof arg.name !== 'string' || arg.name.trim() === '') {
        console.warn(`Argument at index ${index} has invalid name, skipping.`);
        return;
      }
      
      if (arg.value === undefined || arg.value === null) {
        console.warn(`Argument "${arg.name}" has no value, skipping.`);
        return;
      }
      
      if (!arg.type || typeof arg.type !== 'string') {
        console.warn(`Argument "${arg.name}" has invalid type, defaulting to string.`);
        arg.type = 'string';
      }
      
      let parsedValue;
      const trimmedValue = String(arg.value).trim();
      
      // Parse value based on type with validation
      switch (arg.type) {
        case 'number':
          const numValue = parseFloat(trimmedValue);
          if (isNaN(numValue)) {
            console.warn(`Argument "${arg.name}" value "${trimmedValue}" is not a valid number, skipping.`);
            return;
          }
          parsedValue = numValue;
          break;
          
        case 'boolean':
          const lowerValue = trimmedValue.toLowerCase();
          if (lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes') {
            parsedValue = true;
          } else if (lowerValue === 'false' || lowerValue === '0' || lowerValue === 'no') {
            parsedValue = false;
          } else {
            console.warn(`Argument "${arg.name}" value "${trimmedValue}" is not a valid boolean, skipping.`);
            return;
          }
          break;
          
        case 'array':
          try {
            // Try JSON parsing first
            parsedValue = JSON.parse(trimmedValue);
            if (!Array.isArray(parsedValue)) {
              throw new Error('Not an array');
            }
          } catch (e) {
            // Fallback to comma-separated parsing
            parsedValue = trimmedValue.split(',').map(item => {
              const trimmed = item.trim();
              // Try to parse each item as a number if possible
              const num = parseFloat(trimmed);
              return isNaN(num) ? trimmed : num;
            });
          }
          break;
          
        case 'object':
          try {
            parsedValue = JSON.parse(trimmedValue);
            if (typeof parsedValue !== 'object' || Array.isArray(parsedValue)) {
              throw new Error('Not an object');
            }
          } catch (e) {
            console.warn(`Argument "${arg.name}" value "${trimmedValue}" is not valid JSON, skipping.`);
            return;
          }
          break;
          
        case 'string':
        default:
          parsedValue = trimmedValue;
          break;
      }
      
      // Check for duplicate argument names
      if (argsObject.hasOwnProperty(arg.name)) {
        console.warn(`Duplicate argument name "${arg.name}" found, using the last one.`);
      }
      
      argsObject[arg.name] = parsedValue;
    });
    
    return argsObject;
  };

  const handleSubmit = async () => {
    if (!problemName) {
      setResult("Please select a problem first!");
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      const argsObject = convertToArgsObject();
      const payload = {
        data: argsObject,
        problemName: problemName
      };

      console.log('Sending payload:', payload);

      const res = await axios.post(`${API_URL}/array_problem`, payload);
      setResult(res.data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult("NETWORK ERROR: " + (error.message || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem", color: "white" }}>LeetCode Problem Solver</h2>
      
      <ProblemSelector 
        selectedProblem={problemName}
        onProblemChange={setProblemName}
      />
      
      <ArgumentManager 
        arguments={args}
        onArgumentsChange={setArgs}
      />
      
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button 
          onClick={handleSubmit}
          disabled={isLoading || !problemName}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: isLoading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          {isLoading ? "Solving..." : "Solve Problem"}
        </button>
      </div>
      
      {result && (
        <div style={{ 
          marginTop: "1rem", 
          padding: "1rem", 
          backgroundColor: "#f8f9fa", 
          border: "1px solid #dee2e6", 
          borderRadius: "4px" 
        }}>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#1a1a1a" }}>Result:</h3>
          <pre style={{ 
            margin: 0, 
            whiteSpace: "pre-wrap", 
            wordBreak: "break-word",
            fontSize: "14px",
            color: "#1a1a1a"
          }}>
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

