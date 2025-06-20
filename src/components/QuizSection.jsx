import React, { useState } from 'react';

const QuizSection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

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

  const handleOptionChange = (questionId, option) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: option,
    }));
  };

  const currentQuestion = questions[step - 1];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Discover Your Growth Potential In 30 Seconds
        </h2>

        {currentQuestion && (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <p className="text-sm text-gray-500 mb-4">{`0${step} / 0${questions.length}`}</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.question}</h3>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full text-left py-3 px-4 rounded-md border ${formData[currentQuestion.id] === option ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'}
                  `}
                  onClick={() => handleOptionChange(currentQuestion.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                disabled={step === 1}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setStep((prev) => Math.min(questions.length, prev + 1))}
                disabled={step === questions.length && Object.keys(formData).length < questions.length}
                className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
              >
                {step === questions.length ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {!currentQuestion && (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Thank you for completing the quiz!</h3>
            {/* You can display a summary or redirect here */}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizSection; 