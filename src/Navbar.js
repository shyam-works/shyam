import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const handleHobbyClick = () => {
    closeNavbar();
    navigate("/work");
    setTimeout(() => {
      document.getElementById("hobby").scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleProjectClick = () => {
    closeNavbar();
    navigate("/work");
    setTimeout(() => {
      document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>Shyam Patel</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-expanded={isNavbarOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/work" onClick={closeNavbar}>Work</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={handleProjectClick}>
                Project
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={handleHobbyClick}>
                Hobbie
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeNavbar}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
