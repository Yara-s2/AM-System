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
// end api

// second api
app.post('/signup', async function (req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const Salt = 10;
    const result = await bcrypt.hash(password, Salt)
    const newAdmin = new admin({ name, email, password: result });
    await newAdmin.save();
    return res.status(200).send('Data sent seccusseflly')
  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal server error')
  }
})
// end api
app.post('/login', async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userExist = await admin.findOne({ email: email, password: password });
    console.log("userExist", userExist)
    if (userExist.email) {
      const token = generateToken(userExist);
      const updateuser = await admin.findOneAndUpdate({ email: email, token: token });
      return res.status(200).send({
        message: "User Exist",
        token: token
      });
    } else {
      return res.status(400).send("Email is not exist");
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal server error')
  }
})
//api
app.post('/addemployee', async function (req, res) {
  try {
    const name = req.body.name;
    const gender = req.body.gender;
    const nationalty = req.body.nationalty;
    const phone_number = req.body.phone_number;
    const position = req.body.position;

    const addemployee = new employee({ name, gender, nationalty, phone_number, position });
    await addemployee.save();
    return res.status(200).send('Data sent seccusseflly')
  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal server error')
  }
})
//new api
app.get('/getemployee', async function (req, res) {
  try {
    const getemployee = await employee.find();
    return res.status(200).send(getemployee)
  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal server error')
  }
})
//new api
app.delete('/deleteemployee/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const deleteemployee = await employee.findOneAndDelete(id);
    return res.status(200).send('data deleted seccusseflly')
  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal server error')
  }
})

//new api 
app.put('/updateemployee/:id', async function (req, res) {
  try {

    const id = req.params.id;
    const name = req.body.name;
    const gender = req.body.gender;
    const nationalty = req.body.nationalty;
    const phone_number = req.body.phone_number;
    const position = req.body.position;
    const filter = {
      _id: new mongoose.Types.ObjectId(req.params.id)
    };
    const update = {  
      name: name,
      gender: gender,
      nationalty: nationalty,
      phone_Number: phone_number,
      position: position
    };
    const updateemployee = await employee.findOneAndUpdate(filter, update, { new: true });
    return res.status(200).send('data updated seccusseflly')
  } catch (error) {
    console.error('Error with runValidators:', error.message, error.errors);
    return res.status(500).send('Validation error: ' + error.message);
  }
}
)
app.listen(3000)

//new fuction∆
function generateToken(user) {
  console.log("user", user);
  return jwt.sign(
    { id: user.id, email: user.email },
    "abcde",
    { expiresIn: '1h' }
  );
}

//end function
