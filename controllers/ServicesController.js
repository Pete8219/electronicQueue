const Service = require('../models/Service')




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