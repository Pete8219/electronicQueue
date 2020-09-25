const employeesCollection = require("../db")
  .db()
  .collection("employees")
const rolesCollection = require("../db").db().collection("roles")
const bcrypt = require("bcryptjs")
const ObjectID = require('mongodb').ObjectID;

let Employee = function (data) {
  this.data = data
  this.errors = []
}

//Получение списка всех сотрудников

Employee.viewAllEmployee = function () {
  return new Promise(async function (resolve, reject) {
    let employee = await employeesCollection.find().toArray()
    if (employee) {
      resolve(employee)
    } else {
      reject()
    }
  })
}

//Создание нового сотрудника

Employee.prototype.create = function () {
  return new Promise((resolve, reject) => {
    let salt = bcrypt.genSaltSync(10)
    this.data.password = bcrypt.hashSync(this.data.password, salt)
    employeesCollection
      .insertOne(this.data)
      .then(() => resolve())
      .catch(() => reject("error"))
  })
}

Employee.prototype.login = function () {
  return new Promise((resolve, reject) => {
    /* this.cleanUp() */
    employeesCollection
      .findOne({
        login: this.data.login

      })
      .then(attemptedUser => {


        if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {

          this.data = {
            employee: attemptedUser.employee,
            login: attemptedUser.login,
            role: attemptedUser.role

          }


          resolve("Congrats!!!")
        } else {
          reject("Invalid username or password")
        }
      })
      .catch(function () {
        reject("Please try again later")
      })
  })
}


Employee.findById = function (id) {

  return new Promise(async function (resolve, reject) {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      reject()
      return
    }
    let employee = await employeesCollection.findOne({
      _id: new ObjectID(id)
    })

    if (employee) {
      resolve(employee)
    } else {
      reject()
    }


  })
}

Employee.getRoles = function () {
  return new Promise(async function (resolve, reject) {
    let roles = await rolesCollection.find().toArray()
    if (roles) {
      resolve(roles)
    } else {
      reject()
    }

  })
}

Employee.prototype.update = function () {

  return new Promise((resolve, reject) => {

    employeesCollection
      .findOne({
        _id: new ObjectID(this.data.id)

      }).then((employee) => {
        /* console.log(employee) */
        if (employee) {
          if (this.data.password == '' || this.data.password == undefined) {
            this.data.password = employee.password
            console.log("Мы здесь")

          } else {
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            console.log(employee.password, this.data.password)
            console.log("Если пароль изменен")
          }

        } else {
          console.log("No matches")
        }
      }).then(() => {
        console.log(this.data.login)
        employeesCollection.updateOne({
          _id: new ObjectID(this.data.id)
        }, {
          $set: {
            employee: this.data.employee,
            employeeCab: this.data.employeeCab,
            dateStart: this.data.dateStart,
            dateEnd: this.data.dateStart,
            login: this.data.login,
            role: this.data.role_id,
            password: this.data.password

          }
        })
      }).then(() => resolve()).catch(() => reject('Something wrong'))
  })

  /*     let salt = bcrypt.genSaltSync(10)
      this.data.password = bcrypt.hashSync(this.data.password, salt) */



}

module.exports = Employee