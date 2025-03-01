const express = require("express");
const router = express.Router();
const buysController = require("../controllers/buysController");

router.post("/", buysController.createBuysRelationship);
router.get("/", buysController.getAllBuysRelationships);
router.put("/", buysController.updateBuysRelationship);
router.delete("/", buysController.deleteBuysRelationship);
router.put("/change", buysController.changeCakeInBuysRelationship);

module.exports = router;
