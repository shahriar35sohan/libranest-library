// api/booking.js — Vercel Serverless Function
// Handles: POST /api/booking
// Stores submission in memory (use a DB like MongoDB Atlas / Supabase in production)

const bookings = []; // In-memory store; replace with DB in production

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") return res.status(200).end();

  // GET — list bookings (admin use)
  if (req.method === "GET") {
    return res.status(200).json({ total: bookings.length, bookings });
  }

  // POST — submit a booking
  if (req.method === "POST") {
    const { firstName, lastName, phone, email, service, datetime, notes } = req.body || {};

    // Basic validation
    if (!firstName || !lastName || !phone || !service || !datetime) {
      return res.status(400).json({
        error: "Missing required fields: firstName, lastName, phone, service, datetime"
      });
    }

    const booking = {
      id:        bookings.length + 1,
      firstName,
      lastName,
      phone,
      email:     email || null,
      service,
      datetime,
      notes:     notes || null,
      status:    "pending",
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);

    // TODO: send email notification via nodemailer / SendGrid here
    // await sendEmail({ to: "info@libranest.com.bd", booking });

    return res.status(201).json({
      success: true,
      message: "Booking received! We will confirm within 24 hours.",
      booking,
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
};

