const Service = require('../models/Service')
const Employee = require('../models/Employee')
const Ticket = require('../models/Ticket')




exports.viewServices = async function (req, res) {
  try {
    let service = await Service.viewServices()

    res.render('admin/services', {
      service: service
    })
  } catch {
    res.render('404')
  }

}

exports.home = async function (req, res) {
  try {
    let services = await Service.viewServices()
    res.render("public/services-page", {
      services
    })
  } catch {
    res.render("404")
  }
}

exports.calendar = async function (req, res) {
  try {
    let service = await Service.findById(req.params.id);
    console.log(service)
    let employees = await Employee.findById(service.employee_id);
    console.log(employees)
    let tickets = await Ticket.findAllTicketsById(employees.employeeCab)
    console.log(tickets)



    res.render("calendar/chooseDate", {
      service,
      employee: employees.employee,
      cabinet: employees.employeeCab,
      dateStart: employees.dateStart,
      dateEnd: employees.dateEnd,
      tickets
    })

  } catch {
    res.render("404")
  }
}

exports.newService = async function (req, res) {
  try {
    let service = await Service.newService()
    res.render('admin/create-service', {
      service: service
    })

  } catch {
    res.render('404')
  }

}

exports.createService = function (req, res) {
  let service = new Service(req.body)

  service.create().then(function () {
    res.redirect('services')
  }).catch(function () {
    res.send('error')
  })

}


exports.editService = async function (req, res) {
  try {
    let service = await Service.findById(req.params.id)
    let employees = await Service.newService();

    res.render("admin/edit-service", {
      service,
      employees
    })
  } catch {
    res.render("404")
  }
}

exports.update = function (req, res) {
  let service = new Service(req.body)

  service.update().then(function () {
    res.redirect("services")
  }).catch(function () {
    res.send('error')
  })
}

exports.deleteService = async function (req, res) {
  try {
    let service = await Service.findById(req.params.id)
    res.render("admin/service-delete", {
      service
    })

  } catch {
    res.render("404")
  }
}

exports.delete = function (req, res) {

  Service.delete(req.params.id).then(() => {
    res.redirect("/admin/services")


  }).catch(() => {
    req.session.save(() => res.send('error'))

  })
}