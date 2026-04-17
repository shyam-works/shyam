import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Home.css";

/* ─────────────────────────────────────────────────────────────
   CERTIFICATIONS DATA
   (hard-coded here so data.json doesn't need updating)
───────────────────────────────────────────────────────────── */
const CERTS = [
  {
    name: "MongoDB Advanced Schema Design Patterns",
    issuer: "MongoDB",
    issuerKey: "mongodb",
    date: "Sep 2025",
    skills: ["MongoDB", "Schema Design", "Data Modeling"],
    link: "https://www.mongodb.com/",
  },
  {
    name: "CRUD Operations in MongoDB",
    issuer: "MongoDB",
    issuerKey: "mongodb",
    date: "Sep 2025",
    skills: ["MongoDB", "CRUD", "Data Governance"],
    link: "https://www.mongodb.com/",
  },
  {
    name: "Python for Data Science & Machine Learning",
    issuer: "LinkedIn",
    issuerKey: "linkedin",
    date: "Sep 2025",
    skills: ["Python", "Machine Learning", "Data Science"],
    link: "https://www.linkedin.com/learning/",
  },
  {
    name: "Testing with Jest & React Testing Library",
    issuer: "LinkedIn",
    issuerKey: "linkedin",
    date: "Sep 2025",
    skills: ["Jest", "RTL", "TDD", "QA Testing"],
    link: "https://www.linkedin.com/learning/",
  },
  {
    name: "Data Analytics Bootcamp",
    issuer: "Analyst Builder",
    issuerKey: "analyst",
    date: "Jan 2025",
    skills: ["SQL", "Power BI", "Tableau", "Python", "AWS", "Azure"],
    link: "https://www.analystbuilder.com/",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issuerKey: "microsoft",
    date: "May 2025",
    skills: ["Azure", "Cloud Security", "Data Governance"],
    link: "https://learn.microsoft.com/",
  },
  {
    name: "Complete Guide to Power BI for Data Analysts",
    issuer: "LinkedIn",
    issuerKey: "linkedin",
    date: "Apr 2025",
    skills: ["Power BI", "DAX", "Data Modeling", "Visualization"],
    link: "https://www.linkedin.com/learning/",
  },
];

