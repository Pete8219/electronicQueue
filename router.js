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

/* router.get("/admin", EmployeesController.home) */

//управление сотрудниками
router.get("/employees", EmployeesController.mustByLoggedIn, EmployeesController.viewEmployees)
router.get("/employee/:id/edit", EmployeesController.mustByLoggedIn, EmployeesController.editEmployee)
router.post("/employee/update", EmployeesController.mustByLoggedIn, EmployeesController.update)

router.get("/employee-create", EmployeesController.mustByLoggedIn, EmployeesController.newEmployee)

router.post("/employee-create", EmployeesController.mustByLoggedIn, EmployeesController.createEmployee)

//управление разделом Услуги
router.get("/services", EmployeesController.mustByLoggedIn, ServicesController.viewServices)
router.get("/create-service", EmployeesController.mustByLoggedIn, ServicesController.newService)
router.get("/service/:id/edit", EmployeesController.mustByLoggedIn, ServicesController.editService, EmployeesController.createSelectList)

router.post("/update-service", EmployeesController.mustByLoggedIn, ServicesController.update)
router.post("/service/:id/delete", EmployeesController.mustByLoggedIn, ServicesController.delete)
router.get("/service/:id/delete/confirm", EmployeesController.mustByLoggedIn, ServicesController.deleteService)
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



module.exports = router