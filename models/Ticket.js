const ticketsCollection = require("../db").db().collection("tickets")
const employeesCollection = require("../db").db().collection("employees")
const ObjectID = require("mongodb").ObjectID

let Ticket = function (data) {
  this.data = data
}

Ticket.viewTickets = async function () {
  return new Promise(async function (resolve, reject) {
    let ticket = await ticketsCollection.find().toArray()
    if (ticket) {
      resolve(ticket)
    } else {
      reject()
    }
  })
}

Ticket.findAllTicketsById = function (id) {
  /* в качестве параметра data  - id-услуги */

  return new Promise(async function (resolve, reject) {
    let tickets = await ticketsCollection
      .find({
        serviceId: new ObjectID(id),
      })
      .toArray()

    /*     const projection = {
      _id: 1
    }
    let tickets = await ticketsCollection.find({ /* проводим поиск записей по id - услуги */
    /*   serviceId: new ObjectID(id)
    }).project(projection).toArray()  */

    /*    console.log(tickets[1]) */

    if (tickets) {
      /* console.log(tickets) */
      resolve(tickets)
    } else {
      console.log("No match found")
      reject()
    }
  })
}

module.exports = Ticket
