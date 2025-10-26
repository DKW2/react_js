// frontend/src/App.jsx
// Simple script utilizing axios to access fastAPI server.
import { useState } from "react";
import axios from "axios";

export default function GetFunnyWord() {
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const res = await axios.get("http://localhost:8000/funny_word")
    .then( res => setResult(res.data.result) )
    .catch( error => setResult( "NETWORK ERROR") );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>React + FastAPI App + Get Request</h1>
      <button onClick={handleSubmit}>Predict</button>
      <p>Result: {result}</p>
    </div>
  );
}

