const express = require('express')
const router = express.Router()

//обработка машрутов во frontend
router.get('/', function (req, res) {
  res.render('home-page')
})






//маршруты административной части

router.get('/admin', function (req, res) {
  res.render('admin/admin-page')
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
  res.render('admin/tickets')
})




module.exports = router