const Ticket = require("../models/Ticket")



exports.viewAllTickets = async function (req, res) {


  try {


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

    let ticket = new Ticket.viewTickets()
    res.render("admin/tickets", {
      ticketdate,
      ticket
    })

  } catch {
    res.render("404");
  }

}