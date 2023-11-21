import express from 'express'

// INIT
const router = express.Router()

// Declare possible routes (not enabled until enabled by `app.get()`)
router.get('/', (req, res) => res.render('index'))
router.get('/detailed', (req, res) => res.render('detailed'))
router.get('/publish', (req, res) => res.render('publish'))
router.get('/legal', (req, res) => res.render('legal'))

// Export routes definitions
export default router