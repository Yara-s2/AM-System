const employee = require('../../Models/employee.models');
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
const admin = require('../../Models/admin.models');
const jwt = require('jsonwebtoken');
const Attendance = require('../../Models/Attendance.models');


module.exports.getEmployee = async (req, res) => {

    try {
        const getemployee = await employee.find();
        return res.status(200).send(getemployee)
      } catch (error) {
        console.log(error)
        return res.status(500).send('Internal server error')
      }

}

module.exports.updateEmployee = async (req, res) => {
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
};



module.exports.signup = async (req, res) => {
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
}

module.exports.login = async (req, res) => {
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
}

function generateToken(user) {
  console.log("user", user);
  return jwt.sign(
    { id: user.id, email: user.email },
    "abcde",
    { expiresIn: '1h' }
  );
}

module.exports.addemployee = async (req, res) => {
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
}

module.exports.deleteemployee = async (req, res) => {
  try {
      const id = req.params.id;
      const deleteemployee = await employee.findOneAndDelete(id);
      return res.status(200).send('data deleted seccusseflly')
    } catch (error) {
      console.log(error)
      return res.status(500).send('Internal server error')
    }
}



//employee attendance
module.exports.getAllEmployeeAttendances = async (req, res) => {
  try {
    const id = req.body.id;
      const records = await Attendance.find(id);

      if (records.length === 0) {
          return res.status(404).json({ message: "No records found" });
      }
      res.status(200).json(records); 
  } catch (error) {
      res.status(500).json({ message: "Error" });
  }
}
