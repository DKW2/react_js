import './App.css';
import GrowingText from "./components/GrowingText.jsx";
import ColorfulText from './components/ColorfulText.jsx';
import ChangingText from './components/ChangingText.tsx';

function App() {

  function textChange( text ){
    const fontSize = Math.min(16 + text.length * 2, 72);
    return fontSize
  }

  return (
    <div>
      <h1>Funny Project</h1>
      <GrowingText />
      <ColorfulText />
      <ChangingText textProperty='fontSize' textChange={textChange} />
    </div>
  );
}

export default App;
