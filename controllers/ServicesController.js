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

exports.calendar = async function (req, res, next) {
  try {

    let services = await Service.findServiceAndEmployee(req.params.id)
    if (services) {

      req.params = {
        _id: services._id,
        title: services.title,
        employee_id: services.employee.id,
        employee: services.employee.employee,
        employeeCab: services.employee.employeeCab,
        dateStart: services.employee.dateStart,
        dateEnd: services.employee.dateEnd
      }

      next()
    }

  } catch {
    console.log("we are in service controller")
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

  service.create().then(function (data) {
    console.log(data)
    res.redirect('services')
  }).catch(function () {
    res.send('error')
  })

}


exports.editService = async function (req, res, next) {
  try {
    let service = await Service.findById(req.params.id)

    if (service) {

      req.params = {
        _id: service._id,
        title: service.title,
        employeeId: String(service.employee),
        time: service.time
      }
    }

    next()

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