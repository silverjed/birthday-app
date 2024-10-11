import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFlame, setIsFlame] = useState(false); // State for flame animation
  const [wishes, setWishes] = useState([]); // Store birthday wishes
  const [submissionCount, setSubmissionCount] = useState(0); // Track submissions
  const [showImage, setShowImage] = useState(false); // State to show generated image
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Function to calculate time remaining until next birthday
  const calculateTimeLeft = () => {
    const targetDate = new Date('October 10, 2025 00:00:00');
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    // Trigger confetti and flame animation
    setShowConfetti(true);
    setIsFlame(true); // Set flame animation state
    setTimeout(() => {
      setShowConfetti(false);
      setIsFlame(false); // Reset flame animation state after timeout
    }, 25000); // Confetti lasts for 25 seconds
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const wishInput = e.target.elements.wish;
    const newWish = wishInput.value;

    if (newWish) {
      setWishes([...wishes, newWish]);
      setSubmissionCount(submissionCount + 1); // Increment submission count
      wishInput.value = ''; // Clear input after submission
    }

    // Check if 10 submissions have been made
    if (submissionCount + 1 === 10) {
      setShowImage(true); // Show the image after 10 submissions
      setTimeout(() => setShowImage(false), 5000); // Hide the image after 5 seconds
      setSubmissionCount(0); // Reset submission count
    }
  };

  return (
    <div className="App">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Countdown Modal */}
      <div className="countdown-modal">
        <div>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </div>

      {/* Upper Container */}
      <div className="upper-container">
        <div className="upper-item">
          <h1>Happy Birthday!</h1>
        </div>
      </div>

      {/* Lower Container with two items */}
      <div className="lower-container">
        <div className="lower-item">
          <h2>Things I like about Michele</h2>
          <ul className='centered-list'>
            <li>She is kind</li>
          </ul>
        </div>
        <div className="lower-item">
          <h2>Things I hope for Michele</h2>
          <ul className='centered-list'>
            <li>The best in her exams</li>
            <li>Queer joy</li>
            <li>More of me, LOL!</li>
          </ul>
        </div>
      </div>

      {/* Birthday Container */}
      <div className="birthday-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="wish" className="birthday-input" placeholder="Enter your birthday wish!" />
          <button 
            className={isFlame ? 'flame' : 'button'} 
            type="submit" 
            onClick={handleClick}
          >
            {isFlame ? '' : 'Submit'} {/* Show empty if flame animation is active */}
          </button>
        </form>
      </div>

      {/* Image Display on 10 Submissions */}
      {showImage && (
        <div className="image-container">
          <img src="path/to/your/image.jpg" alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default App;
