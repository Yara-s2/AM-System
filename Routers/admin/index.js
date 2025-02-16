const express = require("express");
const router = express.Router();
const admin = require("../../controller/admin");
const validation = require("../../Middleware/validation");
const { check } = require("../../Middleware");

router.get("/getemployee", admin.getEmployee);
router.put("/updateemployee/:id", admin.updateEmployee);

router.post("/signup", validation.validateSignupAPI, check, admin.signup);

router.post("/login", validation.validateLoginAPI, check, admin.login);

router.post("/updateEmployee", validation.validateupdateEmployeeAPI, check,admin.updateEmployee);

router.post("/deleteemployee", validation.validatedeleteemployeeAPI, check, admin,deleteemployee);

router.post("/addemployee", validation.validateaddemployeeAPI, check, admin.addemployee);

router.post("/addemployee", admin.addemployee);
router.delete("/deleteemployee", admin.deleteemployee);
router.get("/getemployeeattendan", admin.getAllEmployeeAttendances);

module.exports = router