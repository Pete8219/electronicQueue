const Role = require('../models/Role')





exports.roles = async function (req, res) {

  try {

    let roles = await Role.viewAllRoles()

    res.render("admin/roles", {
      roles: roles
    })
  } catch {
    res.render('404')
  }


}

exports.createRole = function (req, res) {
  res.render("admin/create-role")
}

exports.saveRole = function (req, res) {
  let role = new Role(req.body)
  role.create().then(function () {
    res.redirect('roles')
  }).catch(function () {
    res.send('error')
  })
}

exports.editRole = async function (req, res) {
  try {
    let role = await Role.findById(req.params.id)

    res.render("admin/edit-role", {
      role: role
    })
  } catch {
    res.render("404")
  }
}

exports.update = function (req, res) {
  let role = new Role(req.body)
  console.log(req.body)
  role.update().then(function () {
    res.redirect("roles")
  }).catch(function () {
    res.send('error')
  })

}