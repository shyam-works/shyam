import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

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

    const response = await fetch(formURL, {
      method: "POST",
      body: data,
    });

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
      <div className="contact-editorial-container">
        
        {/* Left Side: Editorial Info */}
        <div className="contact-visual-side">
          <span className="contact-tag">Get in Touch</span>
          <h1 className="contact-display-title">Let’s build <br/> something <span className="blue-text">great.</span></h1>
          <p className="contact-intro">
            Whether you have a question about a project, a tutoring inquiry, or just want to say hi, my inbox is always open.
          </p>

          <div className="contact-methods">
            <div className="method-item">
              <i className="fas fa-envelope"></i>
              <div>
                <span>Email me at</span>
                <p>shyampersonal97@gmail.com</p>
              </div>
            </div>
            <div className="method-item">
              <i className="fas fa-phone"></i>
              <div>
                <span>Call me</span>
                <p>+1 289-623-9840</p>
              </div>
            </div>
          </div>

          <div className="social-presence">
            <span>Follow the journey</span>
            <div className="social-pills">
              <a href="https://www.linkedin.com/in/shyam-patel-2b47a7297/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
              <a href="https://github.com/Shyam-Works" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
              <a href="https://www.instagram.com/shyam_ptel_/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* Right Side: The Clean Form */}
        <div className="contact-form-side">
          {status === "success" && (
            <div className="apple-status success">
              <i className="fas fa-check-circle"></i>
              <p>Message sent successfully. We'll be in touch soon.</p>
            </div>
          )}
          {status === "error" && (
            <div className="apple-status error">
              <i className="fas fa-exclamation-circle"></i>
              <p>Something went wrong. Please try again.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="apple-form">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Your Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="apple-submit-btn">
              Send Message <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;