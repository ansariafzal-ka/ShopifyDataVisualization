const express = require("express");
const router = express.Router();
const analyticsControllers = require("../controllers/analytics.controllers");

router.get("/total-sales", analyticsControllers.getAggregateSales);
router.get("/sales-growth-rate", analyticsControllers.getSalesGrowthRate);
router.get("/new-customers", analyticsControllers.getNewCustomersOverTime);
router.get("/repeat-customers", analyticsControllers.getRepeatCustomers);
router.get(
  "/geographical-distribution",
  analyticsControllers.getGeographicalDistribution
);
router.get(
  "/customer-lifetime-value",
  analyticsControllers.getCustomerLifetimeValueByCohort
);
module.exports = router;
