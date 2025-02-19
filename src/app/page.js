"use client";

import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [user, setUser] = useState(null);
  const quizRef = useRef(null);

  useEffect(() => {
    fetch("/questions/history.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const shuffledQuestions = shuffleArray(data.history);
        setQuestions(shuffledQuestions);
      })
      .catch(error => console.error("Error loading questions:", error));
  }, []);

  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const { savedScore, savedQuestionIndex } = JSON.parse(savedProgress);
      setScore(savedScore);
      setCurrentQuestionIndex(savedQuestionIndex);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('quizProgress', JSON.stringify({
        savedScore: score,
        savedQuestionIndex: currentQuestionIndex,
      }));
    }
  }, [score, currentQuestionIndex, user]);

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentQuestionIndex];

  function handleAnswer(option) {
    if (option === currentQuestion.answer) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        handleNextQuestion();
      }, 2000);
    } else {
      handleNextQuestion();
    }
  }

  function handleNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz finished! Your score is ${score}/${questions.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  }

  const responseGoogle = (response) => {
    console.log(response);
    setUser(response.profileObj);
  };

  const scrollToQuiz = () => {
    if (quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white p-8 font-sans">
        <section className="flex flex-col items-center justify-center mt-32">
          <h1 className="text-6xl font-bold text-center mt-10 mb-8">
            The Europe Trivia Quiz
          </h1>
        </section>

        <section className="flex flex-col items-center justify-center mt-8 mb-8">
          <div className="w-full md:w-2/3 text-center">
            <p className="text-3xl font-bold mb-4">Test Your Knowledge of Europe: History, Culture, and More! 🌍💡</p>
          </div>
        </section>

        <button 
          onClick={scrollToQuiz} 
          className="flex items-center px-6 py-3 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition-colors mb-8 cursor-pointer"
        >
          Start Quiz
          <svg className="w-6 h-6 text-gray-800 dark:text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showConfetti && <Confetti />}
        
        <header className="text-2xl font-bold mt-20 mb-4">Score: {score}</header>
        
        <main ref={quizRef} className="flex flex-col items-center gap-8">
          <div className="text-center text-xl font-semibold">
            {currentQuestion.question}
          </div>
          <div className="flex flex-col gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="px-4 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition-colors cursor-pointer"
              >
                {option}
              </button>
            ))}
          </div>

          {!user && (
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log('Login Failed');
              }}
              className="mt-4 cursor-pointer"
            />
          )}
        </main>
      </div>
    </GoogleOAuthProvider>
  );
}
