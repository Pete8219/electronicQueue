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
    console.log(service)
    res.render("admin/edit-service", {
      service
    })
  } catch {
    res.render("404")
  }
}