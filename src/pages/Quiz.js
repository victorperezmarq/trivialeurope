import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import questionsData from '../data/questions.json';

const Quiz = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timer, setTimer] = useState(null);
  
  useEffect(() => {
    // Filter questions by category or get random questions
    let filteredQuestions;
    if (category === 'random') {
      // Get 10 random questions across all categories
      filteredQuestions = [...questionsData].sort(() => 0.5 - Math.random()).slice(0, 10);
    } else {
      // Get questions for specific category
      filteredQuestions = questionsData
        .filter(q => q.category === category)
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
    }
    
    setQuestions(filteredQuestions);
    resetQuiz();
  }, [category]);
  
  useEffect(() => {
    // Set up timer for current question
    if (!isAnswered && !quizCompleted && questions.length > 0) {
      const newTimer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(newTimer);
            handleAnswerSelect(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimer(newTimer);
      return () => clearInterval(newTimer);
    }
  }, [currentQuestionIndex, isAnswered, quizCompleted, questions.length]);
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsAnswered(false);
    setQuizCompleted(false);
    setTimeLeft(15);
    if (timer) clearInterval(timer);
  };
  
  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    if (timer) clearInterval(timer);
    
    // Check if answer is correct
    const currentQuestion = questions[currentQuestionIndex];
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setQuizCompleted(true);
    }
  };
  
  // If questions are not loaded yet
  if (questions.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Loading quiz...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Quiz completed screen
  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary-700 text-white py-6 px-8">
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">
                {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : percentage >= 40 ? '👍' : '🤔'}
              </div>
              <h3 className="text-3xl font-bold text-primary-700 mb-2">
                Your score: {score}/{questions.length}
              </h3>
              <p className="text-xl text-gray-600">
                ({percentage}%)
              </p>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mt-6">
                <div 
                  className="bg-primary-500 h-4 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <Link to="/" className="btn btn-secondary mr-4">
                Back to Home
              </Link>
              <button 
                onClick={resetQuiz} 
                className="btn btn-primary"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-10">
      {/* Quiz header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-sm font-medium text-gray-500">Category</span>
          <h2 className="text-xl font-semibold text-primary-700 capitalize">
            {category === 'random' ? 'Mixed Categories' : category}
          </h2>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-500">Question</span>
          <div className="text-xl font-semibold text-primary-700">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div 
          className="bg-primary-500 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Timer */}
      <div className="mb-6 flex justify-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-primary-200 bg-white shadow">
          <span className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-primary-700'}`}>
            {timeLeft}
          </span>
        </div>
      </div>
      
      {/* Question */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            {currentQuestion.question}
          </h3>
          
          {/* Answer options */}
          <div className="space-y-3">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedAnswer === index 
                    ? index === currentQuestion.correctAnswer 
                      ? 'bg-green-100 border-green-500 text-green-800' 
                      : 'bg-red-100 border-red-500 text-red-800'
                    : isAnswered && index === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 mr-3">
                    {['A', 'B', 'C', 'D'][index]}
                  </span>
                  <span>{answer}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <div>
          <Link to="/" className="btn btn-secondary">
            Exit Quiz
          </Link>
        </div>
        <div>
          {isAnswered && (
            <button 
              className="btn btn-primary"
              onClick={goToNextQuestion}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz; 