"use client";


import { useState, useEffect } from "react";
import { api } from "../utils/api";

export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);

    await fetch(`${api}/api/v1/pre-interview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username.trim() }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Analysis Result:", data);
      })
      .catch((err) => {
        console.error("Error analyzing repository:", err);
      });

      setLoading(false);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Background patterns */}
      <div className="bg-grid" />
      <div className="bg-orbs">
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
      </div>

      {/* Header */}
      <header className="header flex-center">
        <div className="app-container flex-between" style={{ width: "100%" }}>
          <a href="#" className="logo-container">
            <div className="logo-icon flex-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            </div>
            <span className="logo-text">Interview Agent</span>
          </a>
          <nav>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: "20px", height: "20px" }}
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        className="app-container"
        style={{ flex: 1, paddingBottom: "60px" }}
      >
        (
        <div>
          <section className="hero-section">
            <div className="badge">
              <span className="badge-pulse" />
              AI-Powered Code Intelligence
            </div>
            <h1 className="hero-title">
              <span className="gradient-text">Interview Preparation</span>
              <br />
              From Any Repository
            </h1>
            <p className="hero-subtitle">
              Instantly map code structures, design systems, and custom
              architectural paradigms into an interactive, comprehensive
              technical interview practice board.
            </p>
          </section>

          {/* Input Form */}
          <div className="search-container">
            <form onSubmit={handleSubmit}>
              <div className={`search-wrapper`}>
                <div className="search-icon">
                  <svg
                    style={{ width: "20px", height: "20px" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="GitHub Username"
                  className="search-input"
                  required
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    "Analyzing..."
                  ) : (
                    "Analyze"
                  )}
                  <svg
                    style={{ width: "16px", height: "16px" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Grid Features */}
          <div className="features-grid">
            <div className="glass-card feature-card">
              <div className="feature-icon-wrapper">
                <svg
                  style={{ width: "24px", height: "24px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Tailored Interview Simulation</h3>
              <p className="feature-desc">
                Generates technical and architectural interview questions that
                directly evaluate your understanding of the target repository's
                code patterns.
              </p>
            </div>

            <div className="glass-card feature-card">
              <div className="feature-icon-wrapper">
                <svg
                  style={{ width: "24px", height: "24px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Architectural Inspections</h3>
              <p className="feature-desc">
                Inspects subfolder layout divisions, decoupled modules
                boundaries, static compilation profiles, and framework service
                patterns.
              </p>
            </div>

            <div className="glass-card feature-card">
              <div className="feature-icon-wrapper">
                <svg
                  style={{ width: "24px", height: "24px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Quality & Health Audits</h3>
              <p className="feature-desc">
                Scores general test dependencies, static styles compliance,
                security risks, vulnerability levels, and horizontal scalability
                issues.
              </p>
            </div>
          </div>
        </div>
        )
      </main>

      {/* Footer */}
      <footer className="footer flex-center">
        <div className="app-container flex-between" style={{ width: "100%" }}>
          <div>
            © {new Date().getFullYear()} Interview Agent. AI Code Analysis.
          </div>
          <div className="footer-links">
            <a href="#" className="nav-link">
              Terms
            </a>
            <a href="#" className="nav-link">
              Privacy
            </a>
            <a href="#" className="nav-link">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
