// Created by Cursor.ai
import React, { useState } from 'react';

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
    <div style={{ margin: '16px 0' }}>
      <h2>Random Number Generator</h2>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label>
          Min:
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            style={{ marginLeft: 4 }}
          />
        </label>
        <label>
          Max:
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            style={{ marginLeft: 4 }}
          />
        </label>
        <button onClick={generateRandom}>Generate</button>
      </div>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: 8 }}>{errorMessage}</div>
      )}
      {randomNumber !== null && !errorMessage && (
        <div style={{ marginTop: 8 }}>
          Result: <strong>{randomNumber}</strong>
        </div>
      )}
    </div>
  );
}

export default RandomNumber;


