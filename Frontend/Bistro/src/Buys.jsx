import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Buys.css";

const Buys = () => {
  const [cakes, setCakes] = useState([]);
  const [buys, setBuys] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [selectedCake, setSelectedCake] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [editing, setEditing] = useState(null);
  const [oldCakeId, setOldCakeId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Modal state

  useEffect(() => {
    fetchCakes();
    fetchBuys();
  }, []);

  const fetchCakes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cakes");
      setCakes(res.data);
    } catch (error) {
      console.error("Error fetching cakes:", error.response?.data || error.message);
    }
  };

  const fetchBuys = async () => {
    try {
      const res = await axios.get("http://localhost:5000/buys");
      setBuys(res.data);
    } catch (error) {
      console.error("Error fetching buys:", error.response?.data || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put("http://localhost:5000/buys", {
        customerId,
        cakeId: selectedCake,
        newQuantity: quantity,
      });
    } else {
      await axios.post("http://localhost:5000/buys", {
        customerId,
        cakeId: selectedCake,
        quantity,
      });
    }
    resetForm();
    fetchBuys();
  };

  const handleDelete = async (customerId, cakeId) => {
    await axios.delete("http://localhost:5000/buys", { data: { customerId, cakeId } });
    fetchBuys();
  };

  const handleChangeCake = async (e) => {
    e.preventDefault();
    await axios.put("http://localhost:5000/buys/change", {
      customerId,
      oldCakeId,
      newCakeId: selectedCake,
      quantity,
    });
    closeModal();
    fetchBuys();
  };

  const handleEdit = (buy) => {
    setCustomerId(buy.customer.id);
    setSelectedCake(buy.cake.id);
    setQuantity(buy.buys.quantity);
    setEditing(true);
  };

  const handleSelectChangeCake = (buy) => {
    setCustomerId(buy.customer.id);
    setOldCakeId(buy.cake.id);
    setSelectedCake(""); 
    setModalOpen(true);
  };

  const resetForm = () => {
    setCustomerId("");
    setSelectedCake("");
    setQuantity(1);
    setEditing(false);
    setOldCakeId(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  return (
    <div className="buys-container">
      <h2>Manage Customer Buys Cake</h2>
      
      <form onSubmit={handleSubmit} className="buys-form">
        <input
          type="text"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />

        <select value={selectedCake} onChange={(e) => setSelectedCake(e.target.value)}>
          <option value="">Select Cake</option>
          {cakes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(e.target.value)} />

        <button type="submit">{editing ? "Update Buy" : "Buy Cake"}</button>
      </form>

      <h3>Buys Relationships</h3>
      <ul className="buys-list">
        {buys.map((buy) => (
          <li key={`${buy.customer.id}-${buy.cake.id}`}>
            <span>{buy.customer.name} bought {buy.buys.quantity} {buy.cake.name}</span>
            <div className="button-group">
            <button onClick={() => handleEdit(buy)}>Edit</button>
            <button onClick={() => handleDelete(buy.customer.id, buy.cake.id)}>Delete</button>
            <button onClick={() => handleSelectChangeCake(buy)}>Change Cake</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Changing Cake */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Change Cake for Customer</h3>
            <select value={selectedCake} onChange={(e) => setSelectedCake(e.target.value)}>
              <option value="">Select New Cake</option>
              {cakes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="modal-buttons">
              <button onClick={handleChangeCake}>Confirm</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buys;
