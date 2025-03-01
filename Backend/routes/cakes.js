const express = require("express");
const router = express.Router();
const cakeController = require("../controllers/cakeController");

router.get("/", cakeController.getAllCakes);
router.post("/", cakeController.createCake);
router.put("/:id",cakeController.updateCake);
router.delete("/:id",cakeController.deleteCake);
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { getAllCakes, createCake, updateCake, deleteCake } = require("../controllers/cakeController");

// router.get("/", getAllCakes);
// router.post("/", createCake);
// router.put("/:id", updateCake);
// router.delete("/:id", deleteCake);

// module.exports = router;


