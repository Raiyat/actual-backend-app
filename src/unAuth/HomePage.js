// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import additional Font Awesome icons
import { faRobot, faMagic, faCode, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faReact, faGoogle, faGithub, faPython } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add icons to the library
library.add(faRobot, faMagic, faCode, faMobileAlt, faReact, faGoogle, faGithub, faPython);

const HomePage = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gclid = params.get('gclid') || '';
    localStorage.setItem('gclid', gclid);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = ['home', 'features', 'tech-stack', 'episodes', 'testimonials'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveNav(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const messages = [
    "Explore more ways to build—whether it's in the mountains, by the beach, or right in your apartment.",
    'Discover new horizons with AI-powered backend development.',
    'Unleash your creativity wherever you are.',
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const navHeight = document.querySelector('.unauth-navbar').offsetHeight;
      const sectionTop = section.offsetTop - navHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      setActiveNav(id);
    }
  };

  return (
    <div className="unauth-homepage">
      {/* Navigation */}
      <nav className={`unauth-navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="unauth-logo">
          <FontAwesomeIcon icon={faRobot} className="unauth-header-icon" />
          YourApp
        </Link>
        <ul className="unauth-nav-links">
          <li
            className={activeNav === 'features' ? 'active' : ''}
            onClick={() => scrollToSection('features')}
          >
            Features
          </li>
          <li
            className={activeNav === 'tech-stack' ? 'active' : ''}
            onClick={() => scrollToSection('tech-stack')}
          >
            Tech Stack
          </li>
          <li
            className={activeNav === 'episodes' ? 'active' : ''}
            onClick={() => scrollToSection('episodes')}
          >
            Episodes
          </li>
          <li
            className={activeNav === 'testimonials' ? 'active' : ''}
            onClick={() => scrollToSection('testimonials')}
          >
            Testimonials
          </li>
          <li>
            <Link to="/signup" className="unauth-cta-button">
              Get Started
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="unauth-hero-section" id="home">
        <div className="unauth-hero-content">
          <h1>
            <FontAwesomeIcon icon={faRobot} className="unauth-header-icon" />
            Actually Build Backend Apps Using AI
          </h1>
          <p>Leverage the power of AI to streamline your backend development process.</p>

          {/* The link component catches the click event and navigates to the signup page by changing the URL */}
          <Link to="/signup" className="unauth-cta-button">
            Sign Up
          </Link>
          {/*React Router sees the URL changed and looks through all the routes in the app.js file
           and finds the route that matches the URL and renders the component associated with that
           route.*/}
        </div>
      </section>

      {/* Scrolling Banner */}
      <div className="unauth-scrolling-banner">
        <div className="scrolling-text">
          {messages.map((message, index) => (
            <span key={index}>{message}</span>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="unauth-features" id="features">
        <h2>Features</h2>
        <div className="unauth-features-grid">
          <div className="unauth-feature-item">
            <FontAwesomeIcon icon={faMagic} className="unauth-feature-icon" />
            <h3>AI Automation</h3>
            <p>Automate repetitive tasks and focus on what matters most.</p>
          </div>
          <div className="unauth-feature-item">
            <FontAwesomeIcon icon={faCode} className="unauth-feature-icon" />
            <h3>Code Generation</h3>
            <p>Generate high-quality code snippets tailored to your needs.</p>
          </div>
          <div className="unauth-feature-item">
            <FontAwesomeIcon icon={faMobileAlt} className="unauth-feature-icon" />
            <h3>Responsive Design</h3>
            <p>Create applications that look stunning on any device.</p>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section className="unauth-parallax">
        <div className="unauth-parallax-content">
          <h2>Seamless Integration</h2>
          <p>Integrate with your favorite tools and platforms effortlessly.</p>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="unauth-tech-stack" id="tech-stack">
        <h2>Our Tech Stack</h2>
        <div className="unauth-tech-stack-icons">
          <div className="unauth-tech-item">
            <FontAwesomeIcon icon={faReact} className="unauth-tech-icon" />
            <p>React</p>
          </div>
          <div className="unauth-tech-item">
            <FontAwesomeIcon icon={faGoogle} className="unauth-tech-icon" />
            <p>Google Cloud</p>
          </div>
          <div className="unauth-tech-item">
            <FontAwesomeIcon icon={faCode} className="unauth-tech-icon" />
            <p>Firebase</p>
          </div>
          <div className="unauth-tech-item">
            <FontAwesomeIcon icon={faGithub} className="unauth-tech-icon" />
            <p>GitHub</p>
          </div>
          <div className="unauth-tech-item">
            <FontAwesomeIcon icon={faPython} className="unauth-tech-icon" />
            <p>Python</p>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="unauth-episodes" id="episodes">
        <h2>Episodes</h2>
        <div className="unauth-episode-item">
          <h3>Introduction to Backend Development</h3>
          <p>Kickstart your journey by understanding the fundamentals of backend development.</p>
          <div className="unauth-video-container">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Introduction to Backend Development"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="unauth-testimonials" id="testimonials">
        <h2>What Developers Are Saying</h2>
        <div className="unauth-testimonials-grid">
          <div className="unauth-testimonial-item">
            <p>"This series has been a game-changer for my backend development skills."</p>
            <h4>- Alex Johnson</h4>
          </div>
          <div className="unauth-testimonial-item">
            <p>"The step-by-step tutorials make complex concepts easy to grasp."</p>
            <h4>- Maria Gomez</h4>
          </div>
          <div className="unauth-testimonial-item">
            <p>"I love how the series integrates AI tools to streamline the development process."</p>
            <h4>- Liam Smith</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="unauth-footer">
        <div className="unauth-footer-content">
          <p>© 2025 YourApp. All rights reserved.</p>
          <div className="unauth-footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;