import React, { useState } from 'react';
import { submitToGoogleSheet } from '../services/api';
import { QuizResult, WaitlistFormData } from '../types';
import { Loader2, CheckCircle2, Twitter, Facebook, Linkedin, MessageCircle } from 'lucide-react';

interface ResultsProps {
  score: number;
}

const getResultTier = (score: number): QuizResult => {
  const maxScore = 16;
  const percentage = Math.round((score / maxScore) * 100);

  if (percentage >= 75) {
    return {
      score,
      percentage,
      tier: "Fully Ready",
      badgeColor: 'green',
      message: "You're a compliance champion! You're ahead of the game.",
      recommendation: "You could even mentor other teachers. Join our community to share your systems.",
      nextSteps: [
        "Join our teacher community for exclusive peer learning",
        "Get early access to Phase 4 Worksheets",
        "Become a mentor in the community"
      ]
    };
  } else if (percentage >= 50) {
    return {
      score,
      percentage,
      tier: "On Track",
      badgeColor: 'green',
      message: "You've got the basics down. A few refinements will make you inspection-ready.",
      recommendation: "Our done-for-you packs will lock in your systems and save you time.",
      nextSteps: [
        "Get Phase 1 Digital Planner (Week 1 Jan)",
        "Grab Phase 2 Compliance Cheat Sheet FREE",
        "Join the waitlist for Assessment Toolkit"
      ]
    };
  } else if (percentage >= 25) {
    return {
      score,
      percentage,
      tier: "Getting There",
      badgeColor: 'orange',
      message: "You've got the basics but there are gaps that could trip you up.",
      recommendation: "A few fixes now will save you major stress later.",
      nextSteps: [
        "URGENT: Get Phase 2 Compliance Cheat Sheet",
        "Get Phase 1 Digital Planner by Jan 22",
        "Book a 15-min clarity call"
      ]
    };
  } else {
    return {
      score,
      percentage,
      tier: "At Risk",
      badgeColor: 'red',
      message: "Your compliance readiness needs urgent attention. Missing key elements.",
      recommendation: "We can get you compliant in days, not weeks.",
      nextSteps: [
        "Priority: Get all 4 phases bundled",
        "Book a 30-min implementation call",
        "Fast-track launch date: Be compliant by Jan 24"
      ]
    };
  }
};

export const Results: React.FC<ResultsProps> = ({ score }) => {
  const result = getResultTier(score);
  const [formData, setFormData] = useState<WaitlistFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: '',
    grade: '',
    school: '',
    newsletter: true,
    community: false
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Social Sharing Logic
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `I scored ${result.percentage}% (${result.tier}) on the TeachStack Compliance Readiness Quiz! How ready are you for 2026?`;

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-sky-400'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-500'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: 'hover:text-green-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-600'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const dataToSubmit = {
      ...formData,
      complianceScore: result.score,
      complianceTier: result.tier,
      timestamp: new Date().toISOString()
    };

    const success = await submitToGoogleSheet(dataToSubmit);
    if (success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const badgeStyles = {
    red: "from-red-500 to-rose-600 shadow-red-200",
    orange: "from-orange-500 to-amber-600 shadow-orange-200",
    green: "from-emerald-500 to-green-600 shadow-emerald-200"
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-10 text-center shadow-xl border border-green-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-4">You're on the list!</h3>
        <p className="text-lg text-slate-600 mb-6">
          We've sent a confirmation to <strong>{formData.email}</strong>. Check your WhatsApp in a few minutes for your personalized roadmap.
        </p>
        <div className="bg-slate-50 rounded-xl p-6 text-sm text-slate-500">
          Didn't receive it? Check your spam folder or contact support@teachstack.co.za
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Score Header */}
        <div className="bg-slate-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] pointer-events-none"></div>
           <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${badgeStyles[result.badgeColor]} flex items-center justify-center mb-6 shadow-xl border-4 border-white/20 relative z-10`}>
             <span className="text-4xl font-bold">{result.percentage}%</span>
           </div>
           <h2 className="text-3xl font-bold mb-2">Readiness Tier: <span className="text-sky-400">{result.tier}</span></h2>
           <p className="text-slate-300 max-w-xl mx-auto text-lg mb-8">{result.message}</p>

           {/* Social Sharing */}
           <div className="relative z-10 pt-8 border-t border-white/10 max-w-sm mx-auto">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Share your Score</p>
              <div className="flex justify-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-slate-400 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1 ${social.color}`}
                    title={`Share on ${social.name}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
           </div>
        </div>

        <div className="p-8 md:p-12">
          {/* Recommendations */}
          <div className="mb-12 bg-sky-50 rounded-xl p-6 border border-sky-100">
            <h3 className="text-lg font-bold text-sky-900 mb-3">Recommended Next Steps:</h3>
            <ul className="space-y-3">
              {result.nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-200 text-sky-700 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">{idx + 1}</span>
                  <span className="text-sky-800 font-medium">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900">Join the Priority Waitlist</h3>
            <p className="text-slate-600 mt-2">Get access to the tools that fix your gaps before inspection.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">First Name *</label>
                <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Last Name *</label>
                <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" placeholder="Doe" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">WhatsApp Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" placeholder="072 123 4567" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" placeholder="teacher@school.co.za" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Subject *</label>
                <select required name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white">
                  <option value="">Select subject...</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Business Studies">Business Studies</option>
                  <option value="Geography">Geography</option>
                  <option value="Life Sciences">Life Sciences</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Grade Level *</label>
                <select required name="grade" value={formData.grade} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white">
                  <option value="">Select grade...</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                  <option value="Multiple">Multiple Grades</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">School Name (Optional)</label>
              <input name="school" value={formData.school} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" placeholder="Your School Name" />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleCheckboxChange} className="mt-1 w-5 h-5 rounded text-sky-600 focus:ring-sky-500 border-gray-300" />
                <span className="text-sm text-slate-600">Yes! Send me updates about the tools launching (email + WhatsApp)</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="community" checked={formData.community} onChange={handleCheckboxChange} className="mt-1 w-5 h-5 rounded text-sky-600 focus:ring-sky-500 border-gray-300" />
                <span className="text-sm text-slate-600">I'm interested in joining the teacher community when it launches</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                'Get My Results & Tools'
              )}
            </button>
            
            {status === 'error' && (
              <div className="text-center text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                Something went wrong. Please check your internet connection and try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
