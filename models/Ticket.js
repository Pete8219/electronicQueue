const ticketsCollection = require('../db').db().collection('tickets')
const employeesCollection = require('../db').db().collection('employees')
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

Ticket.findAllTicketsById = function (data) {
  return new Promise(async function (resolve, reject) {
    let tickets = await ticketsCollection.find({
      cab: data
    }, {
      employee: 0,
      _id: 0
    }).toArray()
    if (tickets) {
      resolve(tickets)
    } else {
      reject();
    }
  })
}


module.exports = Ticket