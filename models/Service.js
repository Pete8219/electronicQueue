const servicesCollection = require('../db').db().collection('services')
const employeesCollection = require('../db').db().collection('employees')

let Service = function (data) {
  this.data = data
}


//Получение списка всех услуг

Service.viewServices = function () {
  return new Promise(async function (resolve, reject) {
    let service = await servicesCollection.find().toArray()
    if (service) {
      resolve(service)
    } else {
      reject()

    }


  })
}

//Создание новой услуги
Service.newService = function () {
  return new Promise(async function (resolve, reject) {
    let employees = await employeesCollection.find().toArray()
    if (employees) {
      resolve(employees)
    } else {
      reject()
    }

  })
}



Service.prototype.create = function () {
  return new Promise((resolve, reject) => {
    servicesCollection.insertOne(this.data).then(() => resolve()).catch(() => reject('error'))
  })
}

module.exports = Service