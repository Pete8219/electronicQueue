const Employee = require("../models/Employee")

exports.login = function(req, res) {
  let employee = new Employee(req.body)
  employee
    .login()
    .then(function() {
      console.log("Succesfully authentication!!!")
      res.redirect("/admin")
    })
    .catch(() => res.send("Ошибка !!!"))
}

exports.viewEmployees = async function(req, res) {
  try {
    let employee = await Employee.viewAllEmployee()
    res.render("admin/employees", {
      employee: employee
    })
  } catch {
    res.send("404")
  }
}

exports.newEmployee = function(req, res) {
  res.render("admin/create-employee")
}

exports.createEmployee = function(req, res) {
  let employee = new Employee(req.body)
  employee
    .create()
    .then(function() {
      res.redirect("/employees")
    })
    .catch(function() {
      res.send("Error")
    })
}
