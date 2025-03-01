

const { session } = require("../config/neo4j");

//  Get all cakes
const getAllCakes = async (req, res) => {
  try {
    const result = await session.run("MATCH (c:Cake) RETURN c");
    const cakes = result.records.map(record => record.get("c").properties);
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get a single cake by ID
const getCakeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await session.run("MATCH (c:Cake {id: $id}) RETURN c", { id });
    if (result.records.length === 0) {
      return res.status(404).json({ message: "Cake not found" });
    }
    res.json(result.records[0].get("c").properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Create a new cake
const createCake = async (req, res) => {
  const { id, name, price, weight, description } = req.body;
  try {
    await session.run(
      "CREATE (c:Cake {id: $id, name: $name, price: $price, weight: $weight, description: $description})",
      { id, name, price, weight, description }
    );
    res.status(201).json({ message: "Cake created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Update a cake
const updateCake = async (req, res) => {
  const { id } = req.params;
  const { name, price, weight, description } = req.body;
  try {
    const result = await session.run(
      "MATCH (c:Cake {id: $id}) SET c.name = $name, c.price = $price, c.weight = $weight, c.description = $description RETURN c",
      { id, name, price, weight, description }
    );
    if (result.records.length === 0) {
      return res.status(404).json({ message: "Cake not found" });
    }
    res.json({ message: "Cake updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Delete a cake
const deleteCake = async (req, res) => {
  const { id } = req.params;
  try {
    await session.run("MATCH (c:Cake {id: $id}) DETACH DELETE c", { id });
    res.json({ message: "Cake deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCakes, getCakeById, createCake, updateCake, deleteCake };


// const { session } = require("../config/neo4j");

// // 🟢 Get all Cakes
// const getAllCakes = async (req, res) => {
//   try {
//     const result = await session.run("MATCH (c:Cake) RETURN c");
//     const cakes = result.records.map(record => record.get("c").properties);
//     res.json(cakes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 🟢 Create Cake
// const createCake = async (req, res) => {
//   const { id, name, price } = req.body;
//   try {
//     await session.run("CREATE (c:Cake {id: $id, name: $name, price: $price})", 
//       { id, name, price }
//     );
//     res.status(201).json({ message: "Cake added successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 🟢 Update Cake
// const updateCake = async (req, res) => {
//   const { id } = req.params;
//   const { name, price } = req.body;
//   try {
//     await session.run(
//       "MATCH (c:Cake {id: $id}) SET c.name = $name, c.price = $price RETURN c",
//       { id, name, price }
//     );
//     res.json({ message: "Cake updated successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 🟢 Delete Cake
// const deleteCake = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await session.run("MATCH (c:Cake {id: $id}) DETACH DELETE c", { id });
//     res.json({ message: "Cake deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { getAllCakes, createCake, updateCake, deleteCake };

