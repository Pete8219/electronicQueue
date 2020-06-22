const Ticket = require("../models/Ticket")



exports.viewAllTickets = function (req, res) {
  res.render("admin/tickets")
}