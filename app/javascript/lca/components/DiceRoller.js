import React, { useState } from 'react';

const DiceRoller = () => {
  const [diceCount, setDiceCount] = useState(1);
  const [targetNumber, setTargetNumber] = useState(7);
  const [doubleSuccess, setDoubleSuccess] = useState(10);
  const [result, setResult] = useState('');

  const handleRoll = () => {
    let successes = 0;
    let rolls = [];
    for (let i = 0; i < diceCount; i++) {
      const roll = Math.floor(Math.random() * 10) + 1;
      rolls.push(roll);
      if (roll >= targetNumber) {
        successes++;
      }
      if (roll >= doubleSuccess) {
        successes++;
      }
    }
    setResult(`Rolls: ${rolls.join(', ')} | Successes: ${successes}`);
  };

  const styles = {
    container: {
      padding: '1em',
      border: '1px solid #ccc',
      borderRadius: '4px',
      margin: '1em 0',
    },
    inputGroup: {
      marginBottom: '1em',
    },
    label: {
      display: 'block',
      marginBottom: '0.5em',
    },
    input: {
      width: '100%',
      padding: '0.5em',
      boxSizing: 'border-box',
    },
    button: {
      padding: '0.5em 1em',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    result: {
      marginTop: '1em',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Number of Dice</label>
        <input
          type="number"
          value={diceCount}
          onChange={(e) => setDiceCount(parseInt(e.target.value, 10))}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Target Number</label>
        <input
          type="number"
          value={targetNumber}
          onChange={(e) => setTargetNumber(parseInt(e.target.value, 10))}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Double Successes on</label>
        <input
          type="number"
          value={doubleSuccess}
          onChange={(e) => setDoubleSuccess(parseInt(e.target.value, 10))}
          style={styles.input}
        />
      </div>
      <button onClick={handleRoll} style={styles.button}>
        Roll
      </button>
      <div style={styles.result}>{result}</div>
    </div>
  );
};

export default DiceRoller;
