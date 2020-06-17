const express = require("express")
const router = express.Router()

//обработка машрутов во frontend
router.get("/", function(req, res) {
  res.render("home-page")
})

//маршруты административной части

router.get("/admin", function(req, res) {
  res.render("admin/admin-page")
})

//управление сотрудниками
router.get("/employees", function(req, res) {
  res.render("admin/employees")
})

//управление разделом Услуги
router.get("/services", function(req, res) {
  res.render("admin/services")
})
router.get("/create-service", function(req, res) {
  res.render("admin/create-service")
})

router.post("/create-service", function(req, res) {
  res.send("Data successfully saved")
})

//управление разделом Талоны
router.get("/tickets", function(req, res) {
  res.render("admin/tickets")
})

module.exports = router
