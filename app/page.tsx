"use client";  
import './globals.css';
export default function Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDescription = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: `Write a product description for: ${input}` }] 
          }]
        }),
      });

      const data = await response.json();
      setResult(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating content:", error);
      setResult("Failed to generate description. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Product Flow</h1>
      <textarea
        className="w-full p-2 border rounded mb-4 text-black"
        rows={4}
        placeholder="Enter product name or details..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={generateDescription}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate Description"}
      </button>
      
      {result && (
        <div className="mt-8 p-4 bg-gray-100 rounded text-black whitespace-pre-wrap">
          <h2 className="font-bold mb-2">Generated Result:</h2>
          {result}
        </div>
      )}
    </div>
  );
}

