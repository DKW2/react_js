import './App.css';
import React, { useMemo, useState, useEffect } from 'react';
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
