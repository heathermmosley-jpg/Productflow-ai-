"use client";
import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateDescription = async () => {
    if (!input) return;
    setLoading(true);
    setResult('');
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Write a product description for: ${input}` }] }]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        setResult("API responded, but no description was generated. Check your Google AI Studio quota.");
      }
    } catch (error) {
      setResult("Connection error. Please check your Vercel Environment Variables.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🚀 ProductFlow AI</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Generate descriptions in seconds.</p>
      
      <div style={{ marginTop: '30px' }}>
        <input 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px', boxSizing: 'border-box' }}
          placeholder="What are you selling? (e.g. Leather Bag)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={generateDescription}
          disabled={loading}
          style={{ width: '100%', padding: '15px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'Generating...' : 'Generate Description'}
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #0070f3' }}>
        <strong>Result:</strong>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#444' }}>{result || 'Waiting for input...'}</p>
      </div>
    </div>
  );
}

