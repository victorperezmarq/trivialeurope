import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'geography', name: 'Geography', icon: '🗺️', description: 'Questions about European countries, capitals, mountains, rivers, and more.' },
  { id: 'history', name: 'History', icon: '📜', description: 'Test your knowledge about European history, important events, and historical figures.' },
  { id: 'politics', name: 'Politics', icon: '🏛️', description: 'Questions about European Union, political systems, and governments.' },
  { id: 'economy', name: 'Economy', icon: '💶', description: 'Test your knowledge about European economies, currencies, and trade.' },
  { id: 'flags', name: 'Flags', icon: '🏁', description: 'Can you identify all European country flags?' },
  { id: 'sports', name: 'Sports', icon: '⚽', description: 'Questions about European sports, competitions, athletes, and teams.' },
  { id: 'art', name: 'Art & Culture', icon: '🎨', description: 'Test your knowledge about European art, music, literature, and architecture.' },
  { id: 'random', name: 'Mixed Categories', icon: '🎲', description: 'Random questions from all categories for a varied challenge.' },
];

const Home = () => {
  return (
    <div className="py-10">
      <div className="container-custom">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
            Test Your Knowledge of Europe
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Challenge yourself with our European trivia questions across multiple categories. 
            Learn fascinating facts while having fun!
          </p>
          <div className="mt-8">
            <Link to="/quiz/random" className="btn btn-primary text-lg px-8 py-3">
              Start Quick Quiz
            </Link>
          </div>
        </div>
        
        {/* Categories section */}
        <div id="categories">
          <h2 className="text-3xl font-bold text-center text-primary-700 mb-10">
            Choose a Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/quiz/${category.id}`}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-primary-700 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* About section */}
        <div id="about" className="mt-20 pt-10 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
            About Trivia of Europe
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700 mb-4">
              Trivia of Europe is a fun and educational quiz game that tests your knowledge about European countries, 
              cultures, history, and more. Whether you're a student, a traveler, or just curious about Europe, 
              this game offers interesting questions to challenge and educate you.
            </p>
            <p className="text-gray-700 mb-4">
              Choose from our specialized categories or try the mixed quiz for a variety of questions. 
              Each quiz contains 10 questions with multiple-choice answers. Track your score and learn 
              interesting facts about Europe along the way!
            </p>
            <p className="text-gray-700">
              The questions database is continuously updated with new content to keep the game fresh and challenging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 