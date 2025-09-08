import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleHobbyClick = () => {
    navigate("/work"); // Navigate to the Work page
    setTimeout(() => {
      // Scroll to the hobby section after the page has loaded
      document.getElementById("hobby").scrollIntoView({ behavior: "smooth" });
    }, 100); // Delay to make sure the page has loaded
  };
  const handleProjectClick = () => {
    navigate("/work"); // Navigate to the Work page
    setTimeout(() => {
      // Scroll to the hobby section after the page has loaded
      document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
    }, 100); // Delay to make sure the page has loaded
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Shyam Patel</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/work">Work</Link>
            </li>
            <button className="nav-link btn" onClick={handleProjectClick}>
                Projects
              </button>
            <button className="nav-link btn" onClick={handleHobbyClick}>
                Hobbies
              </button>
            
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}
