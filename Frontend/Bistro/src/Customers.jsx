// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Customers = () => {
//   const [customers, setCustomers] = useState([]);
//   const [formData, setFormData] = useState({ id: "", name: "", email: "" });
//   const [editingId, setEditingId] = useState(null);

//   const API_URL = "http://localhost:5000/customers"; // Update if needed

//   // 🟢 Fetch Customers
//   const fetchCustomers = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setCustomers(response.data);
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   // 🟢 Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🟢 Add or Update Customer
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         // Update Customer
//         await axios.put(`${API_URL}/${editingId}`, formData);
//       } else {
//         // Create Customer
//         await axios.post(API_URL, formData);
//       }
//       fetchCustomers();
//       setFormData({ id: "", name: "", email: "" });
//       setEditingId(null);
//     } catch (error) {
//       console.error("Error saving customer:", error);
//     }
//   };

//   // 🟢 Edit Customer
//   const handleEdit = (customer) => {
//     setFormData({ id: customer.id, name: customer.name, email: customer.email });
//     setEditingId(customer.id);
//   };

//   // 🟢 Delete Customer
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchCustomers();
//     } catch (error) {
//       console.error("Error deleting customer:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Customer Management</h2>

//       {/* 🟢 Form for Adding/Updating Customer */}
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleChange} required />
//         <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <button type="submit">{editingId ? "Update Customer" : "Add Customer"}</button>
//       </form>

//       {/* 🟢 Display Customers */}
//       {/* <ul>
//         {customers.map((customer) => (
//           <li key={customer.id}>
//             {customer.id} {customer.name} ({customer.email})
//             <button onClick={() => handleEdit(customer)}>Edit</button>
//             <button onClick={() => handleDelete(customer.id)}>Delete</button>
//           </li>
//         ))}
//       </ul> */}
//     <ul>
//   {customers.map((customer) => (
//     <li key={customer.id}>
//       <strong>ID:</strong> {customer.id} <br />
//       {customer.name} <br />
//       {customer.email} <br />
//       <button onClick={() => handleEdit(customer)}>Edit</button>
//       <button onClick={() => handleDelete(customer.id)}>Delete</button>
//     </li>
//     ))}
//     </ul>

//     </div>
//   );
// };

// export default Customers;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./customers.css"; // Import the CSS file

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/customers"; // Update if needed

  // 🟢 Fetch Customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 🟢 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟢 Add or Update Customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update Customer
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        // Create Customer
        await axios.post(API_URL, formData);
      }
      fetchCustomers();
      setFormData({ id: "", name: "", email: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  // 🟢 Edit Customer
  const handleEdit = (customer) => {
    setFormData({ id: customer.id, name: customer.name, email: customer.email });
    setEditingId(customer.id);
  };

  // 🟢 Delete Customer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="customers-container">
      <h2>Customer Management</h2>

      {/* 🟢 Form for Adding/Updating Customer */}
      <form className="customer-form" onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update Customer" : "Add Customer"}</button>
      </form>

      {/* 🟢 Customer Cards */}
      <div className="customer-grid">
        {customers.map((customer) => (
          <div key={customer.id} className="customer-card">
            <h4>{customer.name}</h4>
            <p><strong>ID:</strong> {customer.id}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(customer)}>Edit</button>
              <button onClick={() => handleDelete(customer.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
