const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceSchema = new Schema ({
 employeeId: Schema.Types.ObjectId,
 createdAt: Date,
 status: String,
 checkInTime: Date,
 checkoutTime: Date,
 duration: String,


});
module.exports = mongoose.model('Attendance', AttendanceSchema);
const Attendance = (module.exports = mongoose.model("Attendance", AttendanceSchema));

 