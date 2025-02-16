import React from "react";
import "../styles/general.css";

const ContactPage = () => {
  return (
    <div className="contact-container d-flex align-items-center justify-content-center">
      <div className="position-relative contact-image-container">
        <img src="/src/assets/contact-us.jpg" alt="Contact Background" className="contact-image" />
        <div className="contact-form-overlay p-4">
          <h2 className="contact-title text-light text-center">Connect with Us</h2>
          <form>
            <div className="mb-3">
              <label className="form-label text-light">Full Name</label>
              <input type="text" placeholder="Your Name" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">E-mail</label>
              <input type="email" placeholder="Your Email" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Message</label>
              <textarea placeholder="Your Message" className="form-control"></textarea>
            </div>
            <button type="submit" className="btn btn-light w-100">Send</button>
          </form>

          {/* Contact Info */}
          <div className="contact-info mt-4 text-center text-light">
            <p><strong>Contact:</strong> +91 99999 xxxxx</p>
            <p><strong>E-mail:</strong> alphax_xxxxx@gmail.com</p>
            <p><strong>Based in:</strong> New Delhi, India</p>
          </div>

          {/* Social Media Links */}
          <div className="social-links mt-3 text-center">
            <i className="fab fa-facebook me-3 text-light"></i>
            <i className="fab fa-instagram me-3 text-light"></i>
            <i className="fab fa-twitter text-light"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 