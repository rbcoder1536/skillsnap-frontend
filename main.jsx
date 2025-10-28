import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [snaps, setSnaps] = useState([]);

  const fetchSnaps = async () => {
    const res = await axios.get("https://your-backend-url.onrender.com/api/snaps");
    setSnaps(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://your-backend-url.onrender.com/api/upload", { title, content });
    setTitle("");
    setContent("");
    fetchSnaps();
  };

  useEffect(() => {
    fetchSnaps();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📘 SkillSnap</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Topic title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Paste training content..." value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit">Generate Summary + Quiz</button>
      </form>
      <hr />
      <h2>Generated Snaps</h2>
      {snaps.map((snap) => (
        <div key={snap.id} style={{ background: "#f3f3f3", padding: 10, marginTop: 10 }}>
          <h3>{snap.title}</h3>
          <p>{snap.summary}</p>
          <ul>
            {snap.questions.map((q, i) => (
              <li key={i}>{q.q}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
