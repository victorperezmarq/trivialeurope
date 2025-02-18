"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Confetti from "react-confetti";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const questions = [
  {
    question: "What is the largest country in Europe by land area?",
    options: ["France", "Germany", "Russia", "Spain"],
    answer: "Russia",
  },
  {
    question: "In which year was the European Union founded with the Maastricht Treaty?",
    options: ["1986", "1992", "2000", "1973"],
    answer: "1992",
  },
  {
    question: "Which city is the official seat of the European Parliament?",
    options: ["Brussels", "Strasbourg", "Luxembourg", "Frankfurt"],
    answer: "Strasbourg",
  },
  {
    question: "Which of these countries is NOT part of the Eurozone?",
    options: ["Portugal", "Sweden", "Italy", "Belgium"],
    answer: "Sweden",
  },
  {
    question: "What is the longest river in Europe?",
    options: ["Danube", "Seine", "Volga", "Rhine"],
    answer: "Volga",
  },
  {
    question: "Which is the only European country with a capital city that starts with 'Z'?",
    options: ["Switzerland", "Croatia", "Slovakia", "Slovenia"],
    answer: "Slovenia",
  },
  {
    question: "In which country is the Leaning Tower of Pisa located?",
    options: ["Italy", "Spain", "France", "Greece"],
    answer: "Italy",
  },
  {
    question: "How many countries are part of the European Union in 2024?",
    options: ["25", "27", "30", "32"],
    answer: "27",
  },
  {
    question: "What is the official language of Austria?",
    options: ["German", "French", "Hungarian", "English"],
    answer: "German",
  },
  {
    question: "Which European island is known as the 'Emerald Isle'?",
    options: ["Iceland", "Ireland", "Malta", "Corsica"],
    answer: "Ireland",
  },
];

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [user, setUser] = useState(null);

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
  }

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-light p-8">
        {showConfetti && <Confetti />}
        <header className="text-2xl font-bold mb-4">Score: {score}</header>
        <main className="flex flex-col items-center gap-8">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <div className="text-center text-xl font-semibold">
            {currentQuestion.question}
          </div>
          <div className="flex flex-col gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
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
              className="mt-4"
            />
          )}
        </main>
      </div>
    </GoogleOAuthProvider>
  );
}