/* ─────────────────────────────────────────────────────────────
   CERTIFICATIONS SECTION COMPONENT
───────────────────────────────────────────────────────────── */
const CertificationsSection = () => {
  const trackRef    = useRef(null);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollLeft  = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hinted,    setHinted]    = useState(false);

  const CARD_W = 278; // 260px + 18px gap

  const onScroll = useCallback(() => {
    if (!trackRef.current) return;
    const idx = Math.round(trackRef.current.scrollLeft / CARD_W);
    setActiveIdx(Math.max(0, Math.min(idx, CERTS.length - 1)));
    if (trackRef.current.scrollLeft > 20) setHinted(true);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current     = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.classList.add("dragging");
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.3;
  };
  const stopDrag = () => {
    isDragging.current = false;
    trackRef.current?.classList.remove("dragging");
  };

  const scrollTo = (idx) => {
    trackRef.current?.scrollTo({ left: idx * CARD_W, behavior: "smooth" });
  };

  return (
    <section className="certs-section" id="certifications">
      <div className="certs-header">
        <span className="section-tag center">Credentials</span>
        <h2 className="section-title center">Certified &amp; Verified.</h2>
      </div>

      <div className="certs-track-outer">
        <div
          className="certs-track"
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {CERTS.map((cert, i) => (
            <div
              key={i}
              className="cert-card"
              onClick={() => cert.link && window.open(cert.link, "_blank")}
            >
              {/* Verified tick */}
              <span className="cert-verified" aria-hidden>✓</span>

              {/* Top row: issuer badge + date */}
              <div className="cert-issuer-row">
                <span className={`cert-issuer-badge ${cert.issuerKey}`}>
                  {cert.issuer}
                </span>
                <span className="cert-date">{cert.date}</span>
              </div>

              {/* Name */}
              <p className="cert-name">{cert.name}</p>

              {/* Skills */}
              <div className="cert-skills">
                {cert.skills.map((s) => (
                  <span key={s} className="cert-skill-tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="certs-progress">
        {CERTS.map((_, i) => (
          <div
            key={i}
            className={`certs-progress-dot ${activeIdx === i ? "active" : ""}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>

      <p className={`certs-hint ${hinted ? "hidden" : ""}`}>
        ← drag to explore →
      </p>
    </section>
  );
};


/* ─────────────────────────────────────────────────────────────
   HOME — FULL COMPONENT (certifications slotted after skills)
───────────────────────────────────────────────────────────── */
export default function Home() {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const cursorRef  = useRef(null);
  const rafRef     = useRef(null);
  const posRef     = useRef({ x: -100, y: -100 });
  const targetRef  = useRef({ x: -100, y: -100 });
  const observerRef = useRef(null);

  /* ─── Data ─── */
  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  /* ─── Intersection observer ─── */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setIsVisible((prev) => ({ ...prev, [e.target.id]: true }));
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    return () => observerRef.current?.disconnect();
  }, []);

  const observe = useCallback((el) => {
    if (el && observerRef.current) observerRef.current.observe(el);
  }, []);

  /* ─── Smooth cursor ─── */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.18);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.18);
      cursor.style.transform = `translate3d(${posRef.current.x}px,${posRef.current.y}px,0)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onMove  = (e) => { targetRef.current = { x: e.clientX - cursor.offsetWidth / 2, y: e.clientY - cursor.offsetHeight / 2 }; };
    const onOver  = (e) => {
      const interactive = e.target.closest("button") || e.target.closest("a") ||
        e.target.closest(".apple-pill") || e.target.closest(".gallery-item") ||
        e.target.closest(".bento-tile") || e.target.closest(".stats-container") ||
        e.target.closest(".cert-card");
      cursor.classList.toggle("hovering", !!interactive);
    };
    const onDown  = () => cursor.classList.add("clicking");
    const onUp    = () => cursor.classList.remove("clicking");

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseover",  onOver,  { passive: true });
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
    };
  }, []);

  /* ─── Button ripple ─── */
  const handleBtnMouseDown = useCallback((e) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--rx", `${((e.clientX - rect.left) / rect.width)  * 100}%`);
    btn.style.setProperty("--ry", `${((e.clientY - rect.top)  / rect.height) * 100}%`);
  }, []);

  if (!data) return <div className="apple-loader"><span /></div>;

  return (
    <div className="apple-root">
      <div className="dot-cursor" ref={cursorRef} />

      {/* ── HERO ── */}
      <section className="apple-hero" id="hero">
        <div className="hero-content">
          <h1 className="hero-title fade-up-delay-1">
            Build for <span className="gradient-text">Purpose.</span>
            <br />
            Design for <span className="gradient-text">Everyone.</span>
          </h1>
          <div className="hero-intro-wrapper fade-up-delay-2">
            <p className="hero-intro sleek-reveal">{data.intro}</p>
          </div>
          <div className="hero-cta fade-up-delay-3">
            <button className="apple-btn" onMouseDown={handleBtnMouseDown}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
              Learn more <i className="fas fa-chevron-right" />
            </button>
            <button className="apple-btn secondary" onMouseDown={handleBtnMouseDown}
              onClick={() => (window.location.href = "/work")}>
              See my work
            </button>
          </div>
        </div>
        <div className="hero-visual fade-in-scale">
          <div className="apple-blob">
            <img src={data.photo} alt={data.name} />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="apple-stats-bar fade-up-delay-3">
        <div className="stats-container" onClick={() => (window.location.href = "/work")}>
          <div className="stat-item">
            <span className="stat-number">15<span className="plus">+</span></span>
            <span className="stat-label">Innovative Projects Built <span className="stat-label-arrow">→</span></span>
          </div>
          <div className="stat-divider" />
          <div className="stat-badge">Available for opportunities</div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="apple-section" id="about" ref={observe}>
        <div className={`apple-grid ${isVisible.about ? "active" : ""}`}>
          <div className="apple-img-wrap">
            <img src={data.me} alt="Shyam Portrait" className="apple-portrait" />
          </div>
          <div className="apple-text-wrap">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">
              A <span className="highlight-blue">programmer</span>
              <br />with a <span className="highlight-blue">teacher's</span> heart.
            </h2>
            <p className="section-p">
              I'm <strong>{data.name}</strong>. From building AI for farmers to
              teaching students, I believe technology should be accessible,
              powerful, and clean.
            </p>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="apple-section dark-bg" id="services" ref={observe}>
        <div className="container">
          <span className="section-tag center">Capabilities</span>
          <h2 className="section-title center white">Engineered for quality.</h2>
          <div className="apple-bento">
            {data.services.map((s, i) => (
              <div key={i} className={`bento-tile tile-${i} ${isVisible.services ? "active" : ""}`}>
                <i className={s.icon} />
                <h3>{s.name}</h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="apple-section" id="skills" ref={observe}>
        <div className="container">
          <span className="section-tag center">Stack</span>
          <h2 className="section-title center">Tools I use.</h2>
          <div className={`apple-skills ${isVisible.skills ? "active" : ""}`}>
            {data.skills.map((skill, i) => (
              <div key={i} className="apple-pill tech-glow">
                <i className={skill.icon} />
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── (new, slotted right after skills) */}
      <CertificationsSection />

      {/* ── ACHIEVEMENTS ── */}
      <section className="apple-section" id="achievements" ref={observe}>
        <div className="container">
          <span className="section-tag center">Impact</span>
          <h2 className="section-title center">Work that speaks.</h2>
          <div className="apple-gallery">
            <div className={`gallery-item ${isVisible.achievements ? "active" : ""}`}>
              <img src="photography/award.jpg" alt="Mayor Award" />
              <div className="gallery-caption">
                <h3>Canadian Choice Award</h3>
                <p>Excellence in Tutoring, Markham 2025.</p>
              </div>
            </div>
            <div className={`gallery-item ${isVisible.achievements ? "active" : ""}`} style={{ transitionDelay: "0.15s" }}>
              <img src="ac1.png" alt="Project Stats" />
              <div className="gallery-caption">
                <h3>Backend Precision</h3>
                <p>60,000+ impressions in one week.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="apple-section footer-cta" id="contact" ref={observe}>
        <div className={`container center ${isVisible.contact ? "active" : ""}`}>
          <span className="section-tag center">Let's Connect</span>
          <h2 className="section-title">
            Let's build the <br />
            <span className="gradient-text">next big thing</span> together.
          </h2>
          <p className="section-p">
            Currently open for new opportunities in Software Development and
            Data Analysis. Based in Ontario, Canada.
          </p>
          <div className="cta-group">
            <button className="apple-btn" onMouseDown={handleBtnMouseDown}
              onClick={() => (window.location.href = "mailto:shyampatel97@gmail.com")}>
              Get in touch
            </button>
            <button className="apple-btn secondary" onMouseDown={handleBtnMouseDown}
              onClick={() => (window.location.href = "/work")}>
              See all 15+ projects
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="apple-footer">
        <div className="container">
          <div className="footer-bottom">
            <p>© 2026 {data.name}. Built with React &amp; Purpose.</p>
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