const Service = require('../models/Service')



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