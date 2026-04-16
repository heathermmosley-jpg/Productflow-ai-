'use client';

import React, { useState } from 'react';
import { 
  Youtube, Instagram, Linkedin, Music2, 
  Pin, Copy, Zap, Layers, CheckCircle2, Sparkles 
} from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    if (!input) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">ProductFlow<span className="text-indigo-500">AI</span></span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            One Input. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Omnipresent.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Paste a link or transcript to instantly multiply your content across 5 platforms.</p>
        </header>

        {/* Input Box */}
        <section className="bg-slate-900/40 border border-slate-800 p-2 rounded-3xl mb-12 shadow-2xl">
          <textarea
            className="w-full bg-transparent border-none focus:ring-0 text-lg p-6 min-h-[160px] text-white placeholder:text-slate-600 outline-none"
            placeholder="Paste your YouTube URL or content idea..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex justify-end p-4">
            <button 
              onClick={handleGenerate}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2"
            >
              {isGenerating ? "Processing..." : "Multiply My Content"} <Sparkles size={18} />
            </button>
          </div>
        </section>

        {showResults && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Platform Cards */}
             <PlatformCard title="TikTok" icon={Music2} color="#ff0050" hooks={["Hook 1", "Hook 2"]} />
             <PlatformCard title="Instagram" icon={Instagram} color="#e1306c" hooks={["Reel Idea 1", "Reel Idea 2"]} />
             <PlatformCard title="YouTube Shorts" icon={Youtube} color="#ff0000" hooks={["Short Title 1", "Short Title 2"]} />
             <PlatformCard title="LinkedIn" icon={Linkedin} color="#0077b5" hooks={["Authority Post 1", "Story Post"]} />
             <PlatformCard title="Pinterest" icon={Pin} color="#bd081c" hooks={["Pin Title 1", "SEO Desc"]} />
          </div>
        )}
      </main>
    </div>
  );
}

function PlatformCard({ title, icon: Icon, color, hooks }: any) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <Icon size={24} color={color} />
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        {hooks.map((h: string, i: number) => (
          <div key={i} className="text-sm text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">{h}</div>
        ))}
      </div>
    </div>
  );
      }
