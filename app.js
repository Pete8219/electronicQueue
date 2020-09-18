const express = require("express")
const session = require("express-session")
const helmet = require('helmet')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const path = require("path")





const app = express()
app.use(helmet())

let sessionOptions = session({
  secret: "electronic",
  store: new MongoStore({
    client: require("./db")
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  }
})

app.use(sessionOptions)
app.use(flash())

app.use(function (req, res, next) {
  res.locals.employee = req.session.employee

  next()
})

const router = require("./router")
const publicRouter = require("./publicRouter")


app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

app.use("/admin", router)
app.use("/", publicRouter)
app.use(express.static("views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "src")))




app.set("views", "./views/")

app.set("view engine", "ejs")

app.use(function (req, res, next) {
  res.status(404).render("404")

})

module.exports = app