const express = require("express")
const publicRouter = express.Router()
const ServicesController = require("./controllers/ServicesController")
const TicketsController = require('./controllers/TicketsController')

publicRouter.get("/", ServicesController.home)
/*  {
  res.render("public/services-page")

}) */

publicRouter.get("/calendar/:id/service", ServicesController.calendar, TicketsController.findAllTiketsByService)
/*   res.render("calendar/calendar")
}) */

module.exports = publicRouter