import React, { useEffect, useState, useRef } from "react";
import "./Home.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    return () => observerRef.current?.disconnect();
  }, []);

  const observeElement = (element) => {
    if (element && observerRef.current) observerRef.current.observe(element);
  };

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  if (!data) return <div className="apple-loader"><span></span></div>;

  return (
    <div className="apple-root">
      <div className="dot-cursor" ref={cursorRef}></div>

      {/* Hero: Pushed down with sleek reveal */}
      <section className="apple-hero" id="hero">
        <div className="hero-content">
          <h1 className="hero-title fade-up-delay-1">
            Build for <span className="gradient-text">Purpose.</span><br />
            Design for <span className="gradient-text">Everyone.</span>
          </h1>
          
          {/* Sleek reveal animation for intro text */}
          <div className="hero-intro-wrapper fade-up-delay-2">
            <p className="hero-intro sleek-reveal">
              {data.intro}
            </p>
          </div>

          <div className="hero-cta fade-up-delay-3">
            <button className="apple-btn" onClick={() => document.getElementById('about').scrollIntoView({behavior: 'smooth'})}>
              Learn more <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="hero-visual fade-in-scale">
          <div className="apple-blob">
            <img src={data.photo} alt={data.name} />
          </div>
        </div>
      </section>

      <div className="apple-stats-bar fade-up-delay-3">
  <div className="stats-container" onClick={() => window.location.href='/work'}>
    <div className="stat-item">
      <span className="stat-number">15<span className="plus">+</span></span>
      <span className="stat-label">Innovative Projects Built <span>→</span></span>
    </div>
    <div className="stat-badge">
      Available for new opportunities
    </div>
  </div>
</div>
      {/* About: Highlighted Keywords */}
      <section className="apple-section" id="about" ref={observeElement}>
        <div className={`apple-grid ${isVisible.about ? 'active' : ''}`}>
          <div className="apple-img-wrap">
            <img src={data.me} alt="Shyam Portrait" className="apple-portrait" />
          </div>
          <div className="apple-text-wrap">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">
              A <span className="highlight-blue">programmer</span> with <br/> 
              a <span className="highlight-blue">teacher's</span> heart.
            </h2>
            <p className="section-p">
              I'm <strong>{data.name}</strong>. From building AI for farmers to 
              teaching at StudentScholars, I believe technology should be 
              accessible, powerful, and clean.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="apple-section dark-bg" id="services" ref={observeElement}>
        <div className="container">
          <span className="section-tag center">Capabilities</span>
          <h2 className="section-title center white">Engineered for quality.</h2>
          <div className="apple-bento">
            {data.services.map((s, i) => (
              <div key={i} className={`bento-tile tile-${i} ${isVisible.services ? 'active' : ''}`}>
                <div className="tile-content">
                  <i className={s.icon}></i>
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="apple-section" id="skills" ref={observeElement}>
        <div className="container center">
          <span className="section-tag center">Stack</span>
          <h2 className="section-title center">Tools I use.</h2>
          <div className={`apple-skills ${isVisible.skills ? 'active' : ''}`}>
            {data.skills.map((skill, i) => (
              <div key={i} className="apple-pill">
                <i className={skill.icon}></i> {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="apple-section" id="achievements" ref={observeElement}>
        <div className="container">
          <span className="section-tag center">Impact</span>
          <div className="apple-gallery">
            <div className={`gallery-item ${isVisible.achievements ? 'active' : ''}`}>
               <img src="photography/award.jpg" alt="Mayor Award" />
               <div className="gallery-caption">
                 <h3>Canadian Choice Award</h3>
                 <p>Excellence in Tutoring, Markham 2025.</p>
               </div>
            </div>
            <div className={`gallery-item ${isVisible.achievements ? 'active' : ''}`} style={{transitionDelay: '0.2s'}}>
               <img src="ac1.png" alt="Project Stats" />
               <div className="gallery-caption">
                 <h3>Backend Precision</h3>
                 <p>60,000+ impressions in one week.</p>
               </div>
            </div>
          </div>
        </div>
      </section>


      {/* NEW: Final CTA Section */}
<section className="apple-section footer-cta" id="contact" ref={observeElement}>
  <div className={`container center ${isVisible.contact ? 'active' : ''}`}>
    <h2 className="section-title">Let’s build the <br/> <span className="gradient-text">next big thing</span> together.</h2>
    <p className="section-p">
      Currently open for new opportunities in Software Development and Data Analysis. 
      Based in Ontario, Canada.
    </p>
    <div className="cta-group">
      <button className="apple-btn primary" onClick={() => window.location.href='mailto:your-email@example.com'}>
        Get in touch
      </button>
      <button className="apple-btn secondary" onClick={() => window.location.href='/work'}>
        See all 15+ projects
      </button>
    </div>
  </div>
</section>


<footer className="apple-footer">
  <div className="container">
    <div className="footer-bottom">
      <p>© 2026 {data.name}. Built with React & Purpose.</p>
      <div className="footer-links">
        <a href="https://github.com/Shyam-Works" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/shyampatel97" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}