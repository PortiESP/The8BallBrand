import express from 'express'
import mustache from "mustache-express"
import bodyParser from 'body-parser'
import router from './router.js'

// INIT
const app = express()

// Config
app.set("views", "./views")
app.set("view engine", "html")
app.engine('html', mustache())
app.use(bodyParser.urlencoded({ extended: true }))


// Enable routes
app.get('/', router)
app.get('/publish', router)
app.get('/detailed/:id', router)
app.get('/legal', router)
app.post('/add-element', router)

// Static files
app.use(express.static('./public'))

// LISTEN
app.listen(3000, () => {
  console.log('Listening on port 3000')
  console.log('Click here: http://localhost:3000/')
})