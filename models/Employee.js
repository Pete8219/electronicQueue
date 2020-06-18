const employeesCollection = require("../db").db().collection("employees")

let Employee = function (data) {

  this.data = data
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
    employeesCollection.insertOne(this.data).then(() => resolve()).catch(() => reject('error'))
  })
}



module.exports = Employee