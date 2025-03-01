const { session } = require("../config/neo4j");

// 🟢 Get all Customers
const getAllCustomers = async (req, res) => {
  try {
    const result = await session.run("MATCH (c:Customer) RETURN c");
    const customers = result.records.map(record => record.get("c").properties);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟢 Create Customer
const createCustomer = async (req, res) => {
  const { id, name, email } = req.body;
  try {
    await session.run(
      "CREATE (c:Customer {id: $id, name: $name, email: $email})", 
      { id, name, email }
    );
    res.status(201).json({ message: "Customer added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟢 Update Customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    await session.run(
      "MATCH (c:Customer {id: $id}) SET c.name = $name, c.email = $email RETURN c",
      { id, name, email }
    );
    res.json({ message: "Customer updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟢 Delete Customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await session.run("MATCH (c:Customer {id: $id}) DETACH DELETE c", { id });
    res.json({ message: "Customer deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCustomers, createCustomer, updateCustomer, deleteCustomer };
