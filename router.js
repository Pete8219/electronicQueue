const express = require('express')
const router = express.Router()

//обработка машрутов во frontend
router.get('/', function (req, res) {
  res.send('<h1>Hello!!!!!</h1>')
})






//маршруты административной части

router.get('/admin', function (req, res) {
  res.send('Административная часть интерфейса')
})

//управление сотрудниками
router.get('/employees', function (req, res) {
  res.send("Здесь будет все, что касается настроек сотрудников")
})

//управление разделом Услуги
router.get('/services', function (req, res) {
  res.send('Раздел настройки услуг')
})

//управление разделом Талоны
router.get('/tickets', function (req, res) {
  res.send('Раздел отображения выданных талонов')
})




module.exports = router