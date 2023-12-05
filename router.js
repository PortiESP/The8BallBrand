import express from "express"
import { data, favorites, sizes, types } from "./service.js"

// AUX FUNCTIONS
import formatDate from "./tools/dateUtils.js"
import avatarGenerator from "./tools/avatarGenerator.js"
import {publishErrorManager, bidErrorManager} from "./tools/errorManager.js"
import {uuidGenerator} from "./tools/uuidGenerator.js"

// CONSTANTS
const today = new Date().toISOString().split('T')[0]
const errorId = "X"
const defaultPage = "Default"
const detailedPage = "Detailed"

// INIT
const router = express.Router()
let dataValues = Object.values(data)

// Declare possible routes (not enabled until enabled by `app.get()`)
router.get("/", renderIndex);
router.get("/detailed/:id", renderDetailed);
router.get("/publish", renderPublish);
router.get("/publish/:id", renderPublish);
router.get("/legal", (req, res) => res.render("legal"));
router.get("/edit/:id", renderEdit)

router.get("/delete/:id", handleDeleteElement)
router.get("/quitDetailedErrorMsg/:id", handleQuitDetailedErrorMsg )
router.get("/quitDefaultErrorMsg/:id", handleQuitErrorMsg )
router.get("/quitErrorMsg/:id", handleQuitErrorMsg )

// POST routes
router.post("/add-element", handleAddElement)
router.post("/add-bid/:id", handleAddBid)
router.post("/edit-element/:id", handleAddElement)

//===================================================[Functions]===================================================//


// Rendering Functions -------------------------------------------------
function renderIndex(req, res) {
    res.render("index", { dataValues, ...renderNav(req) })
}

function renderDetailed(req, res) {
    const id = req.params.id
    const bids = data[id]?.bids // Extract bids from data and sort them
    const isEmpty = !bids?.length
    const elementData = data[id] // Extract element data from data
    const page = detailedPage

    // Render detailed page with or without error message
    if (!req.query.error) {
        const error = false
        const notError = "notError"
        
        res.render("detailed", { ...elementData, bids, isEmpty, error, notError, ...renderNav(req) })

    } else {
        const error = true
        const notError = ""
        const errors = data[id].errors

        res.render("detailed", { ...elementData, bids, isEmpty, error, errors, notError, page, ...renderNav(req) })
    }
}

function renderPublish(req, res) {
	const pageTitle = "Sell your best Garments!"
	const pageMessage = "Publish"
    const page = defaultPage

	const route = "/"
	const postRoute = "/add-element"

    // Render publish page with or without error message
    if (!req.query.error) {
        const error = false
        const notError = "notError"
        const dataValues = {...data[errorId]}
        delete data[errorId]
        res.render("publish", { ...dataValues, today, types, sizes, pageTitle, pageMessage, route, postRoute, error, notError, ...renderNav(req) })
        
    } else {
        const id = errorId
        const error = true
        const notError = ""

        const errors = data[errorId].errors

        res.render('publish', {
            ...data[errorId], today, error, notError, errors,
            types, sizes, pageTitle, pageMessage, route, postRoute, id, page, ...renderNav(req)
        })
    }
}

function renderEdit(req, res) {
	const id = req.params.id
    const page = defaultPage

	const finishingDate = data[id].finishingDate.split('/').reverse().join('-')
	const selectedType = data[id].type
	const selectedSize = data[id].size

	const pageTitle = "Edit your selling"
	const pageMessage = "Edit"

	const route = `/detailed/${id}`
	const postRoute = `/edit-element/${id}`

	types.forEach(one => one.selected = one.type === selectedType ? 'selected' : '')
	sizes.forEach(one => one.selected = one.size === selectedSize ? 'selected' : '')

    if (!req.query.error) {
        const error = false
        const notError = "notError"

        res.render('publish', {
            ...data[id], today, finishingDate, error, notError,
            types, sizes, pageTitle, pageMessage, route, postRoute, ...renderNav(req)
        })

    } else {
        const error = true
        const notError = ""
        const errors = data[id].errors

        res.render('publish', {
            ...data[id], today, finishingDate, error, notError, errors,
            types, sizes, pageTitle, pageMessage, route, postRoute, page, ...renderNav(req)
        })
    }
}

// Sub-components Rendering Functions ---------------------------------

function renderNav(req){
    if (!req.cookies.uuid) res.cookie("uuid", uuidGenerator())  // Generate uuid cookie if not exists
    const favs = favorites[req.cookies.uuid]?.map(prodId => data[prodId]) || []  // Extract favorite elements of the user
    return {favs}
}


// Handling Functions --------------------------------------------------
function handleDeleteElement(req, res) {
    const id = req.params.id
    delete data[id]
    dataValues = Object.values(data)
    res.redirect(`/`)
}

function handleQuitErrorMsg(req, res) {
    const id = req.params.id
    data[id].errors = []

    if (id === errorId) res.redirect(`/publish`)
    else res.redirect(`/edit/${id}`)
}

function handleQuitDetailedErrorMsg(req, res) {
    const id = req.params.id

    data[id].errors = []
    res.redirect(`/detailed/${id}`)
}

function handleAddElement(req, res) {
    const dateNow = Date.now()

    let id
    if (!req.params.id) id = dateNow
    else id = req.params.id
    
    const bids = data[id]?.bids || []
    const price = parseFloat(req.body.price)
    const finishingDate = formatDate(req.body.finishingDate)

    const errors = publishErrorManager({ ...req.body, price })
    const result = { id, ...req.body, finishingDate, price, bids }
    
    if (errors.length) {
        if (id === dateNow) {
            data[errorId] = result
            data[errorId].errors = errors
            res.redirect(`/publish/${errorId}?error=true`)

        } else {
            data[id] = result
            data[id].errors = errors
            res.redirect(`/edit/${id}?error=true`)
        }

    } else {
        data[id] = result
        dataValues = Object.values(data)
        res.redirect(`/detailed/${id}`)
    }
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