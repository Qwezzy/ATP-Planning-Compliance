import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problems } from './components/Problems';
import { Solutions } from './components/Solutions';
import { AIHelp } from './components/AIHelp';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { Footer } from './components/Footer';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  const quizSectionRef = useRef<HTMLDivElement>(null);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeout(() => {
      quizSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setQuizCompleted(true);
    // Scroll up slightly to show results header
    setTimeout(() => {
      quizSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Landing Page Content */}
      <Hero onStartQuiz={startQuiz} />
      <Problems />
      <Solutions />
      <AIHelp />

      {/* Quiz / Results Section */}
      <section ref={quizSectionRef} className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {!quizCompleted ? (
              <>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">How Ready Are YOU for 2026?</h2>
                <p className="text-slate-600">Answer 5 quick questions to discover your ATP Compliance Readiness Score.</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  ⏱️ Takes 2 minutes
                </div>
              </>
            ) : (
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Assessment Complete</h2>
            )}
          </div>

          <div className="transition-all duration-500 ease-in-out">
            {!quizStarted ? (
               <div className="text-center">
                 <button 
                  onClick={startQuiz}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                >
                  Start The Quiz Now
                </button>
               </div>
            ) : !quizCompleted ? (
              <Quiz onComplete={handleQuizComplete} />
            ) : (
              <Results score={score} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;