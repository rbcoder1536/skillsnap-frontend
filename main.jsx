import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!content.trim()) {
      alert("Please paste some training content.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://skillsnap-backend.onrender.com/api/generate",
        { content }
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate summary. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        📘 SkillSnap
      </h1>

      {/* Input section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Topic title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <textarea
          placeholder="Paste training content..."
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            resize: "vertical",
          }}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Generating..." : "Generate Summary + Quiz"}
        </button>
      </div>

      {/* Output Section */}
      <h2>Generated Snaps</h2>
      {!result && <p style={{ color: "#777" }}>Your summary and questions will appear here.</p>}

      {result && (
        <div style={{ background: "#f9fafb", padding: "15px", borderRadius: "10px", marginTop: "10px" }}>
          <h3>📝 Summary</h3>
          <p>{result.summary}</p>

          <h3>❓ Quiz Questions</h3>
          <ul>
            {result.questions.map((q, i) => (
              <li key={i} style={{ marginBottom: "10px" }}>
                <strong>Q{i + 1}:</strong> {q.q}  
                <br />
                <span style={{ color: "green" }}>
                  <strong>Answer:</strong> {q.a}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
