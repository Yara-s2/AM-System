const employee = require("../../Models/employee.models");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const attendance = require("../../Models/Attendance.models");

module.exports.checkIn = async (req, res) => {
  try {
    const employeeId = req.body.employeeId;
    const findEmployee = await employee.findOne({ _id: employeeId });
    if (findEmployee) {
      const employeeAlreadyCheckedIn = await attendance.findOne({
        employeeId: employeeId,
        status: "CHECKIN",
      });
      if (employeeAlreadyCheckedIn) {
        return res.status(400).send("Employee already checked in");
      } else {
        const data = {
          employeeId: req.body.employeeId,
          createdAt: new Date(),
          status: "CHECKIN",
          checkInTime: new Date(),
        };
        const newAttendance = new attendance(data);
        await newAttendance.save();
        return res.status(200).send("Employee is found");
      }
    } else {
      return res.status(400).send({ message: "Employee not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

//the other function
module.exports.checkOut = async (req, res) => {
  try {
    const employeeId = req.body.employeeId;
    const findEmployee = await employee.findOne({ _id: employeeId });

    if (!findEmployee) {
      return res.status(400).send("Employee not found");
    }

    const attendanceRecord = await attendance.findOne({
      employeeId: employeeId,
      status: "CHECKIN",
    });

    if (!attendanceRecord) {
      return res.status(400).send("No check-in found for this employee");
    }

    const checkOutTime = new Date();
    const checkInTime = attendanceRecord.checkInTime;
    const durationInMilliseconds = checkOutTime - checkInTime;
    const millisecondsInOneSecond = 1000;
    const millisecondsInOneMinute = millisecondsInOneSecond * 60;
    const millisecondsInOneHour = millisecondsInOneMinute * 60;
    const millisecondsInOneDay = millisecondsInOneHour * 24;
    const days = Math.floor(durationInMilliseconds / millisecondsInOneDay);
    const hours = Math.floor(
      (durationInMilliseconds % millisecondsInOneDay) / millisecondsInOneHour
    );
    const minutes = Math.floor(
      (durationInMilliseconds % millisecondsInOneHour) / millisecondsInOneMinute
    );
    const seconds = Math.floor(
      (durationInMilliseconds % millisecondsInOneMinute) /
        millisecondsInOneSecond
    );
    console.log(
      `Duration: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    );
    const duration = `Duration: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    await attendance.findOneAndUpdate(
      { _id: attendanceRecord._id },
      {
        status: "CHECKOUT",
        checkoutTime: checkOutTime,
        duration: duration + " minutes",
      }
    );
    return res.status(200).send("Check-out successful");
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
};
