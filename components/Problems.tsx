import React from 'react';
import { Clock, AlertTriangle, FileQuestion, Layers } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: "Planning Takes Forever",
    description: "Manually populating 35 weeks of work schedules and daily plans. It eats up your weekends."
  },
  {
    icon: AlertTriangle,
    title: "Content Confusion",
    description: "Unsure what was trimmed vs. what must be taught in 2026? One audit flag ruins credibility."
  },
  {
    icon: FileQuestion,
    title: "Evidence Gaps",
    description: "Scrambling to gather evidence of planning and assessment plans during district inspections."
  },
  {
    icon: Layers,
    title: "Too Many Assessments",
    description: "Creating 4 weekly informal assessments + formal tasks + PAT without proper templates."
  }
];

export const Problems: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What's Really Slowing You Down?</h2>
          <p className="text-lg text-slate-600">The administrative burden is stealing time from where it matters most: your students.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-xl border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-4">
                <item.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
