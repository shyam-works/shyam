import React, { useState, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");

  // Live clock for the status bar (matches terminal aesthetic)
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formURL = "https://api.web3forms.com/submit";
    const accessKey = "b58a1ffe-30f0-4e92-8a8c-28ef6d54cae1";

    const data = new FormData();
    data.append("access_key", accessKey);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);

    const response = await fetch(formURL, { method: "POST", body: data });
    const result = await response.json();

    if (result.success) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="contact-root">

      {/* ── LEFT: White editorial side ── */}
      <div className="contact-visual-side">
        <span className="contact-tag">04 — Let's Connect</span>
        <h1 className="contact-display-title">
          Let's build <br /> something <span className="blue-text">great.</span>
        </h1>
        <p className="contact-intro">
          Whether you have a project idea, a tutoring inquiry, or just want to say hi —
          my inbox is always open.
        </p>

        <div className="contact-methods">
          <div className="method-item">
            <div className="method-icon-wrap">
              <i className="fas fa-envelope" />
            </div>
            <div className="method-text">
              <span>Email</span>
              <p>shyampersonal97@gmail.com</p>
            </div>
          </div>
          <div className="method-item">
            <div className="method-icon-wrap">
              <i className="fas fa-phone" />
            </div>
            <div className="method-text">
              <span>Phone</span>
              <p>+1 289-623-9840</p>
            </div>
          </div>
        </div>

        <div className="social-presence">
          <span>Follow the journey</span>
          <div className="social-pills">
            <a href="https://www.linkedin.com/in/shyam-patel-2b47a7297/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://github.com/Shyam-Works" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.instagram.com/shyam_ptel_/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Terminal dark form side ── */}
      <div className="contact-form-side">
        <div className="contact-glow-bottom" />

        <div className="contact-terminal-window">

          {/* Titlebar */}
          <div className="contact-titlebar">
            <span className="ct-dot red" />
            <span className="ct-dot yellow" />
            <span className="ct-dot green" />
            <span className="ct-title-text">shyam-patel — contact.send()</span>
          </div>

          <div className="contact-form-body">

            {/* Status messages */}
            {status === "success" && (
              <div className="contact-status success">
                <i className="fas fa-check-circle" />
                <span>message sent — I'll be in touch soon.</span>
              </div>
            )}
            {status === "error" && (
              <div className="contact-status error">
                <i className="fas fa-exclamation-circle" />
                <span>transmission failed — please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="ct-input-group">
                <div className="ct-input-row">
                  <span className="ct-prompt">$</span>
                  <span className="ct-label">name:</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="ct-input-group">
                <div className="ct-input-row">
                  <span className="ct-prompt">$</span>
                  <span className="ct-label">email:</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="ct-input-group">
                <div className="ct-input-row textarea-row">
                  <span className="ct-prompt">$</span>
                  <span className="ct-label">msg:</span>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="How can I help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="ct-submit-btn">
                <span>send_message</span>
                <span className="ct-send-arrow">↗</span>
              </button>
            </form>
          </div>

          {/* Status bar */}
          <div className="contact-statusbar">
            <span className="ct-status-dot" />
            <span className="ct-status-text">ready to receive</span>
            <span className="ct-status-time">{time}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;