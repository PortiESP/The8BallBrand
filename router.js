import express from "express"
import { data, sizes, types } from "./service.js"
import formatDate from "./tools/dateUtils.js"
import avatarGenerator from "./tools/avatarGenerator.js"
import {publishErrorManager, bidErrorManager} from "./tools/errorManager.js"

// INIT
const router = express.Router()
let dataValues = Object.values(data)

// Declare possible routes (not enabled until enabled by `app.get()`)
router.get("/", renderIndex);
router.get("/detailed/:id", renderDetailed);
router.get("/publish", renderPublish);
router.get("/legal", (req, res) => res.render("legal"));
router.get("/edit/:id", renderEdit)

router.get("/delete/:id", handleDeleteElement)
router.get("/quitErrorMsg/:id", handleQuitErrorMsg )

// POST routes
router.post("/add-element", handleAddElement)
router.post("/add-bid/:id", handleAddBid)
router.post("/edit-element/:id", handleEditElement)

//===================================================[Functions]===================================================//

// Rendering Functions -------------------------------------------------
function renderIndex(req, res) {
    res.render("index", { dataValues })
}

function renderDetailed(req, res) {
    const id = req.params.id
    const bids = data[id]?.bids // Extract bids from data and sort them
    const isEmpty = !bids?.length
    const elementData = data[id] // Extract element data from data

    // Render detailed page with or without error message
    if (!req.query.error) {
        const error = false
        const notError = "notError"
        
        res.render("detailed", { ...elementData, bids, isEmpty, error, notError })

    } else {
        const error = true

        const errors = data[id].errors

        const errorMsgTitle = "Error!"
        const notError = ""

        res.render("detailed", { ...elementData, bids, isEmpty, error, errorMsgTitle, errors, notError })
    }
}

function renderPublish(req, res) {
	const today = new Date().toISOString().split('T')[0]
	const pageTitle = "Sell your best Garments!"
	const pageMessage = "Publish"

	const route = "/"
	const postRoute = "/add-element"

	res.render('publish', { today, types, sizes, pageTitle, pageMessage, route, postRoute })
}

function renderEdit(req, res) {
	const today = new Date().toISOString().split('T')[0]
	const id = req.params.id
	const finishingDate = data[id].finishingDate.split('/').reverse().join('-')
	const selectedType = data[id].type
	const selectedSize = data[id].size
	const pageTitle = "Edit your selling"
	const pageMessage = "Edit"

	const route = `/detailed/${id}`
	const postRoute = `/edit-element/${id}`

	types.forEach(one => one.selected = one.type === selectedType ? 'selected' : '')
	sizes.forEach(one => one.selected = one.size === selectedSize ? 'selected' : '')
	
	res.render('publish', { ...data[req.params.id], today, finishingDate,
							types, sizes, pageTitle, pageMessage, route, postRoute
						  }
	)
}

// Handling Functions --------------------------------------------------
function handleAddElement(req, res) {
    const id = Date.now()
    const bids = []
    const price = parseFloat(req.body.price)
    const finishingDate = formatDate(req.body.finishingDate)

    data[id] = { id, ...req.body, finishingDate, price, bids }
    dataValues = Object.values(data)
    res.redirect(`/detailed/${id}`)
}

function handleEditElement(req, res) {
    const id = req.params.id
    const price = parseFloat(req.body.price)
    const finishingDate = formatDate(req.body.finishingDate)
    const bids = data[id].bids

    data[id] = { id, ...req.body, finishingDate, price, bids }
    res.redirect(`/detailed/${id}`)
}

function handleDeleteElement(req, res) {
    const id = req.params.id
    delete data[id]
    dataValues = Object.values(data)
    res.redirect(`/`)
}

function handleQuitErrorMsg(req, res) {
    const id = req.params.id
    data[id].errors = []
    res.redirect(`/detailed/${req.params.id}`)
}

function handleAddBid(req, res) {
    const id = req.params.id
    const date = formatDate(Date.now())

    const bid = parseFloat(req.body.bid)
    const name = req.body.name
    const email = req.body.email

    let price
    data[id].bids.length ? price = parseFloat(data[id].bids[0].bid) : price = parseFloat(data[id].price)

    const errors = bidErrorManager({ bid, name, email, price })
    const picture = avatarGenerator(req.body.email)
    
    if (errors.length) {
        data[id].errors = errors
        res.redirect(`/detailed/${id}?error=true`)

    } else {
        data[id].bids = [{ ...req.body, date, bid, picture }, ...data[id].bids]
        res.redirect(`/detailed/${id}`)
    }
}

// Export routes definitions
export default router
