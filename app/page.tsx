"use client";

import React, { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDescription = async () => {
    if (!input) return;
    setLoading(true);
    setResult("");

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }]
        })
      });

      const data = await response.json();
      const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response. Check API key.";
      setResult(output);
    } catch (error) {
      setResult("Error connecting to AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>ProductFlowAI Beta</h1>
      <textarea 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter your CRPS symptoms or content ideas..."
        style={{ width: '100%', height: '100px', padding: '10px', marginBottom: '10px', color: 'black' }}
      />
      <button 
        onClick={generateDescription} 
        disabled={loading}
        style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? "Generating..." : "Run AI System"}
      </button>
      {result && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9', color: 'black' }}>
          <strong>Result:</strong>
          <p style={{ whiteSpace: 'pre-wrap' }}>{result}</p>
        </div>
      )}
    </div>
  );
}
