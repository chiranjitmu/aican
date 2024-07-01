const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/create", verifyToken, teacherController.createTeacher);
router.get("/getanalytics/:page", teacherController.getTeacher);
router.delete("/delete/:Id", verifyToken, teacherController.deleteTeacher);
router.put("/update/:id", verifyToken, teacherController.updateTeacher);

module.exports = router;
