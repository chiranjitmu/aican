const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/create", verifyToken, studentController.createStudent);
router.get("/getmaleandfemale/:userId/:className", studentController.getMaleAndFemaleAnalytics);

module.exports = router;
