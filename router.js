const express = require("express")
const router = express.Router()
const EmployeesController = require('./controllers/EmployeesController')
const ServicesController = require('./controllers/ServicesController')

//обработка машрутов во frontend
router.get("/", function (req, res) {
  res.render("home-page")
})

//маршруты административной части

router.get("/admin", function (req, res) {
  res.render("admin/admin-page")
})

//управление сотрудниками
router.get("/employees", EmployeesController.viewEmployees)

router.get("/employee-create", EmployeesController.newEmployee)

router.post("/employee-create", EmployeesController.createEmployee)

//управление разделом Услуги
router.get("/services", function (req, res) {
  res.render("admin/services")
})
router.get("/create-service", ServicesController.newService)

router.post("/create-service", ServicesController.createService)

//управление разделом Талоны
router.get("/tickets", function (req, res) {
  res.render("admin/tickets")
})

module.exports = router