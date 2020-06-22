const employeesCollection = require("../db")
  .db()
  .collection("employees")
const bcrypt = require("bcryptjs")

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
        console.log(attemptedUser)
        if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
          this.data = {
            employee: attemptedUser.employee,
            login: attemptedUser.login,
            role: attemptedUser.role

          }
          console.log(this.data)

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

module.exports = Employee