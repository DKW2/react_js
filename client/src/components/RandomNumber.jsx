// Created by Cursor.ai
import React, { useState } from 'react';
import '../styles/RandomNumber.css';

function RandomNumber() {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  function generateRandom() {
    const min = Number(minValue);
    const max = Number(maxValue);

    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      setErrorMessage('Please enter valid numbers.');
      setRandomNumber(null);
      return;
    }

    if (max < min) {
      setErrorMessage('Max must be greater than or equal to Min.');
      setRandomNumber(null);
      return;
    }

    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(result);
    setErrorMessage('');
  }

  return (
    <div className="random-number-container">
      <h2 className="random-number-title">Random Number Generator</h2>
      <div className="random-number-controls">
        <label className="random-number-label">
          Min:
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            className="random-number-input"
          />
        </label>
        <label className="random-number-label">
          Max:
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            className="random-number-input"
          />
        </label>
        <button onClick={generateRandom} className="random-number-button">Generate</button>
      </div>
      {errorMessage && (
        <div className="random-number-error">{errorMessage}</div>
      )}
      {randomNumber !== null && !errorMessage && (
        <div className="random-number-result">
          Result: <strong>{randomNumber}</strong>
        </div>
      )}
    </div>
  );
}

export default RandomNumber;


