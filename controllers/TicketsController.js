const Ticket = require("../models/Ticket")



exports.viewAllTickets = function (req, res) {
  function formatDate(date) {
    let monthArray = [
      'января', 'февраля', 'марта', "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ]

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return day + ' ' + monthArray[month] + ' ' + year + ' года'
  }

  let date = new Date();
  ticketdate = formatDate(date)
  res.render("admin/tickets", {
    ticketdate
  })
}