import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css"; // Your custom CSS

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // Success/Error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formURL = "https://api.web3forms.com/submit";
    const accessKey = "b58a1ffe-30f0-4e92-8a8c-28ef6d54cae1"; // Your Web3Forms Access Key

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
      setStatus("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "" , message: "" });
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2>Contact Me</h2>
        <p>
          I am a pretty open book. Contact me if you have any questions, want to chat, educate, create, or have a project for me.
        </p>
        {status && <div className="alert alert-info">{status}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name*</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email*</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>



          <div className="mb-3">
            <label className="form-label">Message*</label>
            <textarea
              name="message"
              rows="4"
              className="form-control"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-submit">Submit</button>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="contact-info">
        <h3>Contact</h3>
        <p>
          <i className="fas fa-envelope"></i> shyampersonal97@gmail.com
        </p>
        <p>
          <i className="fas fa-phone"></i> +1 289-623-9840
        </p>

        {/* Social Media Links */}
        <h3>Follow Me</h3>
        <div className="social-icons">
          <a href="https://www.instagram.com/shyam_ptel_?igsh=cnJuaW1haWtlNXoz" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/shyam-patel-2b47a7297/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/Shyam-Works" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
