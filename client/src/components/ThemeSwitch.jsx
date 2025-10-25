import { useTheme } from "../ThemeContext.jsx";

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default ThemeSwitch;
