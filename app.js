import express from 'express'
import mustache from "mustache-express"
import bodyParser from 'body-parser'
import router from './router.js'
import cookieParser from 'cookie-parser'
import logger from "./tools/serverLogger.js"


// INIT
const app = express()

// Config
app.set("views", "./views")  // Set views folder as default folder for templates
app.set("view engine", "html")  // Use html as template engine
app.engine('html', mustache())  // Use mustache as template engine
app.use(bodyParser.urlencoded({ extended: true }))  // Manage POST requests
app.use(cookieParser())  // Manage cookies
app.use((req, _, next) => {logger(req); next()})

// Enable routes
app.get('/', router)
app.get('/publish', router)
app.get('/publish/:id', router)
app.get('/detailed/:id', router)
app.get('/legal', router)
app.get('/edit/:id', router)
app.get('/delete/:id', router)
app.get('/quitDetailedErrorMsg/:id', router)
app.get('/quitDefaultErrorMsg/:id', router)
app.get("/toggle-fav", router)

// POST routes
app.post('/add-element', router)
app.post('/add-bid/:id', router)
app.post('/edit-element/:id', router)


// Static files
app.use(express.static('./public'))

// LISTEN
app.listen(3000, () => {
  console.log('Listening on port 3000')
  console.log('Click here: http://localhost:3000/')
})