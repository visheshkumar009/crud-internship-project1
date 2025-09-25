const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: "Milk" },
  { id: 2, name: "Bread" },
];

// GET all items
app.get("/items", (req, res) => {
  res.json(items);
});

// ADD item
app.post("/items", (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.json(newItem);
});

// UPDATE item
app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  items = items.map((item) =>
    item.id == id ? { ...item, name } : item
  );
  res.json({ success: true });
});

// DELETE item
app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id != id);
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
