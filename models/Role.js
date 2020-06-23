const rolesCollection = require('../db').db().collection('roles')
const ObjectID = require("mongodb").ObjectID

const Role = function (data) {
  [
    this.data = data,
    this.errors = []
  ]
}

Role.prototype.create = function () {
  return new Promise((resolve, reject) => {
    rolesCollection.insertOne(this.data).then(() => resolve()).catch(() => reject('error'))
  })
}

Role.viewAllRoles = function () {

  return new Promise(async function (resolve, reject) {
    let roles = await rolesCollection.find().toArray()

    if (roles) {

      resolve(roles)
    } else {

      reject()
    }
  })
}

Role.findById = function (id) {

  return new Promise(async function (resolve, reject) {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      reject()
      return
    }
    let role = await rolesCollection.findOne({
      _id: new ObjectID(id)
    })

    if (role) {
      resolve(role)
    } else {
      reject()
    }


  })
}

Role.prototype.update = function () {

  return new Promise((resolve, reject) => {
    rolesCollection.updateOne({
      _id: new ObjectID(this.data.id)
    }, {
      $set: {
        role: this.data.role,
        title: this.data.title,
        description: this.data.description

      }

    }).then(() => resolve()).catch(() => reject('error'))
  })
}


module.exports = Role