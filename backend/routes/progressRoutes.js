const express = require("express");
const router = express.Router();

const { markComplete, getProgress } = require("../controllers/progressController");

router.post("/", markComplete);
router.get("/:userId", getProgress);

module.exports = router;