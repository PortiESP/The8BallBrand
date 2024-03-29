import express from "express"
import { data, featured, favorites, sizes, types } from "./service.js"

// AUX FUNCTIONS
import formatDate from "./tools/dateUtils.js"
import avatarGenerator from "./tools/avatarGenerator.js"
import { publishErrorManager, bidErrorManager } from "./tools/errorManager.js"
import getUUID from "./tools/uuidGenerator.js"
import { getURLLastPath } from "./tools/urlUtils.js"

// CONSTANTS
const FEATURED_THRESHOLD = 3

// INIT
const router = express.Router()

// CONFIG
router.use(express.json())

// Declare possible routes (not enabled until enabled by `app.get()`)
router.get("/", renderIndex)
router.get("/detailed/:id", renderDetailed)
router.get("/publish", renderPublish)
router.get("/legal", (_, res) => res.render("legal"))
router.get("/edit/:id", renderPublishEdit)

router.get("/delete/:id", handleDeleteElement)
router.get("/toggle-fav", handleToggleFav)
router.get("/clear-favs-list", handleClearFavsList)

router.get("/get-items", getMoreItems)
router.get("/get-featured-items", getFeaturedItems)
router.get("/validate-name", checkValidName)
router.get("/search", getSearchResults)
router.get("/get-bids", getBids)
router.get("/filter-index", filterIndex)

// POST routes
router.post("/add-element", handleAddElement)
router.post("/edit-element/:id", handleAddElement)
router.post("/add-bid", handleAddBid)

//================================================================[Functions]================================================================//

// Rendering Functions =====================================================================================================
function renderIndex(req, res) {
    const uuid = getUUID(req, res)
    res.render("index", { ...parseNav(req, res, uuid),sizes, types })
}

// Render detailed page -----------------------------------------------------------------------------------------------
function renderDetailed(req, res) {
    const id = req.params.id
    const uuid = getUUID(req, res)

    // Template page values
    const templateParams = {
        ...data[id], // Element data
        isEmpty: !data[id]?.bids.length, // Bids array is empty
        isFav: favorites[uuid].has(id), // Element is in used favorites list
    }

    // Handle errors
    let errors = []
    const error = req.query.error // Error flag
    if (error) errors = decodeURIComponent(req.query.errorMsg).split(",") // Error list (from query)

    // Render page
    res.render("detailed", { ...templateParams, error, errors, ...parseNav(req, res, uuid) })
}

// Render publish page ------------------------------------------------------------------------------------------------
function renderPublish(req, res) {
    const uuid = getUUID(req, res)

    // Handle errors
    let errors = []
    const error = req.query.error // Error flag
    if (error) errors = decodeURIComponent(req.query.errorMsg).split(",") // Error list (from query)

    // Template page values
    const templateParams = {
        pageTitle: "Sell your best Garments!",
        pageLittleTitle: "Publish",
        cancelRoute: "/",
        postRoute: "/add-element",
        today: new Date().toISOString().split("T")[0],
        ...(error ? JSON.parse(decodeURIComponent(req.query.form)) : {}), // Form data (from query) or empty object in case of error
    }

    // Render page
    res.render("publish", { ...templateParams, types, sizes, error, errors, ...parseNav(req, res, uuid) })
}

// Render publish page (edit) -----------------------------------------------------------------------------------------
function renderPublishEdit(req, res) {
    const id = req.params.id
    const uuid = getUUID(req, res)

    // Handle errors
    let errors = []
    const error = req.query.error // Error flag
    if (error) errors = decodeURIComponent(req.query.errorMsg).split(",") // Error list (from query)

    // Template page values
    const templateParams = {
        pageTitle: "Edit your selling",
        pageLittleTitle: "Edit",
        cancelRoute: `/detailed/${id}`,
        postRoute: `/edit-element/${id}`,
        today: new Date().toISOString().split("T")[0],
        // Form data
        ...data[id],
        finishingDate: data[id].finishingDate.split("/").reverse().join("-"),
        ...(error ? JSON.parse(decodeURIComponent(req.query.form)) : {}),
    }

    // Set selected tag values
    types.forEach((e) => (e.selected = e.type === data[id].type ? "selected" : ""))
    sizes.forEach((e) => (e.selected = e.size === data[id].size ? "selected" : ""))

    // Render page
    res.render("publish", { ...templateParams, types, sizes, error, errors, ...parseNav(req, res, uuid) })
}

// Sub-components Rendering Functions ---------------------------------------------------------------------------------
function parseNav(req, res, uuid) {
    // If user does not have a favorites list, create one
    if (favorites[uuid] === undefined) favorites[uuid] = new Set()

    // Extract favorite elements of the user
    const favs = [...favorites[uuid]].map((id) => data[id]) || []

    return { favs }
}

// Handling Functions ======================================================================================================
function handleDeleteElement(req, res) {
    const id = req.params.id
    delete data[id]
    favorites[getUUID(req, res)].delete(id)
    featured.delete(id)

    res.redirect(`/`)
}

