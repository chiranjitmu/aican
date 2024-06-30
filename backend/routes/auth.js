const express = require("express");
const router = express.Router();
const authController = require("../controllers/user");

router.post("/login", authController.login);

module.exports = router;