import express from 'express'
import {data, dataValues, sizes, types} from './service.js'
import formatDate from './tools/dateUtils.js'

// INIT
const router = express.Router()


// Declare possible routes (not enabled until enabled by `app.get()`)
router.get('/', renderIndex)
router.get('/detailed/:id', renderDetailed)
router.get('/publish', renderPublish)
router.get('/legal', (req, res) => res.render('legal'))
router.get('/delete-element/:id', handleDeleteElement)
router.get('/edit/:id', renderEdit)

// POST routes
router.post('/add-element', handleAddElement)
router.post('/add-bid/:id', handleAddBid)
router.post('/edit-element/:id', handleEditElement)

//===================================================[Functions]===================================================//

// Rendering Functions -------------------------------------------------
function renderIndex(req, res) {
	res.render('index', { dataValues })
}

function renderDetailed(req, res) {
	const bids = data[req.params.id]?.bids			        	// Extract bids from data and sort them
	const elementData = data[req.params.id]         			// Extract element data from data

	res.render('detailed', { ...elementData, bids, isEmpty: !bids?.length })
}

function renderPublish(req, res) {
	const today = new Date().toISOString().split('T')[0]

	res.render('publish', { today, types, sizes })
}

function renderEdit(req, res) {
	const today = new Date().toISOString().split('T')[0]
	const finishingDate = data[req.params.id].finishingDate.split('/').reverse().join('-')
	const selectedType = data[req.params.id].type
	const selectedSize = data[req.params.id].size

	types.forEach(one => one.selected = one.type === selectedType ? 'selected' : '')
	sizes.forEach(one => one.selected = one.size === selectedSize ? 'selected' : '')
	
	res.render('edit', { ...data[req.params.id], today, finishingDate, types, sizes })
}

// Handling Functions --------------------------------------------------
function handleAddElement(req, res) {
	const id = Date.now()
	const bids = []
	const price = parseFloat(req.body.price)
	const finishingDate = formatDate(req.body.finishingDate)

	data[id] = { id, ...req.body, finishingDate, price, bids }
	res.redirect(`/detailed/${id}`)
}

function handleEditElement(req, res) {
	const id = req.params.id
	const price = parseFloat(req.body.price)
	const finishingDate = formatDate(req.body.finishingDate)

	data[id] = { id, ...req.body, finishingDate, price }
	res.redirect(`/detailed/${id}`)
}

function handleDeleteElement(req, res) {
	const id = req.params.id
	delete data[id]
	res.redirect(`/`)
}

function handleAddBid(req, res) {
	const id = req.params.id
	const date = formatDate(Date.now())
	const bid = parseFloat(req.body.bid)

	if (data[id].price > bid || data[id].bids[0]?.bid > bid) {
		res.redirect(`/detailed/${id}?error=1`)
	} else {
		data[id].bids = [{ date, ...req.body, bid }, ...data[id].bids]
		res.redirect(`/detailed/${id}`)
	}
}

// Export routes definitions
export default router