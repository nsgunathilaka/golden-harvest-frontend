import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Golden Harvest</h1>
        <p>Your trusted source for the best agricultural practices and crop information.</p>
        <Link to="/vegetable-crop" className="explore-button">Explore Crops</Link>
      </header>

      <section className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Vegetable Crop Information</h3>
            <p>Discover detailed information about various vegetable crops to help you grow the best produce.</p>
          </div>
          <div className="feature-item">
            <h3>Fruit Crop Insights</h3>
            <p>Learn about the best fruit crops to cultivate in your region with expert advice and tips.</p>
          </div>
          <div className="feature-item">
            <h3>Paddy Crop Techniques</h3>
            <p>Get the latest techniques and methods for growing high-yielding paddy crops.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>About Golden Harvest</h2>
        <p>Golden Harvest is dedicated to empowering farmers and enthusiasts with valuable agricultural knowledge. We provide up-to-date information on crop cultivation, best practices, and innovative techniques to ensure a bountiful harvest every season.</p>
      </section>

      <footer className="footer-section">
          <p>&copy; 2024 Golden Harvest. All rights reserved.</p>
          <div className="social-icons">
            <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
          </div>
        </footer>

    </div>
  );
};

export default Home;
