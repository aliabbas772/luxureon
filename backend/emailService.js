// // mailer.js
// require("dotenv").config();
// const emailjs = require("emailjs-com");

// // Initialize EmailJS
// emailjs.init(process.env.VITE_EMAILJS_PUBLIC_KEY); // or use directly in the function calls

// /**
//  * Send a generic “contact us” email using EmailJS
//  * @param {{ name: string, email: string, subject: string, message: string }} data
//  */
// async function sendContactEmail(data) {
//   const templateParams = {
//     from_name: data.name,
//     from_email: data.email,
//     subject: data.subject || "New Contact Message",
//     message: data.message,
//     to_email: process.env.NOTIFICATION_EMAIL,
//   };

//   const result = await emailjs.send(
//     process.env.VITE_EMAILJS_SERVICE_ID,
//     process.env.VITE_EMAILJS_TEMPLATE_ID,
//     templateParams,
//     process.env.VITE_EMAILJS_PUBLIC_KEY
//   );

//   console.log("✔ Contact email sent:", result.status);
//   return result;
// }

// /**
//  * Notify admin and user about a new order using EmailJS
//  * @param {object} Order
//  */
// async function sendOrderNotification(Order) {
//   try {
//     // Admin notification
//     const adminParams = {
//       order_id: Order._id,
//       customer_name: Order.customerName,
//       customer_email: Order.email,
//       to_email: process.env.NOTIFICATION_EMAIL,
//     };

//     const adminInfo = await emailjs.send(
//       process.env.VITE_EMAILJS_SERVICE_ID,
//       process.env.VITE_EMAILJS_TEMPLATE_ID,
//       adminParams,
//       process.env.VITE_EMAILJS_PUBLIC_KEY
//     );

//     console.log("✔ Notification email sent to admin:", adminInfo.status);

//     // User confirmation
//     const userParams = {
//       order_id: Order._id,
//       customer_name: Order.customerName,
//       customer_email: Order.email,
//       fabric_details: Order.fabricDetails,
//       measurements: Order.measurements,
//       additional_notes: Order.additionalNotes,
//       to_email: Order.email,
//     };

//     const userInfo = await emailjs.send(
//       process.env.VITE_EMAILJS_SERVICE_ID,
//       process.env.VITE_EMAILJS_TEMPLATE_ID,
//       userParams,
//       process.env.VITE_EMAILJS_PUBLIC_KEY
//     );

//     console.log("✔ Acknowledgment email sent to user:", userInfo.status);
//   } catch (error) {
//     console.error("Error sending order notification:", error);
//     throw error;
//   }
// }

// /**
//  * Send a password reset confirmation email
//  * @param {object} user
//  */
// async function sendPasswordResetEmail(user) {
//   try {
//     const params = {
//       customer_name: user.customerName || user,
//       to_email: user.email,
//     };

//     const info = await emailjs.send(
//       process.env.VITE_EMAILJS_SERVICE_ID,
//       process.env.VITE_EMAILJS_TEMPLATE_ID,
//       params,
//       process.env.VITE_EMAILJS_PUBLIC_KEY
//     );

//     console.log("✔ Password change email sent:", info.status);
//     return info;
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw error;
//   }
// }

// module.exports = {
//   sendContactEmail,
//   sendOrderNotification,
//   sendPasswordResetEmail,
// };
// emailService.js

require("dotenv").config();

/**
 * Send a generic “contact us” email (without EmailJS, placeholder for future use)
 * @param {{ name: string, email: string, subject: string, message: string }} data
 */
async function sendContactEmail(data) {
  console.log("Contact email would be sent with data:", data);
  return { status: "Placeholder - EmailJS removed" };
}

/**
 * Notify admin and user about a new order (without EmailJS, placeholder)
 * @param {object} Order
 */
async function sendOrderNotification(Order) {
  console.log("Order notification would be sent for:", Order);
  return { status: "Placeholder - EmailJS removed" };
}

/**
 * Send a password reset confirmation email (without EmailJS, placeholder)
 * @param {object} user
 */
async function sendPasswordResetEmail(user) {
  console.log("Password reset email would be sent for:", user);
  return { status: "Placeholder - EmailJS removed" };
}

module.exports = {
  sendContactEmail,
  sendOrderNotification,
  sendPasswordResetEmail,
};
