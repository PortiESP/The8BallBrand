import express from 'express'
import data from './service.js'
import getDate from './tools/getDate.js'

// INIT
const router = express.Router()


// Declare possible routes (not enabled until enabled by `app.get()`)
router.get('/', (req, res) => res.render('index'))
router.get('/detailed/:id', renderDetailed)
router.get('/publish', (req, res) => res.render('publish'))
router.get('/legal', (req, res) => res.render('legal'))

// POST routes
router.post('/add-element', handleAddElement)
router.post('/add-bid/:id', handleAddBid)

//==================================================== Functions ====================================================
function renderDetailed(req, res)  {
  const bids = Object.values(data[req.params.id].bidders).sort((a, b) => b.bid - a.bid)   // Extract bids from data and sort them
  const elementData = data[req.params.id]   // Extract element data from data

  res.render('detailed', {...elementData, 'bids':[1,2,3]})
}

function handleAddElement (req, res) {
  const id = Date.now()
  const bidders = {
    "default": {
      username: "",
      email: "",
      bid: 0,
      date: ""
    }
  }

  data[id] = { id, ...req.body, bidders }
  console.log(data)  // Debug
  res.redirect(`/detailed/${id}`)
}

function handleAddBid (req, res) {
  const id = req.params.id
  const username = req.body.username
  const date = getDate()

  data[id].bidders[username] = { ...req.body, date }
  console.log("BODY", req.body)  // Debug
  console.log("DATA", data)  // Debug
  res.redirect(`/detailed/${id}`)
}

// Export routes definitions
export default router