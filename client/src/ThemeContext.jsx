import { createContext, useContext, useState } from "react";

// 1️⃣ Create the context (with default undefined)
const ThemeContext = createContext(undefined);

// 2️⃣ Create a provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // "light" | "dark"

  // toggle between modes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // value shared with the whole app
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3️⃣ Custom hook (optional but recommended)
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
