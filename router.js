import express from 'express'
import data from './storage.js'

// INIT
const router = express.Router()


// Declare possible routes (not enabled until enabled by `app.get()`)
router.get('/', (req, res) => res.render('index'))
router.get('/detailed/:id', (req, res) => res.render('detailed', data[req.params.id]))
router.get('/publish', (req, res) => res.render('publish'))
router.get('/legal', (req, res) => res.render('legal'))
router.post('/add-element', (req, res) => {
  const ms = Date.now()
  data[ms] = req.body
  console.log(data)  // Debug
  res.redirect(`/detailed/${ms}`)
})

// Export routes definitions
export default router