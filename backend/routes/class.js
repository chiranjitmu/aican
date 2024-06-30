const express = require("express");
const router = express.Router();
const classController = require("../controllers/class");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/create", classController.createClass);
router.get("/getanalytics/:userId/:page", classController.getClass);
router.delete("/delete/:Id", verifyToken, classController.deleteClass);

module.exports = router;
