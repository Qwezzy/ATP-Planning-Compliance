import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-sky-600" />
            <span className="text-xl font-bold text-sky-700">TeachStack</span>
          </div>
          <div className="hidden sm:block">
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
              🎯 CAPS Compliance Made Easy
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
