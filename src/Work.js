import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Work.css";

const Work = () => {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [imageLoadStates, setImageLoadStates] = useState({});
  const observerRef = useRef(null);
  const location = useLocation();

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe elements when they mount
  const observeElement = (element) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to the section based on hash
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  // Handle image loading
  const handleImageLoad = (imageId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  // Photography data structure for better organization
  const photographyCategories = [
    {
      title: "Nature",
      images: [
        "/photography/nature22.JPG",
        "/photography/nature11.JPG",
        "/photography/nature3.JPG",
        "/photography/nature23.JPG",
        "/photography/nature7.JPG",
        "/photography/nature6.JPG",
        "/photography/nature8.JPG",
        "/photography/nature10.JPG"
      ]
    },
    {
      title: "Birds",
      images: [
        "/photography/bird12.JPG",
        "/photography/bird9.JPG",
        "/photography/bird11.JPG",
        "/photography/bird10.JPG",
        "/photography/bird8.JPG",
        "/photography/bird1.JPG",
        "/photography/bird7.JPG",
        "/photography/bird2.JPG"
      ],
      panoramicImages: [
        "/photography/bird4.JPG",
        "/photography/bird-bc.JPG",
        "/photography/bird5.JPG"
      ]
    },
    {
      title: "People",
      images: [
        "/photography/ppl5.JPG",
        "/photography/ppl-7.jpg",
        "/photography/ppl2.JPG",
        "/photography/ppl4.JPG"
      ]
    }
  ];

  if (!data) {
    return (
      <div className="workk">
        <div className="container my-5">
          {/* Loading Skeletons */}
          <div className="loading-skeleton" style={{ height: '60px', marginBottom: '40px' }}></div>
          
          {/* Experience Loading */}
          <div className="experience-container">
            {[1, 2, 3].map((item) => (
              <div key={item} className="experience-card">
                <div className="experience-content">
                  <div className="loading-skeleton" style={{ height: '30px', width: '60%', marginBottom: '15px' }}></div>
                  <div className="loading-skeleton" style={{ height: '25px', width: '40%', marginBottom: '10px' }}></div>
                  <div className="loading-skeleton" style={{ height: '80px', width: '100%' }}></div>
                </div>
                <div className="experience-image">
                  <div className="loading-skeleton" style={{ width: '200px', height: '150px', borderRadius: '8px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="workk">
      {/* Experience Section */}
      <div className="container my-5">
        <div className="experience-container" id="experience" ref={observeElement}>
          <h1 className="page-title">My Experience</h1>
          <div className="First">
            {data.experience.map((experience, index) => (
              <div 
                key={index} 
                className={`experience-card ${isVisible.experience ? 'fade-in visible' : 'fade-in'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Left Side: Text Content */}
                <div className="experience-content">
                  <h5 className="experience-title">{experience.role}</h5>
                  <h6 className="experience-subtitle">
                    <b>{experience.company}</b>
                  </h6>
                  <p className="experience-duration">{experience.duration}</p>
                  <p className="experience-description">
                    {experience.description}
                  </p>
                </div>

                
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="projects-section" id="projects" ref={observeElement}>
          <h1 className="page-title">My Projects</h1>
          <div className="row">
            {data.projects.map((project, index) => (
              <div className="col-md-4 mb-4" key={project.index}>
                <div 
                  className={`card h-100 ${isVisible.projects ? 'fade-in visible' : 'fade-in'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {project.image && (
                    <>
                      {!imageLoadStates[`project-${index}`] && (
                        <div className="loading-skeleton card-img-top"></div>
                      )}
                      <img
                        src={project.image}
                        alt={project.name}
                        className="card-img-top"
                        onLoad={() => handleImageLoad(`project-${index}`)}
                        style={{ display: imageLoadStates[`project-${index}`] ? 'block' : 'none' }}
                      />
                    </>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    <a
                      href={project.link}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Project </span>
                      <i className="fas fa-external-link-alt ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* More Projects Section */}
<div className="more-projects-section" id="more-projects" ref={observeElement}>
  <div 
    className={`more-projects-card ${isVisible['more-projects'] ? 'fade-in visible' : 'fade-in'}`}
    style={{
      textAlign: 'center',
      padding: '40px',
      backgroundColor: 'transparent',
      borderRadius: '15px',
      marginTop: '40px',
      marginBottom: '40px',
      border: '1px solid #e9ecef',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
    }}
    onClick={() => window.open('https://vercel.com/shyam-patels-projects-bd445ba8', '_blank')}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 30px #e9aea5ff'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }}
  >
    
    


    <p style={{
      fontSize: '16px',
      color: '#777',
      marginBottom: '25px',
      maxWidth: '500px',
      margin: '0 auto 25px'
    }}>
      Explore my complete collection of web applications, demos, and experiments on github
    </p>

    <button
      className="btn btn-outline-primary"
      style={{
        padding: '12px 30px',
        fontSize: '16px',
        fontWeight: '500',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        border: '2px solid #e94f37',
        
        backgroundColor: 'transparent',
        
      }}
      onClick={(e) => {
        e.stopPropagation();
        window.open('https://github.com/Shyam-Works', '_blank');
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#e94f37';
        e.target.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = '#e94f37';
      }}
    >
      <span>Explore </span>
      <i className="fas fa-external-link-alt" style={{ marginLeft: '8px' }}></i>
    </button>
  </div>
</div>
      </div>

      {/* Photography/Hobby Section */}
      <div className="hobby-section" id="hobby" ref={observeElement}>
        <div className="container">
          <h1 className="hobby-title">My Hobby</h1>
          <h4 className="hobby-subtitle">Photography</h4>
        </div>

        <div className="photography-gallery">
          <div className="gallery-overlay"></div>
          <div className="gallery-content">
            {photographyCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 
                  className={`category-header ${isVisible.hobby ? 'fade-in visible' : 'fade-in'}`}
                  style={{ animationDelay: `${categoryIndex * 0.2}s` }}
                >
                  {category.title}
                </h2>

                {/* Regular Images */}
                <div className="gallery-grid">
                  {category.images.map((image, imageIndex) => (
                    <div 
                      key={imageIndex} 
                      className={`gallery-item ${isVisible.hobby ? 'fade-in visible' : 'fade-in'}`}
                      style={{ animationDelay: `${(categoryIndex * 0.2) + (imageIndex * 0.1)}s` }}
                    >
                      {!imageLoadStates[`${category.title}-${imageIndex}`] && (
                        <div className="loading-skeleton" style={{ width: '100%', height: '100%', borderRadius: '15px' }}></div>
                      )}
                      <img
                        src={image}
                        alt={`${category.title} ${imageIndex + 1}`}
                        onLoad={() => handleImageLoad(`${category.title}-${imageIndex}`)}
                        style={{ display: imageLoadStates[`${category.title}-${imageIndex}`] ? 'block' : 'none' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Panoramic Images (for Birds category) */}
                {category.panoramicImages && (
                  <div className="gallery-grid">
                    {category.panoramicImages.map((image, imageIndex) => (
                      <div 
                        key={imageIndex} 
                        className={`gallery-item panoramic ${isVisible.hobby ? 'fade-in visible' : 'fade-in'}`}
                        style={{ animationDelay: `${(categoryIndex * 0.2) + (imageIndex * 0.1) + 0.5}s` }}
                      >
                        {!imageLoadStates[`${category.title}-panoramic-${imageIndex}`] && (
                          <div className="loading-skeleton" style={{ width: '100%', height: '100%', borderRadius: '15px' }}></div>
                        )}
                        <img
                          src={image}
                          alt={`${category.title} panoramic ${imageIndex + 1}`}
                          onLoad={() => handleImageLoad(`${category.title}-panoramic-${imageIndex}`)}
                          style={{ display: imageLoadStates[`${category.title}-panoramic-${imageIndex}`] ? 'block' : 'none' }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Scroll to Top Button */}
        <div className="scroll-top-container">
          <button
            className="scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <i className="fas fa-arrow-up mr-2"></i>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default Work;
