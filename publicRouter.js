const express = require("express")
const publicRouter = express.Router()

publicRouter.get("/", function (req, res) {
  res.render("public/services-page")

})

publicRouter.get("/service-calendar", function (req, res) {
  res.render("calendar/calendar_days")
})

module.exports = publicRouter