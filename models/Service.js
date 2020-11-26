const servicesCollection = require('../db').db().collection('services')
const employeesCollection = require('../db').db().collection('employees')
const ObjectID = require("mongodb").ObjectID

let Service = function (data) {
  this.data = data,
    this.errors = []


}

Service.prototype.cleanUp = function () {
  if (typeof this.data.title != "string") {
    this.data.title = ""
  }



  this.data = {
    title: this.data.title,
    employee: ObjectID(this.data.employee),
    time: this.data.time.slice(0, 2)


  }
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
    let employees = await employeesCollection.find().project({
      _id: 1,
      dateStart: 1,
      dateEnd: 1,
      employee: 1,
    }).toArray()
    if (employees) {
      resolve(employees)
    } else {
      reject()
    }

  })
}



Service.prototype.create = function () {


  return new Promise((resolve, reject) => {
    this.cleanUp();
    if (!this.errors.lenght) {
      servicesCollection.insertOne(this.data).then(() => resolve()).catch(() => {
        this.errors.push("Пожалуйста заполните поле Наименование услуги")
        reject(this.errors)
      })
    } else {
      reject(this.errors)
    }
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

Service.findServiceAndEmployee = function (id) { /*Передаем в качестве аргумета функции id-услуги */
  return new Promise(async function (resolve, reject) {
      if (typeof id != "string" || !ObjectID.isValid(id)) {
        reject()
        return
      }
      let services = await servicesCollection.aggregate([{
          $match: { /*Обращаемся  к коллеции services и ищем услугу с запрошенным id */
            _id: new ObjectID(id)
          }
        },
        {
          $lookup: { /*вытаскиваем данные по локальному полю employee из соседней коллеции employees. Employee == employees._id   */
            from: "employees",
            localField: 'employee',
            foreignField: '_id',
            as: "employeeData"
          }
        },
        {
          $project: { /*тут выставляем какие поля из запроса нужны*/
            title: 1, /*поле title из коллекции services */
            time: 1,  /*поле time из коллекции services */
            employee: { /* объект с полученными значениями из коллекции employees */
              $arrayElemAt: ["$employeeData", 0] /* а тут у нас массив значений из коллекции employees*/
            },


          }
        }
      ]).toArray() /* тут все собираем в массив */


      services = services.map(function (service) { /* пробегаемся с помощью метода map по массиву значений employee */
        service.employee = { /* присваиваем значения новым ключам */
          id: service.employee._id,
          employee: service.employee.employee,
          employeeCab: service.employee.employeeCab,
          dateStart: service.employee.dateStart,
          dateEnd: service.employee.dateEnd
        }

        return service /*  возвращаем новый объект service */
      })


      if (services) {

        resolve(services[0]) /* возвращаем первый элемент массива services в функцию контроллера exports.calendar */
      } else {
        reject()
      }
    }

  )
}



Service.prototype.update = function () {

  return new Promise((resolve, reject) => {
    servicesCollection.updateOne({
      _id: new ObjectID(this.data.id)
    }, {
      $set: {
        title: this.data.title,
        employee: ObjectID(this.data.employee),
        time: this.data.time

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