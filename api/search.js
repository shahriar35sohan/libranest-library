// api/search.js — Vercel Serverless Function
// Handles: GET /api/search?q=sapiens

const catalog = [
  // Books
  { id:"b1",  type:"book",       title:"Lalsalu",                author:"Syed Waliullah",      category:"bangla",  available:true  },
  { id:"b2",  type:"book",       title:"Padma Nadir Majhi",       author:"Manik Bandopadhyay",  category:"bangla",  available:true  },
  { id:"b3",  type:"book",       title:"A Brief History of Time", author:"Stephen Hawking",     category:"science", available:true  },
  { id:"b4",  type:"book",       title:"Sapiens",                 author:"Yuval Noah Harari",   category:"history", available:false },
  { id:"b5",  type:"book",       title:"The Alchemist",           author:"Paulo Coelho",        category:"fiction", available:true  },
  { id:"b6",  type:"book",       title:"Feynman Lectures",        author:"Richard Feynman",     category:"science", available:true  },
  { id:"b7",  type:"book",       title:"1984",                    author:"George Orwell",       category:"fiction", available:false },
  // Stationery
  { id:"s1",  type:"stationery", title:"Notebook A4",             desc:"200-page ruled notebook",                   available:true  },
  { id:"s2",  type:"stationery", title:"Ballpoint Pen Set",       desc:"10 pens, blue & black",                     available:true  },
  { id:"s3",  type:"stationery", title:"Highlighter Set",         desc:"5-colour highlighters",                     available:true  },
  { id:"s4",  type:"stationery", title:"Geometry Box",            desc:"Full set with compass",                     available:true  },
  // Computers
  { id:"c1",  type:"computer",   title:"Computer Station 1",      desc:"Core i5, 8GB RAM, internet",                available:true  },
  { id:"c2",  type:"computer",   title:"Computer Station 2",      desc:"Core i5, 8GB RAM, internet",                available:false },
  { id:"c3",  type:"computer",   title:"Computer Station 3",      desc:"Core i7, 16GB RAM, internet",               available:true  },
  // Photocopy
  { id:"p1",  type:"photocopy",  title:"Photocopy Machine",       desc:"B&W and colour copies, scanning",           available:true  },
];

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const { q, type } = req.query;
  if (!q) return res.status(400).json({ error: "Query param `q` is required" });

  const query = q.toLowerCase();
  let results = catalog.filter(item => {
    const matchQ =
      item.title.toLowerCase().includes(query) ||
      (item.author || "").toLowerCase().includes(query) ||
      (item.desc   || "").toLowerCase().includes(query) ||
      (item.category || "").toLowerCase().includes(query);
    const matchType = !type || type === "all" || item.type === type;
    return matchQ && matchType;
  });

  return res.status(200).json({ total: results.length, results: results.slice(0, 10) });
};

