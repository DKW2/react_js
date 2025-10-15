import './App.css';
import React, { useMemo, useState } from 'react';
import GrowingText from "./components/GrowingText.jsx";
import ColorfulText from './components/ColorfulText.jsx';
import ChangingText from './components/ChangingText.tsx';
import TimedJumpscare from './components/TimedJumpscare.tsx';
import Predict from './components/Predict.jsx';
import RandomNumber from './components/RandomNumber.jsx';
import GetFunnyWord from './components/GetFunnyWord.jsx';
import SolveLeetCode from './components/SolveLeetCode.jsx';

function App() {

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

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="page">
      <div className="container">
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
    </div>
  );
}

export default App;
