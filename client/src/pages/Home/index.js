import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleViewAvailableBooks = () => {
    navigate("/available-books");
  };

  const handleContactLibrarian = () => {
    navigate("/contact-librarian");
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="buttons-container">
          <button
            type="button"
            onClick={handleViewAvailableBooks}
            className="action-button"
          >
            View Available Books
          </button>
          <button
            type="button"
            onClick={handleContactLibrarian}
            className="action-button"
          >
            Contact Librarian
          </button>
        </div>
      </header>

      <main className="main-content">
        <h1 className="main-title">Welcome to the Library Management System</h1>
        <p className="main-description">
          Manage your books with ease and explore our vast collection.
        </p>

        {/* Image and description in a box with a line */}
        <div className="container">
          <div className="text">
            <h1></h1>
          </div>
          <div className="wrapper">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="banner">
            <div className="content">
              
                <h1>
                  Introducing education, the ultimate library management system
                  based in Guntur, TG. Our innovative platform is designed to
                  streamline and optimize library operations, making it easier
                  for educational institutions to manage their resources
                  effectively. With education, librarians can effortlessly
                  organize, track, and access a vast collection of books,
                  digital resources, and other materials, ensuring a seamless
                  experience for both staff and students. Say goodbye to manual
                  processes and embrace the future of library management with
                  education
                </h1>
              
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2023 Library Management System</p>
      </footer>
    </div>
  );
};

export default Home;
