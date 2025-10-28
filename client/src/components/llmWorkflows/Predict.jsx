// frontend/src/App.jsx
// Simple script utilizing axios to access fastAPI server.
import { useState } from "react";
import axios from "axios";
import { API_URL } from "config";

export default function Predict() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post(`${API_URL}/predict`, { text })
    .then( res => setResult(res.data.result) )
    .catch( error => setResult( "NETWORK ERROR") );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>React + FastAPI App</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
      <button onClick={handleSubmit}>Predict</button>
      <p>Result: {result}</p>
    </div>
  );
}

