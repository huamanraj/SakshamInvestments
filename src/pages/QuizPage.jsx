import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Layout from '../layouts/Layout';
import './QuizPage.css';

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: null
  });

  const questions = [
    {
      id: 1,
      question: 'Why are you looking for a wealth solution right now?',
      options: [
        'My financial life has become too complicated',
        'I\'m not sure my current advisor is the right fit anymore',
        'I\'ve had a major life change and need help',
        'There is something else nagging at me, but I can\'t put my finger on it',
      ],
    },
    {
      id: 2,
      question: 'What priorities are you looking to achieve?',
      options: [
        'Maximize portfolio growth',
        'Create a long-term plan and invest my wealth accordingly',
        'Diversify my concentrated stock',
        'Plan for retirement',
      ],
    },
    {
      id: 3,
      question: 'My current investments are mostly',
      options: [
        'Equities/Equity Mutual Funds',
        'Fixed Income',
        'Start Up\'s/ Global Investments',
        'Balanced between Equities and Fixed Income',
        'Real Estate',
      ],
    },
    {
      id: 4,
      question: 'What is the size of your investment portfolio?',
      options: [
        'Less than Rs 10 Million',
        'Between Rs 10 Million to Rs 50 Million',
        'Between Rs 50 Million to Rs 300 Million',
        'Above Rs 300 Million',
      ],
    },
    {
      id: 5,
      question: 'Where do you see your role in working with us?',
      options: [
        'I want to take all the decisions',
        'I want to be a collaborative partner in building and growing my wealth',
        'I want to be hands off with my wealth decisions',
      ],
    },
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep <= questions.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast.success('Form submitted successfully!');
    // Here you would typically send the data to your backend
    console.log('Quiz Answers:', answers);
    console.log('Form Data:', formData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      portfolio: file
    }));
  };

  const isCurrentStepAnswered = () => {
    if (currentStep <= questions.length) {
      return answers[currentStep] !== undefined;
    }
    return true;
  };

  const renderProgressSteps = () => {
    const totalSteps = 6; // 5 questions + 1 form
    return (
      <div className="progress-container">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index + 1} className="progress-step-wrapper">
            <div className={`progress-step ${currentStep >= index + 1 ? 'active' : ''}`}>
              {String(index + 1).padStart(2, '0')}
            </div>
            {index < totalSteps - 1 && (
              <div className={`progress-line ${currentStep > index + 1 ? 'completed' : ''}`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderQuestion = () => {
    const question = questions[currentStep - 1];
    
    return (
      <div className="quiz-card">
        {renderProgressSteps()}
        
        <div className="quiz-content">
          <h2 className="quiz-question">{question.question}</h2>
          
          <div className="quiz-options">
            {question.options.map((option, index) => (
              <label key={index} className="quiz-option">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswerSelect(question.id, option)}
                />
                <span className="quiz-option-text">{option}</span>
              </label>
            ))}
          </div>
          
          <div className="quiz-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="quiz-btn quiz-btn-secondary"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentStepAnswered()}
              className="quiz-btn quiz-btn-primary"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="quiz-card">
        {renderProgressSteps()}
        
        <form onSubmit={handleFormSubmit} className="quiz-form">
          <div className="form-group">
            <label htmlFor="name">What's your name?</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">What's your email?</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">What's your phone number</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="portfolio">Upload your current portfolio</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="portfolio"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                style={{ display: 'none' }}
              />
              <label htmlFor="portfolio" className="file-upload-label">
                <span>{formData.portfolio ? formData.portfolio.name : 'Select file to upload'}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>
            </div>
          </div>
          
          <div className="quiz-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="quiz-btn quiz-btn-secondary"
            >
              Previous
            </button>
            <button
              type="submit"
              className="quiz-btn quiz-btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Layout>
      <div className="quiz-page">
        <div className="quiz-background">
          <div className="grid-pattern"></div>
        </div>
        
        <div className="quiz-container">
          {currentStep <= questions.length ? renderQuestion() : renderForm()}
        </div>
      </div>
    </Layout>
  );
};

export default QuizPage; 