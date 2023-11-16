import React, { useState, useEffect } from "react";

function ExampleComponent() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    setData(data);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleSave = (updatedItem) => {
    const updatedData = data.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setData(updatedData);
    setEditModalOpen(false);
  };

  return (
    <div>
      <h1>Example Component</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => handleEdit(item)}>Edit</button>
          </li>
        ))}
      </ul>
      {editModalOpen && (
        <EditModal
          item={selectedItem}
          onSave={handleSave}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
}

function EditModal({ item, onSave, onClose }) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const handleSave = () => {
    onSave({ ...item, name, description });
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default ExampleComponent;
