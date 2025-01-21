const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    gender: String,
    nationalty: String,
    phone_Number: String,
    position: String,
    createdAt: Date,
});

const Employee= (module.exports = mongoose.model("Employee", employeeSchema));



