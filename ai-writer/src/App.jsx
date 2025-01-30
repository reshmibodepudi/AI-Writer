import React, { useState } from "react";
import PromptInput from "./components/PromptInput";
import Suggestions from "./components/Suggestions";
import Controls from "./components/Controls";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.success) {
        setSuggestions(data.suggestions.join("\n\n")); 
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }
    setLoading(false);
  };

  const handleRegenerate = () => handleGenerate();
  const handleEdit = () => {
    setSuggestions("");
    setPrompt("");
  };

  return (
    <div className="container">
     
      <div className="left">
        <h1>✍️ AI Writing Assistant</h1>
        <PromptInput value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <Controls onGenerate={handleGenerate} onRegenerate={handleRegenerate} onEdit={handleEdit} loading={loading} />
        <p className="motivation">🌟 Keep going! Your words have power! ✨</p>
      </div>

      
      <div className="right">
        <h2>💡 Suggestions</h2>
        <Suggestions suggestions={suggestions} />
      </div>
    </div>
  );
}

export default App;
