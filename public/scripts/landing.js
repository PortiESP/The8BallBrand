// Getting DOM elements
const $layoutButton = document.querySelector("#alter-layout--button")
const $layoutButtonIcon = document.querySelector("#alter-layout--button i")
const $itemsContainer = document.querySelector("main .items--wrap")
const $featuredItemsSection = document.getElementById("featured--section")
const $loadMoreButton = document.querySelector(".load-more--div")

// Adding listeners
$layoutButton.addEventListener("click", toggleLayout)

// Item Counter
let itemCount = 0
const INTERVAL = 4

// Intesecting observer
const observer = new IntersectionObserver((e)=> e[0].isIntersecting && loadMoreItems(), { threshold: 0, rootMargin: "0px 0px 0px 0px", root: null })
observer.observe($loadMoreButton)


// =========================================================================================================================[ Functions ]>>>
function toggleLayout() {     
    // Toggle layout icon
    $layoutButtonIcon.classList.toggle("bi-view-list")
    $layoutButtonIcon.classList.toggle("bi-grid")

    // Toggle items-wrap layout
    $itemsContainer.classList.toggle("items-wrap--grid")
    $itemsContainer.classList.toggle("items-wrap--list")
}

async function loadMoreItems() {
    console.log("Loading items...")
    // Fetch items
    const response = await fetch(`/get-items?from=${itemCount}&to=${itemCount + INTERVAL}`)
    const html = await response.text()

    // Update item counter
    itemCount += INTERVAL

    // Remove link item
    const $linkItem = document.querySelector(".item--link#add-element--link")
    $itemsContainer.removeChild($linkItem)

    // Append items to items-wrap
    $itemsContainer.insertAdjacentHTML("beforeend", html)

    console.log("Items loaded")
}

async function loadFeaturedItems() {
    // Fetch items
    const response = await fetch(`/get-featured-items`)
    const html = await response.text()

    // Append items to items-wrap
    const itemsWrapper = $featuredItemsSection.querySelector(".featured--wrap").querySelector(".featured")

    itemsWrapper.innerHTML = html

    if (itemsWrapper.children.length === 0) $featuredItemsSection.style.display = "none"
    else $featuredItemsSection.style.display = "flex"

    console.log("Featured items loaded")
}



// INIT 
loadFeaturedItems()