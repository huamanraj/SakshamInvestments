import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ID } from 'appwrite';
import { databases, storage, DATABASE_ID, QUIZ_COLLECTION_ID, STORAGE_BUCKET_ID } from '../lib/appwrite';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);

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

  const validateFile = (file) => {
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB');
      return false;
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload only PDF, DOC, DOCX, XLS, XLSX, CSV, or image files');
      return false;
    }

    return true;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!validateFile(file)) {
      e.target.value = ''; // Reset file input
      return;
    }

    setFileUploading(true);
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      
      setFormData(prev => ({
        ...prev,
        portfolio: {
          file: file,
          fileId: response.$id,
          fileName: file.name
        }
      }));
      
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      e.target.value = ''; // Reset file input
    } finally {
      setFileUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare quiz data
      const quizData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        answers: JSON.stringify(answers),
        portfolio_file_id: formData.portfolio?.fileId || null
      };

      // Save to database
      await databases.createDocument(
        DATABASE_ID,
        QUIZ_COLLECTION_ID,
        ID.unique(),
        quizData
      );

      toast.success('Quiz submitted successfully! We will contact you soon.');
      
      // Reset form
      setAnswers({});
      setFormData({
        name: '',
        email: '',
        phone: '',
        portfolio: null
      });
      setCurrentStep(1);
      
      // Reset file input
      const fileInput = document.getElementById('portfolio');
      if (fileInput) {
        fileInput.value = '';
      }
      
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="portfolio">Upload your current portfolio (Optional)</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="portfolio"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg,.gif,.webp"
                style={{ display: 'none' }}
                disabled={fileUploading || isSubmitting}
              />
              <label htmlFor="portfolio" className={`file-upload-label ${fileUploading ? 'uploading' : ''}`}>
                <span>
                  {fileUploading 
                    ? 'Uploading...' 
                    : formData.portfolio 
                      ? formData.portfolio.fileName 
                      : 'Select file to upload (Max 5MB)'
                  }
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX, CSV, PNG, JPG, GIF, WEBP
            </p>
          </div>
          
          <div className="quiz-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={isSubmitting}
              className="quiz-btn quiz-btn-secondary"
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={isSubmitting || fileUploading}
              className="quiz-btn quiz-btn-primary"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
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