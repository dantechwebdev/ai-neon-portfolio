import { useState } from "react";

export default function AIFace({ aiState, setAiState, message, onSend }) {
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  }

  // 💤 NOTHING ON SCREEN
  if (aiState === "idle") return null;

  return (
    <>
      {/* 🤖 FLOATING ORB (primary entry point) */}
      <div
        className="ai-orb"
        onClick={() => setAiState("active")}
      >
        🤖
      </div>

      {/* 👀 SUGGEST MODE (subtle nudge only) */}
      {aiState === "suggest" && (
        <div className="ai-suggest">
          <p>{message}</p>
          <small onClick={() => setAiState("active")}>
            Tap to interact
          </small>
        </div>
      )}

      {/* 💬 ACTIVE CHAT (minimal, focused UX) */}
      {aiState === "active" && (
        <div className="ai-chat">

          {/* AI message */}
          <div className="ai-bubble">
            {message || "Ask me what you're trying to build"}
          </div>

          {/* input row */}
          <div className="ai-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your request..."
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
            />

            <button onClick={send}>
              Send
            </button>
          </div>

          {/* helper hint (important UX clarity) */}
          <div className="ai-hint">
            Try: projects, about, contact
          </div>

          {/* close button (UX control) */}
          <button
            className="ai-close"
            onClick={() => setAiState("suggest")}
          >
            ✕
          </button>

        </div>
      )}
    </>
  );
}
