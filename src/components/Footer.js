import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white py-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Trivia of Europe</h3>
            <p className="text-primary-100 mb-4">
              Test your knowledge about European countries, geography, politics, economy, 
              history, sports, art, and more with our challenging trivia questions.
            </p>
          </div>
          <div className="md:text-right">
            <h3 className="text-xl font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-primary-200 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="text-primary-200 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-700 mt-8 pt-6 text-center text-primary-300">
          <p>&copy; {new Date().getFullYear()} Trivia of Europe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 