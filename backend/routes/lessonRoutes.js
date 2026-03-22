const express = require("express");
const router = express.Router();

const { addLesson, getLessons } = require("../controllers/lessonController");

router.post("/", addLesson);
router.get("/:courseId", getLessons);

module.exports = router;