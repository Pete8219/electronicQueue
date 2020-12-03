const Ticket = require("../models/Ticket")

exports.findAllTiketsByService = async function (req, res) { /* функция обработки запроса при выборе услуги на главной экране */

  
  try {
   /*  console.log(req.params) */  /*  вывод параметров запроса */
    let tickets = await Ticket.findAllTicketsById(req.params._id) /* вызов функции с передачей id-услуги в качестве параметра */
     

    if(tickets) {
      console.log(req.params)
      res.render("calendar/chooseDate", {
        services: req.params, 
        tickets
  
      })
      

    } else {
      res.send("Ничего не найдено по вашему запросу")
    }
    

  } catch {
    console.log("we are in tickets controller")
    res.render("404")
  }

}

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