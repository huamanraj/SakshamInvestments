import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizSection.css';

const QuizSection = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <section className="quiz-hero-section">
      <div className="quiz-hero-background">
        <div className="grid-pattern"></div>
      </div>
      
      <div className="quiz-hero-content">
        <h1 className="quiz-hero-title">
          Discover Your<br />
          Growth Potential<br />
          <span className="quiz-hero-subtitle">In 30 Seconds</span>
        </h1>
        
        <button 
          onClick={handleStartQuiz}
          className="quiz-start-button"
        >
          Start Quiz
        </button>
      </div>
    </section>
  );
};

export default QuizSection; 