const express = require("express")
const path = require("path")

const router = require("./router")

const app = express()

app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

app.use("/", router)
app.use(express.static("views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "src")))




app.set("views", "./views/")

app.set("view engine", "ejs")

app.use(function (req, res, next) {
  res.status(404).render("404")

})
/* app.listen(4000, function () {
  console.log('server running on port 4000')
}) */
module.exports = app