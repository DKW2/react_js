import './App.css';
import GrowingText from "./components/GrowingText.jsx";
import ColorfulText from './components/ColorfulText.jsx';
import ChangingText from './components/ChangingText.tsx';
import TimedJumpscare from './components/TimedJumpscare.tsx';
import Predict from './components/Predict.jsx';
import RandomNumber from './components/RandomNumber.jsx';

function App() {

  function textChange( text ){
    const fontSize = Math.min(16 + text.length * 2, 72);
    return fontSize
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Funny Project</h1>
        <div className="grid">
          <section className="card half">
            <h2>Growing Text</h2>
            <div className="card-content">
              <GrowingText />
            </div>
          </section>

          <section className="card half">
            <h2>Colorful Text</h2>
            <div className="card-content">
              <ColorfulText />
            </div>
          </section>

          <section className="card half">
            <h2>Changing Text</h2>
            <div className="card-content">
              <ChangingText textProperty='fontSize' textChange={textChange} />
            </div>
          </section>

          <section className="card half">
            <h2>Predict</h2>
            <div className="card-content">
              <Predict/>
            </div>
          </section>

          <section className="card half">
            <h2>Random Number</h2>
            <div className="card-content">
              <RandomNumber />
            </div>
          </section>

          <section className="card full">
            <h2>Timed Jumpscares</h2>
            <div className="card-content">
              <div className='Boo'>
                {Array.from( {length: 3}, (_, i) => (
                  <TimedJumpscare key={i} waitTime={(i + 1) * 1000} scareTime={(i + 1) * 1000} />
                )) }
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
