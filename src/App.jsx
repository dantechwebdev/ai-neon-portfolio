import { useEffect, useState } from "react";
import AIFace from "./components/AIFace";

export default function App() {
  const [aiState, setAiState] = useState("idle");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  // 🧠 SCROLL TRACKER (AI EYES)
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);

            // 🧠 AI reacts silently to scroll
            if (aiState !== "active") {
              if (id === "projects") {
                setMessage("These are my projects. I highlighted them for you.");
                setAiState("suggest");
              }

              if (id === "about") {
                setMessage("This is where I explain how I build systems.");
                setAiState("suggest");
              }

              if (id === "contact") {
                setMessage("You can reach me here.");
                setAiState("suggest");
              }
            }
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [aiState]);

  // 💤 AI FIRST WELCOME
  useEffect(() => {
    const t = setTimeout(() => {
      setAiState("suggest");
      setMessage("I can guide you through this portfolio. Click me anytime.");
    }, 4000);

    return () => clearTimeout(t);
  }, []);

  // 🤖 AI COMMAND ENGINE
  function handleAI(text) {
    const msg = text.toLowerCase();
    setAiState("active");

    if (msg.includes("project")) {
      setMessage("Follow the glow — this is my work section.");
      highlight("projects");
    }

    else if (msg.includes("about")) {
      setMessage("This section explains how I think and build.");
      highlight("about");
    }

    else if (msg.includes("contact")) {
      setMessage("This is where you can reach me.");
      highlight("contact");
    }

    else if (msg.includes("scroll")) {
      setMessage("I’ll guide you through the page.");
      autoGuide();
    }

    else {
      setMessage("Try: projects, about, contact, scroll");
    }
  }

  // ✨ SECTION HIGHLIGHT SYSTEM (GUIDE MODE CORE)
  function highlight(id) {
    document.querySelectorAll(".guide-focus").forEach(el =>
      el.classList.remove("guide-focus")
    );

    const el = document.getElementById(id);
    if (el) {
      el.classList.add("guide-focus");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // 🧭 AUTO GUIDE MODE (SEQUENTIAL NAVIGATION)
  function autoGuide() {
    const flow = ["hero", "about", "projects", "contact"];
    let i = 0;

    const interval = setInterval(() => {
      if (i >= flow.length) {
        clearInterval(interval);
        setMessage("That’s the full overview.");
        return;
      }

      highlight(flow[i]);

      setMessage(`Now viewing: ${flow[i]}`);
      i++;
    }, 2500);
  }

  return (
    <div>

      {/* HERO */}
      <section className="section" id="hero">
        <div className="glass hero-card">
          <h1>AI Guided Portfolio</h1>
          <p>Scroll or let AI guide you through everything.</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="glass">
          <h2>About</h2>
          <p>I build AI systems, automation tools, and UX-driven products.</p>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <div className="glass">
          <h2>Projects</h2>
          <p>AI assistants, dashboards, automation systems.</p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="glass">
          <h2>Contact</h2>
          <p>Let’s build something meaningful.</p>
        </div>
      </section>

      {/* 🤖 AI */}
      <AIFace
        aiState={aiState}
        setAiState={setAiState}
        message={message}
        onSend={handleAI}
      />

    </div>
  );
}
