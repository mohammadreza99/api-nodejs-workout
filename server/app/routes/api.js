const router = require("express").Router();
const restaurantRoutes = require("../routes/restaurant.route");

router.use("/restaurants", restaurantRoutes);

module.exports = router;