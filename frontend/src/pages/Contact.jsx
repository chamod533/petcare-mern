import React, { useState } from "react";
import API from "../api/api";
import "./Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await API.post("/contact", { name, email, message });
      alert("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      alert("Error sending message");
    }
  };

  return (
    <div className="container py-5">
      <div className="contact-container">

        <h2 className="contact-title">Contact Us</h2>

        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Your Name"
            className="contact-input mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="contact-input mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            rows="5"
            placeholder="Message..."
            className="contact-input mb-3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button className="contact-btn">Send Message</button>
        </form>

      </div>
    </div>
  );
}
