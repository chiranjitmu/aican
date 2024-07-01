const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get("/expenses/monthly", analyticsController.getMonthlyExpenses);
router.get("/expenses/yearly", analyticsController.getYearlyExpenses);

module.exports = router;
