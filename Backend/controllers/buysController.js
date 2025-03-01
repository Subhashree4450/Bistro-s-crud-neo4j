const { session } = require("../config/neo4j");

// Create "BUYS" relationship
const createBuysRelationship = async (req, res) => {
  const { customerId, cakeId, quantity } = req.body;
  try {
    await session.run(
      "MATCH (c:Customer {id: $customerId}), (k:Cake {id: $cakeId}) CREATE (c)-[:BUYS {quantity: $quantity}]->(k)",
      { customerId, cakeId, quantity }
    );
    res.status(201).json({ message: "BUYS relationship created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get all "BUYS" relationships
const getAllBuysRelationships = async (req, res) => {
  try {
    const result = await session.run("MATCH (c:Customer)-[b:BUYS]->(k:Cake) RETURN c, b, k");
    const buys = result.records.map(record => ({
      customer: record.get("c").properties,
      cake: record.get("k").properties,
      buys: record.get("b").properties,
    }));
    res.json(buys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update "BUYS" relationship
const updateBuysRelationship = async (req, res) => {
  const { customerId, cakeId, newQuantity } = req.body;
  try {
    await session.run(
      "MATCH (c:Customer {id: $customerId})-[b:BUYS]->(k:Cake {id: $cakeId}) SET b.quantity = $newQuantity",
      { customerId, cakeId, newQuantity }
    );
    res.json({ message: "BUYS relationship updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Delete "BUYS" relationship
const deleteBuysRelationship = async (req, res) => {
  const { customerId, cakeId } = req.body;
  try {
    await session.run(
      "MATCH (c:Customer {id: $customerId})-[b:BUYS]->(k:Cake {id: $cakeId}) DELETE b",
      { customerId, cakeId }
    );
    res.json({ message: "BUYS relationship deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeCakeInBuysRelationship = async (req, res) => {
  const { customerId, oldCakeId, newCakeId, quantity } = req.body;
  
  try {
    const tx = session.beginTransaction();

    // Delete the existing BUYS relationship
    await tx.run(
      "MATCH (c:Customer {id: $customerId})-[b:BUYS]->(k:Cake {id: $oldCakeId}) DELETE b",
      { customerId, oldCakeId }
    );

    // Create a new BUYS relationship with the new cake
    await tx.run(
      "MATCH (c:Customer {id: $customerId}), (k:Cake {id: $newCakeId}) CREATE (c)-[:BUYS {quantity: $quantity}]->(k)",
      { customerId, newCakeId, quantity }
    );

    await tx.commit();
    res.json({ message: "BUYS relationship updated with new cake" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createBuysRelationship,
  getAllBuysRelationships,
  updateBuysRelationship,
  deleteBuysRelationship,
  changeCakeInBuysRelationship,
};
