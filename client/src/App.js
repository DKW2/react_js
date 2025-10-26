import './styles/App.css';
import React from 'react';
import { ThemeProvider } from "./ThemeContext.jsx";
import ThemeSwitch from './components/ThemeSwitch.jsx';
import TabGroup from './components/TabGroup.jsx';

function App() {

  return (
    <ThemeProvider>
      <TabGroup />
      <ThemeSwitch />
    </ThemeProvider>
  );
}

export default App;
