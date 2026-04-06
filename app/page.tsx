"use client";

import './globals.css';
import React, { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDescription = async () => {
    if (!input) return;
    setLoading(true);
    try {
      // Note: Make sure to add NEXT_PUBLIC_GEMINI_API_KEY to your Vercel Environment Variables
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }]
        }),
      });
      
      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        setResult("API returned an unexpected format. Check your API key and quota.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Failed to generate content. Make sure your API key is set in Vercel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="border-b pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight">AI Business Strategist</h1>
          <p className="text-gray-500">Transform your ideas into a functional product flow.</p>
        </header>

        <section className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            What are we building today?
          </label>
          <textarea 
            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your business idea or product goal..."
          />
          <button 
            onClick={generateDescription}
            disabled={loading || !input}
            className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {loading ? "Analyzing Strategy..." : "Generate Product Flow"}
          </button>
        </section>

        {result && (
          <section className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl animate-in fade-in duration-500">
            <h2 className="text-lg font-bold mb-3 flex items-center">
              <span className="mr-2">🚀</span> Your AI Strategy
            </h2>
            <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap">
              {result}
            </div>
          </section>
        )}
      </div>
    </main>
  );
          }