// Handle adding elements and editing elements ------------------------------------------------------------------------
function handleAddElement(req, res) {
    // Referrer
    const referrer = req.get("Referrer")
    const target = referrer.includes("edit") ? "edit/" + getURLLastPath(referrer) : "publish"

    // Validate form data
    const errors = publishErrorManager(req.body)
    const encodedForm = encodeURIComponent(JSON.stringify(req.body)) // Encode form data to be able to send it back to the form in case of error
    if (errors) res.redirect(`/${target}?error=true${errors}&form=${encodedForm}`) // Errors - Redirect to publish page
    else {
        // No errors - Add element to data
        // Add/edit element
        const id = referrer.includes("edit") ? getURLLastPath(referrer) : (parseInt(Object.keys(data).slice(-1)[0]) + 1).toString() // Generate element ID (auto-incremental)
        const finishingDate = formatDate(req.body.finishingDate) // Format finishing date

        data[id] = {
            id,
            ...req.body, // Add form data
            finishingDate: finishingDate,
            price: parseFloat(req.body.price), // Format price (float)
            bids: [], // Initialize bids array
        }

        res.redirect(`/detailed/${id}`)
    }
}

// Handle toggling favorite elements ----------------------------------------------------------------------------------
function handleToggleFav(req, res) {
    const id = req.query.id
    const uuid = getUUID(req, res)
    
    if (id) {
        // Toggle favorite element on the users list
        if (favorites[uuid].has(id)) favorites[uuid].delete(id)
        else favorites[uuid].add(id)
    }

    // Return favorites list
    res.render("components/navItemsContainer", { items: [...favorites[uuid]].map((id) => data[id]) })
}

// Handle clearing favorites list -------------------------------------------------------------------------------------
function handleClearFavsList(req, res) {
    // Get the user UUID
    const uuid = getUUID(req, res)
    
    // Clear user favorites list
    favorites[uuid] = new Set()

    // Return success flag
    res.json({ success: true })
}

// Fetching Functions ======================================================================================================

// Fetch more items ---------------------------------------------------------------------------------------------------
function getMoreItems(req, res) {
    const from = req.query.from
    const to = req.query.to

    const dataValues = Object.values(data)
        .sort((a, b) => b.bids.length - a.bids.length)
        .slice(from, to)
    res.render("components/itemsContainer", { dataValues })
}

// Fetch featured items -----------------------------------------------------------------------------------------------
function getFeaturedItems(_, res) {
    const featuredItems = [...featured].map((id) => data[id]).sort((a, b) => b.bids.length - a.bids.length)
    res.render("components/featuredItemsContainer", { featuredItems })
}

// Fetch valid name ---------------------------------------------------------------------------------------------------
function checkValidName(req, res) {
    const name = req.query.name
    const valid = Object.values(data).every((item) => item.name !== name)
    res.json({ valid })
}

// Fetch search results -----------------------------------------------------------------------------------------------
function getSearchResults(req, res) {
    const query = req.query.q
    
    if (!query) res.render("components/itemsContainer", { dataValues: [] })
    else res.render("components/itemsContainer", { dataValues: filterItemsByString(query) })
}

// Filter function ----------------------------------------------------------------------------------------------------
function filterItemsByString(query) {
    return Object.values(data).filter((item) => {
        return (
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        )
    })
}

// Fetch bids ---------------------------------------------------------------------------------------------------------
function getBids(req,res){
    const id = req.query.id
    const bids = data[id].bids
    if (bids.length) res.render("components/bidsContainer", { bids })
    else res.send(`<span class="flag--empty-bids">Be the first one to make a bid!</span>`)
}

// Handle adding bids -------------------------------------------------------------------------------------------------
function handleAddBid(req, res) {
    const id = req.query.id

    // Bid data
    const bid = parseFloat(req.body.bid)
    const name = req.body.name
    const email = req.body.email
    const picture = avatarGenerator(req.body.email)
    const date = formatDate(Date.now())

    // Item price (initial price or highest bid)
    const price = data[id].bids.length ? parseFloat(data[id].bids[0].bid) : parseFloat(data[id].price)

    // Validate bid data
    const errors = bidErrorManager({ bid, name, email, price })

    // Render error message or add bid to the list
    if (errors) res.status(400).send(errors)
    else {
        data[id].bids = [{ name, date, bid, picture }, ...data[id].bids]
        if (data[id].bids.length >= FEATURED_THRESHOLD) featured.add(id)
        res.status(200).render("components/bidCard", { name, date, bid, picture })
    }
}

function filterIndex(req,res){
    const sizes = req.query.sizes 
    const type =  req.query.type
    const min =  req.query.min
    const max =  req.query.max

    console.log(req.query)

    const filtered = Object.values(data).filter(element => {
    const evaluation = [
        sizes ? sizes.includes(element.size) : true,
        type ? type === element.type : true,
        min ? min <= element.price : true,
        max ? max  >= element.price : true
    ].every(e => e)

    console.log(element.id, evaluation)
    return evaluation
    })

    res.render("components/itemsContainer", { dataValues : filtered })
}

// Export routes definitions
export default router