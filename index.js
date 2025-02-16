const express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const admin = require('./Models/admin.models');
const employee = require('./Models/employee.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const {MONGO_URL} = process.env;
// console.log("MONGO_URL", MONGO_URL)
const MONGO_URL = "mongodb+srv://myUserAdmin:mySecurePassword123@cluster0.toval.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express()
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});

// start api
app.get('/', function (req, res) {
  try {
    res.send('Hello World')
  } catch (error) {
    console.log(error)
  }
})
require('./Routers/mainRoutes')(app);
app.listen(3000)