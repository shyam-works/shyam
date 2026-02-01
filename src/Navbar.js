import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add background blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const closeNavbar = () => setIsNavbarOpen(false);

  const handleNavClick = (id) => {
    closeNavbar();
    navigate("/work");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <nav className={`custom-navbar ${scrolled ? "navbar-scrolled" : ""} ${isNavbarOpen ? "navbar-open" : ""}`}>
      <div className="nav-container">
        <Link className="nav-logo" to="/" onClick={closeNavbar}>
          Shyam <span className="logo-dot">.</span>
        </Link>

        <button 
          className={`nav-menu-btn ${isNavbarOpen ? "active" : ""}`} 
          onClick={toggleNavbar}
          aria-label="Toggle Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className={`nav-links-wrapper ${isNavbarOpen ? "show" : ""}`}>
          <ul className="nav-list">
            <li><Link className="nav-item" to="/" onClick={closeNavbar}>Home</Link></li>
            <li><Link className="nav-item" to="/work" onClick={closeNavbar}>Work</Link></li>
            <li><button className="nav-item btn-reset" onClick={() => handleNavClick("projects")}>Projects</button></li>
            <li><button className="nav-item btn-reset" onClick={() => handleNavClick("hobby")}>Hobby</button></li>
            <li><Link className="nav-contact-btn" to="/contact" onClick={closeNavbar}>Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
