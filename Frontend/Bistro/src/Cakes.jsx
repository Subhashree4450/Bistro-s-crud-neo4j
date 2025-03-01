import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cakes.css";

const Cakes = () => {
  const [cakes, setCakes] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    weight: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCakes();
  }, []);

  const fetchCakes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cakes");
      setCakes(response.data);
    } catch (error) {
      console.error("Error fetching cakes:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/cakes/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:5000/cakes", formData);
      }
      resetForm();
      fetchCakes();
    } catch (error) {
      console.error("Error saving cake:", error);
    }
  };

  const handleEdit = (cake) => {
    setEditingId(cake.id);
    setFormData({
      id: cake.id,
      name: cake.name,
      price: cake.price,
      weight: cake.weight,
      description: cake.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cakes/${id}`);
      fetchCakes();
    } catch (error) {
      console.error("Error deleting cake:", error);
    }
  };

  const resetForm = () => {
    setFormData({ id: "", name: "", price: "", weight: "", description: "" });
    setEditingId(null);
  };

  return (
    <div className="cakes-container">
      <h2>Cakes Management</h2>

      <form onSubmit={handleSubmit} className="cakes-form">
        <div className="form-group">
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
            required
            disabled={editingId}
          />
          <input
            type="text"
            name="name"
            placeholder="Cake Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="add-button">
          {editingId ? "Update Cake" : "Add Cake"}
        </button>
      </form>

      <h3>All Cakes</h3>
      <div className="cakes-grid">
        {cakes.map((cake) => (
          <div key={cake.id} className="cake-card">
            <h4>{cake.id}:{cake.name}</h4>
            <p>{cake.description}</p>
            <p>Rs.{cake.price}</p>
            <p>{cake.weight}g</p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(cake)}>Edit</button>
              <button onClick={() => handleDelete(cake.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cakes;

