import { useEffect, useState } from "react";

export default function ColorfulText() {

  const [text, setText] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          fontWeight: "bold",
          color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
        }}
      />
    </div>
  );
}
