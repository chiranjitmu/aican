const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/create", verifyToken, teacherController.createTeacher);

module.exports = router;
