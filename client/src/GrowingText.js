import { useEffect, useState } from "react";

export default function GrowingText() {

  const [text, setText] = useState("");

  const fontSize = Math.min(16 + text.length * 2, 72); 

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginTop: "20px",
          fontSize: `${fontSize}px`,
          transition: "font-size 0.2s ease",
          fontWeight: "bold",
        }}
      >
        {text || "Preview here"}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
        }}
      />
    </div>
  );
}
