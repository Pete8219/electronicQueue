const Employee = require("../models/Employee")

exports.mustByLoggedIn = function (req, res, next) {
  if (req.session.employee) {
    next()
  } else {
    /*req.flash("errors", "Чтобы провести эту операцию вы должны войти в систему")*/
    req.session.save(function () {
      res.render("404")
    })
  }
}

exports.login = function (req, res) {
  let employee = new Employee(req.body)
  employee
    .login()
    .then(function (result) {

      req.session.employee = {
        favColor: "Blue",
        login: employee.data.login,
        name: employee.data.employee,
        role: employee.data.role,
        _id: employee.data._id
      }
      console.log(req.session.employee)

      req.session.save(function () {
        console.log("Succesfully authentication!!!")
        res.redirect("/admin")
      })

    })
    .catch(function (e) {
      req.flash("errors", e)
      req.session.save(function () {
        res.redirect("/")
      })

    })
}

exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect("/")
  })
}

exports.viewEmployees = async function (req, res) {
  try {
    let employee = await Employee.viewAllEmployee()
    res.render("admin/employees", {
      employee: employee
    })
  } catch {
    res.send("404")
  }
}

exports.newEmployee = function (req, res) {
  res.render("admin/create-employee")
}

exports.createEmployee = function (req, res) {
  let employee = new Employee(req.body)
  employee
    .create()
    .then(function () {
      res.redirect("employees")
    })
    .catch(function () {
      res.send("Error")
    })
}

exports.home = function (req, res) {
  if (req.session.employee) {
    res.render("admin/admin-page", {
      name: req.session.employee.name
    })
  } else {
    res.render("auth", {
      errors: req.flash("errors"),
      regErrors: req.flash("regErrors")
    })
  }

}