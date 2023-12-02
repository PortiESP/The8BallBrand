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
app.get('/publish/:id', router)
app.get('/detailed/:id', router)
app.get('/legal', router)
app.get('/edit/:id', router)
app.get('/delete/:id', router)
app.get('/quitErrorMsg/:id', router)

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