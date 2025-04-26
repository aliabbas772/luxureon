import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ name, email, message, subject }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setSubject("");
      } else {
        console.error("Server error:", result);
        alert(`Failed to send message: ${result.detail || JSON.stringify(result)}`);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Error sending message. Please check your connection and try again.");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 20px",
          backgroundColor: "#343a40",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1 className="display-4">Get in Touch with Us</h1>
        <p className="lead">
          We'd love to hear from you! Whether you have questions or just want to
          say hello, reach out to us.
        </p>
      </section>

      {/* Contact Form */}
      <section
        style={{
          padding: "60px 20px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h2 className="text-center mb-5">Contact Us</h2>
        <form
          className="mx-auto"
          style={{ maxWidth: "600px" }}
          onSubmit={handleContactSubmit}
        >
          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="subject"
              className="form-control"
              id="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-warning w-100 py-3">
            Send Message
          </button>
        </form>
      </section>

      {/* Our Location & Map Section */}
      <section style={{ padding: "60px 20px", backgroundColor: "#e9ecef" }}>
        <h2 className="text-center mb-5">Our Location</h2>
        <div className="container text-center">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.9685626592875!2d3.4035094749309774!3d6.453779095973506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c6d926a2fd5%3A0xe90f2f4b6a86bcb4!2sSandgrouse%20Market%2C%20Lewis%20St%2C%20Lagos%20Island!5e0!3m2!1sen!2sng!4v1702734511023!5m2!1sen!2sng"
            width="100%"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </section>

      {/* Contact Details & Social Media */}
      <section style={{ padding: "60px 20px", backgroundColor: "#fff" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <h4>Phone</h4>
              <a href="tel:+91xxxxxxxxxx" className="d-block">
                (+91) xxxxxxxxxx
              </a>
            </div>
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <h4>Email</h4>
              <a href="mailto:contact@luxureon.com" className="d-block">
                luxureon@gmail.com
              </a>
            </div>
            <div className="col-md-4 text-center">
              <h4>Follow Us</h4>
              <div>
                <a
                  href="#"
                  className="btn btn-outline-warning mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/luxureon"
                  className="btn btn-outline-warning mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="btn btn-outline-warning mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: "60px 20px", backgroundColor: "#f8f9fa" }}>
        <h2 className="text-center mb-5">Frequently Asked Questions</h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              How long does it take to receive my order?
            </Accordion.Header>
            <Accordion.Body>
              Our typical turnaround time is 7-14 business days.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Can I provide my own design?</Accordion.Header>
            <Accordion.Body>
              Yes, absolutely! You can upload your design description during the
              order process.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              What if the outfit doesn’t fit perfectly?
            </Accordion.Header>
            <Accordion.Body>
              We offer free alterations to ensure your complete satisfaction.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Do you offer delivery to all locations in Nigeria?
            </Accordion.Header>
            <Accordion.Body>
              Yes, we deliver to all locations across Nigeria. Delivery times
              may vary depending on your location.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>What materials do you use?</Accordion.Header>
            <Accordion.Body>
              We use a wide variety of high-quality materials to ensure comfort
              and style. You can specify your preferred fabric when placing an
              order.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </div>
  );
};

export default ContactPage;
