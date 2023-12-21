// Getting DOM elements
const $layoutButton = document.querySelector(".items--layout")
const $layoutButtonIcon = document.querySelector(".items--layout i")
const $itemsWrap = document.querySelector(".items--wrap")
const $itemsContainer = document.querySelector(".items--wrap")

const $loadMoreButton = document.querySelector("#load-more")

// Item Counter
let itemCount = 0
const interval = 4

// Adding listeners
$layoutButton.addEventListener("click", toggleLayout)
$loadMoreButton.addEventListener("click", loadMoreItems)

// =========================================================================================================================[ Functions ]>>>
function toggleLayout() {     
    // Toggle layout icon
    $layoutButtonIcon.classList.toggle("bi-view-list")
    $layoutButtonIcon.classList.toggle("bi-grid")

    // Toggle items-wrap layout
    $itemsWrap.classList.toggle("items-wrap--grid")
    $itemsWrap.classList.toggle("items-wrap--list")
}

async function loadMoreItems() {
    // Fetch items
    const response = await fetch(`/get-items?from=${itemCount}&to=${itemCount + interval}`)
    const html = await response.text()

    // Update item counter
    itemCount += interval

    // Remove link item
    const $linkItem = document.querySelector(".item--link#add-element--link")
    $itemsContainer.removeChild($linkItem)

    // Append items to items-wrap
    $itemsContainer.insertAdjacentHTML("beforeend", html)

    console.log("Items loaded")
}

// INIT 
loadMoreItems()