const servicesCollection = require('../db').db().collection('services')

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

Service.prototype.create = function () {
  return new Promise((resolve, reject) => {
    servicesCollection.insertOne(this.data).then(() => resolve()).catch(() => reject('error'))
  })
}

module.exports = Service