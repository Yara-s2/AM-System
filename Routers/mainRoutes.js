const admin = require("./admin");
const employee = require("./employee");
module.exports = (app) => {
    app.use("/admin", admin);
    app.use("/employee", employee);
};

