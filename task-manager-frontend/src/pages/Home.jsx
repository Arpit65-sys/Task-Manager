import React, { useState, useEffect } from "react";
import { healthCheck } from "../api/publicApi";
import "../styles/home.css";

const Home = () => {
  const [healthStatus, setHealthStatus] = useState("");

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        const data = await healthCheck();
        setHealthStatus(data);
      } catch (error) {
        console.error("Error fetching health status:", error);
      }
    };

    fetchHealthStatus();
  }, []);

  return (
    <div>
      <div>
        {/* Banner Section */}
        <section className="home-banner">
          <h1>Alpha-X</h1>
          <p>
            Innovation in technology isn't just about changing devices—it's
            about changing lives, creating possibilities, and crafting the
            future. 🚀
          </p>
        </section>
      </div>

      <div className="home-container">
        {/* API & Quotes Section */}
        <section className="api-quotes">
          <div className="api-status">Health Status: {healthStatus}</div>
          <div className="quote">
            "Technology is best when it brings people together." - Matt
            Mullenweg
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects">
          <h2>Our Projects</h2>
          <div className="project-cards">
            <div className="project-card">
              <h3>Project 1: Task Tracker</h3>
              <p>
                A powerful tool to keep track of your daily tasks and improve
                productivity.
              </p>
            </div>
            <div className="project-card">
              <h3>Project 2: AI Chatbot</h3>
              <p>
                An advanced AI chatbot that can converse with you on any topic
                and provide assistance.
              </p>
            </div>
            <div className="project-card">
              <h3>Project 3: E-Commerce Platform</h3>
              <p>
                A seamless e-commerce platform to enhance your online shopping
                experience.
              </p>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="about-us">
          <h2>About Us</h2>
          <p>
            We are a passionate team dedicated to building innovative solutions
            that enhance productivity and improve lives. Our mission is to
            bridge the gap between technology and human interaction, making the
            digital world more accessible and beneficial to everyone. Together,
            we strive to create a future where technology empowers individuals
            and communities to achieve their full potential.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
