"use client";
import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateDescription = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Write a high-converting, SEO-friendly product description for: ${input}` }] }]
        })
      });
      const data = await response.json();
      setResult(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setResult("Oops! Something went wrong. Check your API key.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif', border: '1px solid #eee', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🚀 ProductFlow AI</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Generate professional descriptions in seconds.</p>
      
      <div style={{ marginTop: '30px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>What are you selling?</label>
        <input 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px', boxSizing: 'border-box' }}
          placeholder="e.g. Ergonomic Office Chair"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={generateDescription}
          disabled={loading || !input}
          style={{ width: '100%', padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'AI is thinking...' : 'Generate Description'}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #0070f3', whiteSpace: 'pre-wrap' }}>
          <strong>Result:</strong><br/>
          {result}
        </div>
      )}
    </div>
  );
                  }
