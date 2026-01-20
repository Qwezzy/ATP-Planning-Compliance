import React from 'react';
import { ArrowRight, ClipboardCheck } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Stop Wasting Hours on <span className="text-sky-600">ATP Planning & Compliance</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Join 200+ Gauteng teachers who are reclaiming 10+ hours/week with done-for-you compliance tools built for the 2026 CAPS work schedule.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStartQuiz}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-sky-600 border border-transparent rounded-xl shadow-lg hover:bg-sky-700 hover:shadow-sky-600/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
              >
                Take the 2-Minute Readiness Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Waitlist Active</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Takes 2 mins</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Free Score</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-200 to-blue-50 rounded-2xl transform rotate-3 scale-95 opacity-50 blur-xl"></div>
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl p-8 lg:p-12 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center mb-6">
                <ClipboardCheck className="w-12 h-12 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pre-filled Work Schedules</h3>
              <p className="text-slate-500">
                Ready to go for 2026. Automatically customized to your school calendar.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
