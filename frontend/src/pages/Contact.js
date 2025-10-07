import React from "react";
import "../styles/contact.css"; // Ensure this path matches your folder structure

export default function Contact() {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-section">
        <p className="contact-text">
          We'd love to hear from you! Whether it's feedback, a question, or a suggestion,
          feel free to reach out to us.
        </p>

        <form className="contact-form">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="6" placeholder="Your Message" required></textarea>
          <button type="submit" className="btn-submit">Send Message</button>
        </form>
      </div>

      <div className="contact-section">
        <h3 className="contact-question">Our Contact Information</h3>
        <p className="contact-text">
          📍 Address: 8-1-87 Hyderabad<br />
          📞 Phone: +91 6309577434<br />
          ✉ Email: support@placementapp.com
        </p>
      </div>
    </div>
  );
}
