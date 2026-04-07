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
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', color: 'black', backgroundColor: 'white', minHeight: '100vh' }}>
      <h1>ProductFlowAI Beta</h1>
      <p>Transforming CRPS Protocols & Content Systems</p>
      <textarea 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Describe your pain level or content goal..."
        style={{ width: '100%', height: '150px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <button 
        onClick={generateDescription} 
        disabled={loading}
        style={{ padding: '12px 24px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {loading ? "Processing..." : "Generate Transformation"}
      </button>
      {result && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
          <strong>System Output:</strong>
          <p style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>{result}</p>
        </div>
      )}
    </div>
  );
          }
