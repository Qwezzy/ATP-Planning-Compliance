import React, { useState } from 'react';
import { Send, Bot, Sparkles, Loader2, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AIHelp: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: question,
        config: {
          systemInstruction: "You are an expert ATP and CAPS compliance assistant for South African teachers. Provide very brief, actionable advice. Max 50 words.",
        }
      });
      
      setAnswer(response.text || "No response received.");
    } catch (err) {
      setAnswer("Sorry, I'm having trouble connecting to the compliance database right now.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-sky-600 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Compliance AI Assistant</h3>
                <p className="text-sky-100 text-sm">Powered by Gemini 2.5 Flash Lite</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-sky-500/50 rounded-full text-xs text-white font-medium border border-sky-400">
              <Sparkles className="w-3 h-3" />
              <span>Low Latency</span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <p className="text-slate-600 mb-4">
                Have a specific question about the 2026 ATPs or trimmed content? Ask our AI for an instant answer.
              </p>
              
              {answer && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <MessageSquare className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                       <p className="text-slate-800 leading-relaxed">{answer}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleAsk} className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex: What is trimmed in Grade 10 Accounting?"
                className="w-full pl-6 pr-32 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all placeholder:text-slate-400"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="absolute right-2 top-2 bottom-2 bg-sky-600 hover:bg-sky-700 text-white px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Ask</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};