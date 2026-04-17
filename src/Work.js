import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Work.css";

/* ─────────────────────────────────────────
   Utility: category → badge class
───────────────────────────────────────── */
const badgeClass = (cat = "") => {
  const c = cat.toLowerCase();
  if (c === "developer")      return "badge-developer";
  if (c === "data analyst")   return "badge-data";
  if (c === "system designer") return "badge-system";
  return "badge-developer";
};

/* ─────────────────────────────────────────
   EXPERIENCE SECTION — Horizontal Scroll
───────────────────────────────────────── */
const ExperienceSection = ({ experience }) => {
  const trackRef   = useRef(null);
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hinted, setHinted]       = useState(false);

  const onScroll = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft: sl} = trackRef.current;
    const cardWidth = 324;
    const idx = Math.round(sl / cardWidth);
    setActiveIdx(Math.max(0, Math.min(idx, experience.length - 1)));
    if (sl > 30) setHinted(true);
  }, [experience.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.classList.add("dragging");
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.4;
  };
  const stopDrag = () => {
    isDragging.current = false;
    trackRef.current?.classList.remove("dragging");
  };

  const scrollTo = (idx) => {
    if (!trackRef.current) return;
    const cardWidth = 324;
    trackRef.current.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="experience-section">
      <div className="experience-header">
        <span className="section-tag">01 — The Path</span>
        <h1 className="section-title">Career Journey.</h1>
      </div>

      <div className="exp-track-wrapper">
        <div style={{ position: "relative", height: "1px" }}>
          <div className="exp-connector" />
        </div>

        <div
          className="exp-track"
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {experience.map((exp, i) => (
            <div
              className="exp-card"
              key={i}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="exp-dot" />
              <div className="exp-duration">{exp.duration}</div>
              <div className="exp-role">{exp.role}</div>
              <div className="exp-company">{exp.company}</div>
              <div className="exp-divider" />
              <div className="exp-desc">{exp.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="exp-progress">
        {experience.map((_, i) => (
          <div
            key={i}
            className={`exp-progress-dot ${activeIdx === i ? "active" : ""}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>

      <p className={`exp-hint ${hinted ? "hidden" : ""}`}>
        ← drag to explore →
      </p>
    </section>
  );
};


/* ─────────────────────────────────────────
   PROJECTS SECTION — Terminal / CMD
───────────────────────────────────────── */
const FILTERS = ["All", "Developer", "Data analyst", "System Designer"];

const ProjectsTerminal = ({ projects }) => {
  const [query,    setQuery]    = useState("");
  const [filter,   setFilter]   = useState("All");
  const [focused,  setFocused]  = useState(0);
  const [selected, setSelected] = useState(null);
  const inputRef  = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = projects.filter((p) => {
    const matchCat   = filter === "All" || p.category?.toLowerCase() === filter.toLowerCase();
    const matchQuery = !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase()) ||
      p.category?.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused((f) => Math.min(f + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => Math.max(f - 1, 0));
    }
    if (e.key === "Enter" && results[focused]) {
      setSelected(results[focused]);
    }
  };

  const onInput = (e) => {
    setQuery(e.target.value);
    setFocused(0);
  };

  useEffect(() => {
  if (!resultsRef.current) return;
  
  if (document.activeElement === inputRef.current) {
    const row = resultsRef.current.querySelector(".focused");
    if (row) row.scrollIntoView({ block: "nearest" });
  }
}, [focused]);

  const typewriterText = "> portfolio.search({ projects: true })";

  return (
    <section className="terminal-section">
      <div className="term-glow term-glow-1" />
      <div className="term-glow term-glow-2" />

      <div className="terminal-inner">
        <div className="term-header">
          <span className="term-section-tag">02 — Projects</span>
          <h2 className="term-section-title">Featured Work.</h2>
          <span className="term-section-sub">{typewriterText}</span>
        </div>

        <div className="cmd-window">
          <div className="cmd-titlebar">
            <span className="cmd-dot red"   />
            <span className="cmd-dot yellow"/>
            <span className="cmd-dot green" />
            <span className="cmd-title-text">shyam-patel — portfolio terminal</span>
          </div>

          <div className="cmd-search-wrap">
            <span className="cmd-prompt-symbol">$</span>
            <input
              ref={inputRef}
              className="cmd-search-input"
              placeholder="search projects... (⌘K to focus)"
              value={query}
              onChange={onInput}
              onKeyDown={onKeyDown}
              autoComplete="off"
              spellCheck={false}
            />
            <span className="cmd-kbd">↑↓ navigate</span>
            <span className="cmd-kbd">↵ open</span>
          </div>

          <div className="cmd-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`cmd-filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => { setFilter(f); setFocused(0); }}
              >
                {f === "All" ? "-- all" : f === "Developer" ? "developer" : f === "Data analyst" ? "data" : "system"}
              </button>
            ))}
          </div>

          <div className="cmd-results" ref={resultsRef}>
            {results.length === 0 ? (
              <div className="cmd-empty">
                <div className="cmd-empty-icon">◌</div>
                <span className="cmd-empty-text">no results for "{query}"</span>
              </div>
            ) : (
              results.map((project, i) => (
                <div
                  key={project.name}
                  className={`cmd-result-row ${i === focused ? "focused" : ""}`}
                  onClick={() => setSelected(project)}
                  onMouseEnter={() => setFocused(i)}
                >
                  <span className="cmd-result-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="cmd-result-main">
                    <div className="cmd-result-name">{project.name}</div>
                    <div className="cmd-result-desc">{project.description}</div>
                  </div>
                  <span className={`cmd-badge ${badgeClass(project.category)}`}>
                    {project.category}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="cmd-statusbar">
            <span className="cmd-status-dot" />
            <span className="cmd-status-text">ready</span>
            <span className="cmd-status-count">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`cmd-detail-overlay ${selected ? "open" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
      >
        {selected && (
          <div className="cmd-detail-card">
            <button
              className="cmd-detail-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="cmd-detail-badge">
              <span className={`cmd-badge ${badgeClass(selected.category)}`}>
                {selected.category}
              </span>
            </div>
            <h3 className="cmd-detail-name">{selected.name}</h3>
            <p className="cmd-detail-desc">{selected.description}</p>
            {selected.link && (
              <a
                href={selected.link}
                target="_blank"
                rel="noreferrer"
                className="cmd-detail-link"
              >
                <span>open_project</span>
                <span>→</span>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};


/* ─────────────────────────────────────────
   PHOTOGRAPHY — Filmstrip scroll (Birds)
───────────────────────────────────────── */
const FilmStrip = ({ images, panoramicImages }) => {
  const stripRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - stripRef.current.offsetLeft;
    scrollLeft.current = stripRef.current.scrollLeft;
    stripRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    stripRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };
  const stopDrag = () => {
    isDragging.current = false;
    if (stripRef.current) stripRef.current.style.cursor = "grab";
  };

  const scroll = (dir) => {
    if (!stripRef.current) return;
    stripRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div className="ph-filmstrip-wrap">
      <div
        className="ph-filmstrip"
        ref={stripRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {images.map((img, i) => (
          <div className="ph-film-item" key={i}>
            <img src={img} alt="Bird" loading="lazy" />
          </div>
        ))}
        {panoramicImages?.map((img, i) => (
          <div className="ph-film-item ph-film-wide" key={`pan-${i}`}>
            <img src={img} alt="Bird panoramic" loading="lazy" />
          </div>
        ))}
      </div>
      <div className="ph-strip-arrows">
        <button className="ph-strip-btn" onClick={() => scroll(-1)} aria-label="Scroll left">←</button>
        <button className="ph-strip-btn" onClick={() => scroll(1)} aria-label="Scroll right">→</button>
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────── */
const Work = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Always start at top of page when Work mounts
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then(setData)
      .catch((e) => console.error("Data load error:", e));
  }, []);

  if (!data) {
    return (
      <div className="work-loader">
        <div className="work-loader-ring" />
      </div>
    );
  }

  return (
    <div className="work-root">
      <ExperienceSection experience={data.experience} />
      <ProjectsTerminal  projects={data.projects} />

      {/* ── 03. Photography ── */}
      
<section className="ph-section" id="hobby">
  <div className="ph-container">
    <div className="ph-header">
      <span className="ph-tag">03. Perspectives</span>
      <h2 className="ph-title">Through My Lens.</h2>
    </div>

    {/* ── Nature — Now using FilmStrip ── */}
    <div className="ph-category">
      <div className="ph-cat-meta">
        <span className="ph-cat-label">Category 01</span>
        <h3 className="ph-cat-title">Nature</h3>
      </div>
      <FilmStrip 
        images={[
          "/photography/nature22.JPG",
          "/photography/nature11.JPG",
          "/photography/nature3.JPG",
          "/photography/nature23.JPG",
          "/photography/nature7.JPG",
          "/photography/nature6.JPG",
          "/photography/nature8.JPG",
          "/photography/nature10.JPG"
        ]} 
      />
    </div>

    {/* ── Birds — Keeping same ── */}
    <div className="ph-category">
      <div className="ph-cat-meta">
        <span className="ph-cat-label">Category 02</span>
        <h3 className="ph-cat-title">Birds</h3>
      </div>
      <FilmStrip
        images={[
          "/photography/bird12.JPG",
          "/photography/bird9.JPG",
          "/photography/bird11.JPG",
          "/photography/bird10.JPG",
          "/photography/bird8.JPG",
          "/photography/bird1.JPG",
          "/photography/bird7.JPG",
          "/photography/bird2.JPG",
        ]}
        panoramicImages={[
          "/photography/bird4.JPG",
          "/photography/bird-bc.JPG",
          "/photography/bird5.JPG",
        ]}
      />
    </div>

    {/* ── People — Now using FilmStrip ── */}
    <div className="ph-category">
      <div className="ph-cat-meta">
        <span className="ph-cat-label">Category 03</span>
        <h3 className="ph-cat-title">People</h3>
      </div>
      <FilmStrip 
        images={[
          "/photography/ppl5.JPG",
          "/photography/ppl-7.jpg",
          "/photography/ppl2.JPG",
          "/photography/ppl4.JPG"
        ]} 
      />
    </div>
  </div>
</section>
    </div>
  );
};

export default Work;
