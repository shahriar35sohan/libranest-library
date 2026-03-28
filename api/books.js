// api/books.js  — Vercel Serverless Function
// Handles: GET /api/books, GET /api/books?category=fiction, GET /api/books?q=sapiens

const books = [
  { id: 1,  title: "Lalsalu",                 author: "Syed Waliullah",       category: "bangla",  available: true,  copies: 2 },
  { id: 2,  title: "Padma Nadir Majhi",        author: "Manik Bandopadhyay",   category: "bangla",  available: true,  copies: 1 },
  { id: 3,  title: "A Brief History of Time",  author: "Stephen Hawking",      category: "science", available: true,  copies: 3 },
  { id: 4,  title: "Sapiens",                  author: "Yuval Noah Harari",    category: "history", available: false, copies: 0 },
  { id: 5,  title: "The Alchemist",            author: "Paulo Coelho",         category: "fiction", available: true,  copies: 2 },
  { id: 6,  title: "Feynman Lectures",         author: "Richard Feynman",      category: "science", available: true,  copies: 1 },
  { id: 7,  title: "1984",                     author: "George Orwell",        category: "fiction", available: false, copies: 0 },
  { id: 8,  title: "Bibek-Ananda",             author: "Rabindranath Tagore",  category: "bangla",  available: true,  copies: 2 },
  { id: 9,  title: "Guns, Germs & Steel",      author: "Jared Diamond",        category: "history", available: true,  copies: 1 },
  { id: 10, title: "Brave New World",           author: "Aldous Huxley",        category: "fiction", available: true,  copies: 1 },
  { id: 11, title: "The Origin of Species",    author: "Charles Darwin",       category: "science", available: false, copies: 0 },
  { id: 12, title: "Muktijoddhar Golpo",       author: "Humayun Ahmed",        category: "bangla",  available: true,  copies: 3 },
];

module.exports = (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")     return res.status(405).json({ error: "Method not allowed" });

  let result = [...books];

  const { q, category, available } = req.query;

  if (q) {
    const query = q.toLowerCase();
    result = result.filter(b =>
      b.title.toLowerCase().includes(query) ||
      b.author.toLowerCase().includes(query)
    );
  }
  if (category && category !== "all") {
    result = result.filter(b => b.category === category);
  }
  if (available === "true") {
    result = result.filter(b => b.available);
  }

  return res.status(200).json({
    total: result.length,
    books: result,
  });
};

