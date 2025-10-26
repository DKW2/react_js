import {useState} from "react";

export default function ChangingText( {textProperty, textChange}: {textProperty: string; textChange: ( textSize: string) => string;} ){
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
            [textProperty]: textChange(text)
        }}
        />
    </div>
    );
}