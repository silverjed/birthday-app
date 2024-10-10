import React, { useState } from 'react';
import Confetti from 'react-confetti';
import './App.css';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Confetti lasts for 3 seconds
  };

  return (
    <div className="App">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="birthday-container" onClick={handleClick}>
        <h1>Happy Birthday!</h1>
        <input type="text" className="birthday-input" placeholder="Enter your birthday wish!" />
      </div>
    </div>
  );
}

export default App;
