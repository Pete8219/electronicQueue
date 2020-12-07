const express = require("express")
const publicRouter = express.Router()
const ServicesController = require("./controllers/ServicesController")
const TicketsController = require('./controllers/TicketsController')

publicRouter.get("/", ServicesController.home)


publicRouter.get("/calendar/:id/service", ServicesController.calendar, TicketsController.findAllTiketsByService)


publicRouter.get("/calendar/chooseTime/service/:id/date/:date", ServicesController.calendar, TicketsController.findNeedTickets)


module.exports = publicRouter