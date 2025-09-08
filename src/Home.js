import React, { useEffect, useState, useRef } from "react";
import "./Home.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

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

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Parallax effect for hero image
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElement = document.querySelector('.profile-container');
      if (parallaxElement && window.innerWidth > 768) {
        parallaxElement.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!data) {
    return (
      <div className="home">
        <div className="home-container">
          <div className="home-text">
            <div className="loading-skeleton" style={{ height: '20px', width: '200px', marginBottom: '15px' }}></div>
            <div className="loading-skeleton" style={{ height: '60px', width: '100%', marginBottom: '20px' }}></div>
            <div className="loading-skeleton" style={{ height: '100px', width: '100%' }}></div>
          </div>
          <div className="home-image">
            <div className="loading-skeleton circle-background"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home smooth-scroll">
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>

      {/* Hero Section */}
      <div className="home-container" id="hero">
        {/* Left Side - Text Info */}
        <div className="home-text">
          <p className="intro-text">Hello, I'm {data.role}</p>
          <h1>
            <span className="highlight">{data.name}</span>
          </h1>
          <p className="description">{data.intro}</p>
          
          {/* Interactive Stats Cards */}
          <div className="stats-container">
            <div className="stat-card" onClick={() => scrollToSection('services')}>
              <span className="stat-number">15+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-card" onClick={() => scrollToSection('skills')}>
              <span className="stat-number">25+</span>
              <span className="stat-label">technical Skills</span>
            </div>
            
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="cta-container">
            <button 
              className="cta-button"
              onClick={() => scrollToSection('about')}
            >
              <span>Learn More</span>
              <i className="fas fa-arrow-right"></i>
            </button>
            <a href="/contact" className="cta-secondary">
              <span>Get in Touch</span>
              <i className="fas fa-external-link-alt"></i>
            </a>
            <a href="https://www.linkedin.com/in/shyam-patel-2b47a7297/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin" style={{ fontSize: '24px' }}></i>
          </a>
          </div>
        </div>

        {/* Right Side - Enhanced Profile Image */}
        <div className="home-image">
          <div className="profile-container">
            <div className="circle-background"></div>
            <img src={data.photo} alt={data.name} className="profile-img" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
          <span>Scroll Down</span>
        </div>
      </div>

      {/* About Me Section with Floating Background Elements */}
      <div 
        className="who-am-i-container" 
        id="about"
        ref={observeElement}
      >
        {/* Floating Background Animation */}
        <div className="about-floating-bg">
          {/* Circle Elements */}
          <div className="about-float-element circle small"></div>
          <div className="about-float-element circle medium pulse"></div>
          <div className="about-float-element circle large"></div>
          
          {/* Triangle Elements */}
          <div className="about-float-element triangle"></div>
          
          {/* Square Elements */}
          <div className="about-float-element square small pulse"></div>
          <div className="about-float-element square medium"></div>
          
          {/* Diamond Elements */}
          <div className="about-float-element diamond small"></div>
          <div className="about-float-element diamond large pulse"></div>
        </div>

        <div className="about-content">
          <div className={`about-image-section ${isVisible.about ? 'slide-in-left visible' : 'slide-in-left'}`}>
            <img src={data.me} alt="About Me" />
          </div>
          
          <div className={`about-text-section ${isVisible.about ? 'slide-in-right visible' : 'slide-in-right'}`}>
            <h2>About Me</h2>
            <div className="text">
              <p>
                I'm <strong>{data.name}</strong>, a problem-solver who turned curiosity into expertise. 
                Currently pursuing an Advanced Diploma in <b>Computer Programming and Analysis</b> at <b>Seneca College</b>, 
                where I balance learning with teaching as a tutor at StudentScholars Private School and working on real-world projects.
                <br /><br />
                I focus on creating solutions that work beautifully and solve actual problems. 
                Every project is an opportunity to push boundaries and deliver meaningful results.
                <br /><br />
                Ready to see what I've built? <a href="/work" className="work-link">Check out my work here - Let's GO!</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div 
        className="services-container" 
        id="services"
        ref={observeElement}
      >
        <h2 className="section-title">What I Offer</h2>
        <div className="services-grid">
          {data.services.map((service, index) => (
            <div 
              key={index} 
              className={`service-card ${isVisible.services ? 'fade-in visible' : 'fade-in'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="icon-box">
                <i className={service.icon}></i>
              </div>
              <h3 className="service-title">{service.name}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div 
        className="skills-container" 
        id="skills"
        ref={observeElement}
      >
        <h2>My Skills</h2>
        <ul>
          {data.skills.map((skill, index) => (
            <li 
              key={index} 
              className={`skill-item ${isVisible.skills ? 'fade-in visible' : 'fade-in'}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <i className={skill.icon}></i>
              {skill.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Achievements Section */}
      <div 
        className="new-section" 
        id="achievements"
        ref={observeElement}
      >
        <h2>
          <b>Achievements</b>
        </h2>
        
        <div className="achievements-section">
          <div className={`achievement-card ${isVisible.achievements ? 'slide-in-left visible' : 'slide-in-left'}`}>
            <div className="new-section-image">
              <img
                src="ac1.png"
                alt="Backend Project Success"
                className="img-centered"
              />
            </div>
            <div className="new-section-text">
              <h2>Backend Project Success</h2>
              <p>
                I'm thrilled to share the success of my recent backend project!
                In just one week, the project received an incredible 60,000+
                impressions and 1,500+ likes, showcasing the strong interest and
                positive feedback from the community.
                <br />
                <br />
                The project involved developing a scalable backend solution with
                efficient data management, focusing on performance, security,
                and integration. The massive engagement I received highlights
                the impact of the work and reinforces my passion for backend
                development. I'm excited to continue building on this success
                and sharing my journey with you all!
              </p>
            </div>
          </div>

          <div className={`achievement-card ${isVisible.achievements ? 'slide-in-right visible' : 'slide-in-right'}`}>
            <div className="new-section-image">
              <img
                src="photography/award.jpg"
                alt="Tutoring Award"
                className="img-centered"
              />
            </div>
            <div className="new-section-text">
              <h2>Canadian Top Choice Award in Tutoring</h2>
              <p>
                As a recipient of the Canadian Choice Award in Tutoring for 2025
                in Markham, I take great pride in my role as a tutor, where I am
                committed to helping students excel and reach their full
                potential.
                <br />
                <br />
                I approach my teaching with dedication and a deep
                understanding of each student's individual needs, ensuring that
                every lesson is engaging, impactful, and aligned with their
                learning goals. My focus is on creating a supportive environment
                that fosters both academic growth and personal development.
                Through personalized guidance, hands-on projects, and clear
                explanations, I work tirelessly to help students overcome
                challenges and achieve success in their studies. The recognition
                we've received is a testament to my passion for teaching and my
                unwavering commitment to delivering results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}