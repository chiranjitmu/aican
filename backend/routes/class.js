const express = require("express");
const router = express.Router();
const classController = require("../controllers/class");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/create", verifyToken, classController.createClass);
router.get("/getanalytics/:page", classController.getClass);
router.delete("/delete/:Id", verifyToken, classController.deleteClass);
router.put("/update/:id", verifyToken, classController.updateClass);

module.exports = router;
