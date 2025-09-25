import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/items");
    setItems(res.data);
  };

  const addItem = async () => {
    if (!newItem.trim()) return;

    if (editId) {
      await axios.put(`http://localhost:5000/items/${editId}`, { name: newItem });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/items", { name: newItem });
    }

    setNewItem("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchItems();
  };

  const editItem = (item) => {
    setNewItem(item.name);
    setEditId(item.id);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>🛒 Shopping List</h1>
      <input
        type="text"
        placeholder="Enter item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>{editId ? "Update" : "Add"}</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ margin: "10px 0" }}>
            {item.name}
            <button onClick={() => editItem(item)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
            <button
              onClick={() => deleteItem(item.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
