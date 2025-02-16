const { check } = require('express-validator');
const EMAIL = check('email').notEmpty().exists().trim().isEmail().withMessage('Invalid Email Address');
const PASSWORD = check('password').notEmpty().exists().trim().isLength({ min: 5 }).withMessage('Invalid Email Address');
const NAME = check('name').notEmpty().exists().trim().withMessage('Invalid Name');

module.exports.validateLoginAPI = [
    EMAIL,
    PASSWORD
]

module.exports.validateSignupAPI = [
    EMAIL,
    PASSWORD,
    NAME
]

module.exports.validateupdateEmployeeAPI = [
    ID,
    NAME,
    GENDER,
    NATIONALTY,
    PHONE_NUMBER,
    POSITION,
]

module.exports.validateaddemployeeAPI = [
    NAME,
    GENDER,
    NATIONALTY,
    PHONE_NUMBER,
    POSITION,
]

module.exports.validatedeleteemployeeAPI =[
    ID,
]
