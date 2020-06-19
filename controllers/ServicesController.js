const Service = require('../models/Service')



exports.viewServices = async function (req, res) {
  try {
    let service = await Service.viewServices()

    console.log(service)
    res.render('admin/services', {
      service: service
    })
  } catch {
    res.render('404')
  }

}

exports.newService = function (req, res) {
  res.render("admin/create-service")
}

exports.createService = function (req, res) {
  let service = new Service(req.body)
  service.create().then(function () {
    res.redirect('services')
  }).catch(function () {
    res.send('error')
  })

}