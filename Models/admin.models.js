const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    password: String,
    token: String,
    createdAt: Date,
});

const Admin = (module.exports = mongoose.model("Admin", adminSchema));