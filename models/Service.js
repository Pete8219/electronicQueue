const servicesCollection = require('../db').db().collection('services')

let Service = function (data) {
  this.data = data
}


//Создание новой услуги

Service.prototype.create = function () {
  return new Promise((resolve, reject) => {
    servicesCollection.insertOne(this.data).then(() => resolve()).catch(() => reject('error'))
  })
}

module.exports = Service