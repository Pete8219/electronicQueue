const express = require("express")
const publicRouter = express.Router()
const ServicesController = require("./controllers/ServicesController")

publicRouter.get("/", ServicesController.home)
/*  {
  res.render("public/services-page")

}) */

publicRouter.get("/calendar/:id/service", ServicesController.calendar)
/*   res.render("calendar/calendar")
}) */

module.exports = publicRouter