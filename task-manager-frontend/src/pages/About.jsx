import React from "react";
import "../styles/pages/about.css"; // External CSS
import bannerImage from "../assets/about-banner.jpg"; // Add a suitable banner image
import image1 from "../assets/ai-innovation.jpg";
import image2 from "../assets/next-gen-solution.jpg";
import image3 from "../assets/mission-vision.jpg";
import image4 from "../assets/expert-team.jpg";
import image5 from "../assets/innovation-excellence.jpg";

const About = () => {
  const sections = [
    {
      title: "AI & Innovation",
      text: "At Alpha-X, we leverage the power of Artificial Intelligence to create intelligent, adaptive, and data-driven solutions. Our AI-driven innovations enhance automation, optimize processes, and unlock new possibilities across industries, ensuring businesses stay ahead in the digital age.",
      image: image1,
    },
    {
      title: "Next-Gen Solutions",
      text: "We are at the forefront of technological advancements, developing next-generation solutions that integrate cloud computing, big data analytics, and machine learning. Our cutting-edge technologies help businesses drive efficiency, improve scalability, and deliver seamless digital experiences.",
      image: image2,
    },
    {
      title: "Mission & Vision",
      text: "Our mission is to revolutionize industries by pushing the boundaries of technology and transforming innovative ideas into real-world solutions. We envision a future where technology empowers businesses and individuals, creating a smarter, more connected world driven by intelligent systems.",
      image: image3,
    },
    {
      title: "Expert Team",
      text: "Alpha-X is powered by a team of forward-thinking experts with deep expertise in AI, cloud computing, and software engineering. Our professionals collaborate to design, develop, and implement transformative solutions tailored to meet the evolving demands of global industries.",
      image: image4,
    },
    {
      title: "Innovation & Excellence",
      text: "At Alpha-X, we believe in a culture of continuous innovation and excellence. Our commitment to research, development, and cutting-edge technology ensures that we deliver future-ready solutions. With a focus on quality and impact, we strive to redefine technological boundaries and set new industry standards. 🚀",
      image: image5,
    },
  ];

  return (
    <div>
      {/* Banner Section */}
      <div className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="banner-overlay"></div>
        <h1 className="banner-text">Welcome to Alpha-X</h1> {/* Change text here */}
      </div>

      <div className="container pt-2 mt-5">
        {sections.map((section, index) => (
          <div
            className={`row align-items-center my-4 ${
              index % 2 === 0 ? "" : "flex-row-reverse"
            }`}
            key={index}
          >
            <div className="col-md-4">
              <img
                src={section.image}
                alt={section.title}
                className="img-fluid about-image"
              />
            </div>
            <div className="col-md-8">
              <h3 className="section-title">{section.title}</h3>
              <p className="section-text">{section.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
