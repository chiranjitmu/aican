const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/create", verifyToken, studentController.createStudent);
router.get("/getmaleandfemale/:className", studentController.getMaleAndFemaleAnalytics);
router.get("/getanalytics/:page", studentController.getStudent);
router.delete("/delete/:Id", verifyToken, studentController.deleteStudent);
router.put("/update/:id", verifyToken, studentController.updateStudent);

module.exports = router;
