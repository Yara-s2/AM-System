
const express = require("express");
const router = express.Router();
const employee = require("../../controller/employee");

router.post("/checkin", employee.checkIn);
router.post("/checkout", employee.checkOut);
module.exports = router
