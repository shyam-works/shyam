import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Work.css";

const Work = () => {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
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

  // FIXED: Logic to ensure "All" shows everything immediately on load
  const filteredProjects = data?.projects ? data.projects.filter(project => {
    if (selectedCategory === 'All') return true;
    return project.category?.toLowerCase() === selectedCategory.toLowerCase();
  }) : [];

  const photographyCategories = [
    {
      title: "Nature",
      images: ["/photography/nature22.JPG", "/photography/nature11.JPG", "/photography/nature3.JPG", "/photography/nature23.JPG", "/photography/nature7.JPG", "/photography/nature6.JPG", "/photography/nature8.JPG", "/photography/nature10.JPG"]
    },
    {
      title: "Birds",
      images: ["/photography/bird12.JPG", "/photography/bird9.JPG", "/photography/bird11.JPG", "/photography/bird10.JPG", "/photography/bird8.JPG", "/photography/bird1.JPG", "/photography/bird7.JPG", "/photography/bird2.JPG"],
      panoramicImages: ["/photography/bird4.JPG", "/photography/bird-bc.JPG", "/photography/bird5.JPG"]
    },
    {
      title: "People",
      images: ["/photography/ppl5.JPG", "/photography/ppl-7.jpg", "/photography/ppl2.JPG", "/photography/ppl4.JPG"]
    }
  ];

  if (!data) return <div className="apple-loader"><span></span></div>;

  return (
    <div className="work-root">
      
      {/* 01. JOURNEY ROADMAP */}
      <section className="work-section" id="journey" ref={observeElement}>
        <div className="container">
          <span className="work-tag">01. The Path</span>
          <h1 className="work-display-title">Career Journey.</h1>
          <div className="roadmap-container">
            <div className="roadmap-line"></div>
            {data.experience.map((exp, index) => (
              <div key={index} id={`step-${index}`} className={`roadmap-step ${index % 2 === 0 ? 'left' : 'right'} ${isVisible[`step-${index}`] ? 'active' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }} ref={observeElement}>
                <div className="roadmap-dot"><span className="step-number">{index + 1}</span></div>
                <div className="roadmap-content">
                  <span className="roadmap-year">{exp.duration}</span>
                  <h3>{exp.role}</h3>
                  <p className="roadmap-company">{exp.company}</p>
                  <p className="roadmap-desc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. PROJECTS */}
      <section className="work-section light-gray" id="projects" ref={observeElement}>
        <div className="container">
          <span className="work-tag center">02. Portfolio</span>
          <h2 className="work-display-title center">Featured Work.</h2>
          
          <div className="filter-shelf">
            {['All', 'Developer', 'Data analyst', 'System Designer'].map(cat => (
              <button 
                key={cat} 
                className={`shelf-btn ${selectedCategory === cat ? 'active' : ''}`} 
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="editorial-project-list">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.name}
                id={`proj-${index}`}
                ref={observeElement}
                className={`project-row ${index % 2 === 0 ? 'row-normal' : 'row-reverse'} ${isVisible[`proj-${index}`] ? 'active' : ''}`}
              >
                <div className="project-visual">
                  <div className="image-frame">
                    <img src={project.image} alt={project.name} />
                  </div>
                </div>
                <div className="project-meta">
                  <span className="meta-cat">{project.category}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <a href={project.link} target="_blank" rel="noreferrer" className="editorial-link">View Project <span>→</span></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. PHOTOGRAPHY */}
      <section className="hobby-section-v5" id="hobby" ref={observeElement}>
        <div className="container">
          <span className="work-tag white center">03. Perspectives</span>
          <h2 className="work-display-title white center">Through My Lens.</h2>
          <div className="photography-content">
            {photographyCategories.map((category, catIdx) => (
              <div key={catIdx} className="category-block">
                <h3 className="cat-title-v5">{category.title}</h3>
                <div className="organic-gallery">
                  {category.images.map((img, i) => (
                    <div key={i} className="organic-item fade-up"><img src={img} alt={category.title} loading="lazy" /></div>
                  ))}
                  {category.panoramicImages?.map((img, i) => (
                    <div key={`pan-${i}`} className="organic-item panoramic fade-up"><img src={img} alt="Wide shot" loading="lazy" /></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;