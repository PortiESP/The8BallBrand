import express from 'express'
import data from './service.js'
import formatDate from './tools/dateUtils.js'

// INIT
const router = express.Router()


// Declare possible routes (not enabled until enabled by `app.get()`)
router.get('/', (req, res) => res.render('index'))
router.get('/detailed/:id', renderDetailed)
router.get('/publish', renderPublish)
router.get('/legal', (req, res) => res.render('legal'))

// POST routes
router.post('/add-element', handleAddElement)
router.post('/add-bid/:id', handleAddBid)

//==================================================== Functions ====================================================
function renderDetailed(req, res) {
  const bids = data[req.params.id].bids                            // Extract bids from data and sort them
  const elementData = data[req.params.id]                          // Extract element data from data

  res.render('detailed', { ...elementData, bids, isEmpty: !bids.length})
}

function renderPublish(req, res) {
  const today = new Date().toISOString().split('T')[0]

  res.render('publish', {today})
}

function handleAddElement(req, res) {
  const id = Date.now()
  const bids = []
  const price = parseFloat(req.body.price)
  const finishingDate = formatDate(req.body.finishingDate)

  data[id] = { id, ...req.body, finishingDate, price, bids }
  console.log(data)  // Debug
  res.redirect(`/detailed/${id}`)
}

function handleAddBid(req, res) {
  const id = req.params.id
  const date = formatDate(Date.now())
  const bid = parseFloat(req.body.bid)

  if (data[id].price > bid || data[id].bids[0]?.bid > bid) {
    console.log(req.body, data[id]) // Debug
    res.redirect(`/detailed/${id}?error=1`)
  } else {
    data[id].bids = [{ date, ...req.body, bid }, ...data[id].bids]
    res.redirect(`/detailed/${id}`)
  }

}

// Export routes definitions
export default router