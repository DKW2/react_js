import 'styles/App.css';
import React, { useMemo, useState, useEffect } from 'react';
import GrowingText from "./miscellaneous/GrowingText.jsx";
import ColorfulText from './miscellaneous/ColorfulText.jsx';
import ChangingText from './miscellaneous/ChangingText.tsx';
import TimedJumpscare from './miscellaneous/TimedJumpscare.tsx';
import Predict from './Predict.jsx';
import RandomNumber from './miscellaneous/RandomNumber.jsx';
import GetFunnyWord from './miscellaneous/GetFunnyWord.jsx';
import SolveLeetCode from './leetcode/SolveLeetCode.jsx';
import CreateUser from './userManagement/CreateUser.jsx';
import FetchUsers from './userManagement/FetchUsers.jsx';
import QueryTelephone from './QueryTelephone.jsx';
import QueryLLM from './QueryLLM.jsx';
import { useTheme } from "../ThemeContext.jsx";

function App() {

const { theme } = useTheme();

  function textChange( text ){
    const fontSize = Math.min(16 + text.length * 2, 72);
    return fontSize
  }

  const tabs = useMemo(() => ([
    { id: 'growing', label: 'Growing Text', render: () => (<GrowingText />) },
    { id: 'colorful', label: 'Colorful Text', render: () => (<ColorfulText />) },
    { id: 'changing', label: 'Changing Text', render: () => (<ChangingText textProperty='fontSize' textChange={textChange} />) },
    { id: 'predict', label: 'Predict', render: () => (<Predict />) },
    { id: 'leetcode', label: 'Solve Leetcode', render: () => (<SolveLeetCode />) },
    { id: 'createuser', label: 'Create User', render: () => (<CreateUser />) },
    { id: 'fetchusers', label: 'Fetch Users', render: () => (<FetchUsers />) },
    { id: 'queryllm', label: 'Query LLM', render: () => (<QueryLLM />) },
    { id: 'querytelephone', label: 'Query Telephone', render: () => (<QueryTelephone />) },
    { id: 'funny', label: 'Get Funny word', render: () => (<GetFunnyWord />) },
    { id: 'random', label: 'Random Number', render: () => (<RandomNumber />) },
    { id: 'jumpscares', label: 'Timed Jumpscares', render: () => (
      <div className='Boo'>
        {Array.from( {length: 3}, (_, i) => (
          <TimedJumpscare key={i} waitTime={(i + 1) * 1000} scareTime={(i + 1) * 1000} />
        )) }
      </div>
    ) },
  ]), []);

  const [activeTab, setActiveTab] = useState(() => {
    // Initialize with saved tab or default to first tab
    const savedTab = localStorage.getItem('activeTab');
    return savedTab && tabs.find(tab => tab.id === savedTab) ? savedTab : tabs[0].id;
  });

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <div className= {theme === "light" ? "light_page" : "dark_page"}>
        <h1 className="title">Testing/JS Project</h1>
        <div className="tabs">
        <div className="tab-list" role="tablist" aria-label="Components">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
            >
                {tab.label}
            </button>
            ))}
        </div>

        <section className="card tab-panel" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
            <h2>{tabs.find(t => t.id === activeTab)?.label}</h2>
            <div className="card-content">
            {tabs.find(t => t.id === activeTab)?.render()}
            </div>
        </section>
        </div>
    </div>
  );
}

export default App;
