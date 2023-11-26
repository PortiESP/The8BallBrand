import express from 'express'
import data from './service.js'
import getDate from './tools/getDate.js'

// INIT
const router = express.Router()


// Declare possible routes (not enabled until enabled by `app.get()`)
router.get('/', (req, res) => res.render('index'))
router.get('/detailed/:id', (req, res) => res.render('detailed', data[req.params.id]))
router.get('/publish', (req, res) => res.render('publish'))
router.get('/legal', (req, res) => res.render('legal'))

// POST routes
router.post('/add-element', (req, res) => {
  const id = Date.now()
  const bidders = {
    "default": {
      username: "",
      email: "",
      bid: 0,
      date: ""
    }
  }

  data[id] = {id, ...req.body, bidders}
  console.log(data)  // Debug
  res.redirect(`/detailed/${id}`)
})

router.post('/add-bid/:id', (req, res) => {
  const id = req.params.id
  const username = req.body.username
  const date = getDate()

  data[id].bidders[username] = {...req.body, date}
  console.log("BODY", req.body)  // Debug
  console.log("DATA", data)  // Debug
  res.redirect(`/detailed/${id}`)
})

// Export routes definitions
export default router