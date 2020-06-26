const express = require("express")
const router = express.Router()
const EmployeesController = require("./controllers/EmployeesController")
const ServicesController = require("./controllers/ServicesController")
const TicketsController = require("./controllers/TicketsController")
const RolesController = require("./controllers/RolesController")

//обработка машрутов во frontend
router.get("/", EmployeesController.home)

//маршруты административной части

router.post("/login", EmployeesController.login)
router.post("/logout", EmployeesController.logout)

router.get("/admin", EmployeesController.mustByLoggedIn, EmployeesController.home)

//управление сотрудниками
router.get("/employees", EmployeesController.mustByLoggedIn, EmployeesController.viewEmployees)

router.get("/employee-create", EmployeesController.mustByLoggedIn, EmployeesController.newEmployee)

router.post("/employee-create", EmployeesController.mustByLoggedIn, EmployeesController.createEmployee)

//управление разделом Услуги
router.get("/services", EmployeesController.mustByLoggedIn, ServicesController.viewServices)
router.get("/create-service", EmployeesController.mustByLoggedIn, ServicesController.newService)

router.post("/create-service", EmployeesController.mustByLoggedIn, ServicesController.createService)

//управление разделом Талоны
router.get("/tickets", EmployeesController.mustByLoggedIn, TicketsController.viewAllTickets)


//Управление правами пользователей

router.get("/roles", EmployeesController.mustByLoggedIn, RolesController.roles)
router.get("/create-role", EmployeesController.mustByLoggedIn, RolesController.createRole)
router.post("/save-role", EmployeesController.mustByLoggedIn, RolesController.saveRole)
router.get("/edit-role/:id", EmployeesController.mustByLoggedIn, RolesController.editRole)
router.post("/update-role", EmployeesController.mustByLoggedIn, RolesController.update)

//ticket section

router.get("/service-calendar", function (req, res) {
  res.render("calendar/calendar_days")
})

module.exports = router