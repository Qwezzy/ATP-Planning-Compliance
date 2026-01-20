import React from 'react';
import { Check } from 'lucide-react';

const solutions = [
  {
    id: 1,
    title: "Digital Planner Pack",
    desc: "Pre-filled Google Sheets with all 35 weeks, cycles, and resources.",
    features: ["Auto-populating daily templates", "Ready Week 1 (14 Jan)"]
  },
  {
    id: 2,
    title: "Compliance Cheat Sheet",
    desc: "One-page guide: exactly what to teach vs. what was trimmed.",
    features: ["Do Teach / Do NOT Teach lists", "New content alerts"]
  },
  {
    id: 3,
    title: "Assessment Toolkit",
    desc: "Annual Plan + Evidence of Planning sheets + HOD checklist.",
    features: ["School letterhead templates", "Submit-ready in 2 hours"]
  },
  {
    id: 4,
    title: "Informal Assessment Pack",
    desc: "150 ready-to-print worksheets + past paper mapping.",
    features: ["4 activities per week", "Auto-diagnostic dashboard"]
  }
];

export const Solutions: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-600/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Here's What's Coming</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">We are building the ultimate compliance ecosystem for Gauteng teachers.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-sky-500/50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-sky-500 text-slate-900 font-bold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.id}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {item.desc}
              </p>
              <ul className="space-y-3">
                {item.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-300">
                    <Check className="w-4 h-4 text-sky-400 mr-2 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
