const servicesCollection = require('../db').db().collection('services')
const employeesCollection = require('../db').db().collection('employees')
const ObjectID = require("mongodb").ObjectID

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


Service.findById = function (id) {

  return new Promise(async function (resolve, reject) {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      reject()
      return
    }
    let service = await servicesCollection.findOne({
      _id: new ObjectID(id)
    })

    if (service) {
      resolve(service)
    } else {
      reject()
    }


  })
}

Service.findServiceAndEmployee = function (id) {
  return new Promise(async function (resolve, reject) {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      reject()
      return
    }
    let service = await servicesCollection.aggregate([{
        $match: {
          _id: new ObjectID(id)
        }
      },
      {
        $lookup: {
          from: "employees",
          localField: "employee_id",
          foreignField: "_id",
          as: "employee"
        }
      },
      {
        $project: {
          "service-title": 1,
          employeeCab: 1,
          dateStart: 1,
          dateEnd: 1,
          employee_id: {
            $arrayElemAt: ["$employee", 0]
          }

        }
      }
    ]).toArray()
    if (service) {
      resolve(service)
    } else {
      reject()
    }
  })
}



Service.prototype.update = function () {

  return new Promise((resolve, reject) => {
    servicesCollection.updateOne({
      _id: new ObjectID(this.data.id)
    }, {
      $set: {
        'service-title': this.data["service-title"],
        employee_id: this.data.employee_id,

        'service-time': this.data["service-time"]

      }

    }).then(() => resolve()).catch(() => reject('error'))
  })
}



Service.delete = function (serviceIdToDelete) {
  return new Promise(async (resolve, reject) => {
    try {
      let service = await Service.findById(serviceIdToDelete)
      if (service) {
        console.log(service)
        await servicesCollection.deleteOne({
          _id: new ObjectID(serviceIdToDelete)
        })
        resolve()
      } else {
        reject()
      }
    } catch {
      reject()
    }
  })
}



module.exports = Service