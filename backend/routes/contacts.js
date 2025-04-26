const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // If not installed, run: npm install node-fetch

router.post("/", async (req, res) => {
  const { name, email, message, subject } = req.body;

  // Your EmailJS credentials
  const serviceID = process.env.EMAILJS_SERVICE_ID;
  const templateID = process.env.EMAILJS_TEMPLATE_ID2;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  console.log("Service ID:", serviceID);
  console.log("Template ID:", templateID);
  console.log("Public Key:", publicKey);
  console.log("Request Body:", req.body);
  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceID,
          template_id: templateID,
          user_id: publicKey, // This is the public key
          accessToken: process.env.EMAILJS_PRIVATE_KEY,  
          template_params: {
            to_name: "Recipient",
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
          },
        }),
      }
    );
    console.log("Response from EmailJS:", response);
    if (response.ok) {
      res.status(200).json({ message: "Message sent successfully!" });
    } else {
      const errorData = await response.json();
      console.error("EmailJS Error:", errorData);
      res.status(500).json({ message: "Failed to send message." });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});

module.exports = router;
