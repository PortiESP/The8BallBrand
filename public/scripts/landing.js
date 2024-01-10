
let enableLoadMore = true

// Getting DOM elements
const $link = document.querySelector(".item--link#add-element--link")
const $layoutButton = document.querySelector("#alter-layout--button")
const $layoutButtonIcon = document.querySelector("#alter-layout--button i")
const $filterButtonIcon = document.querySelector("#alter-filter--button i")
const $filterButton = document.querySelector("#filter--button")
const $resetFilterButton = document.querySelector("#clear-filters--button")
const $itemsContainer = document.querySelector("main .items--wrap")
const $featuredItemsSection = document.getElementById("featured--section")
const $loadMoreButton = document.querySelector(".load-more--div")

// Adding listeners
$layoutButton.addEventListener("click", toggleLayout)
$filterButton.addEventListener("click", filterElements)
$resetFilterButton.addEventListener("click", resetFilterElements)

// Item Counter
let itemCount = 0
const INTERVAL = 4

// Intesecting observer
const observer = new IntersectionObserver((e)=> e[0].isIntersecting && loadMoreItems(), { threshold: 1, rootMargin: "0px 0px -100px 0px", root: null })
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

function filterElements(event) {
    event.preventDefault()
    enableLoadMore = false

    // get filter values
    const checkedSize = [...document.querySelectorAll(".checkbox--container input[type=checkbox]")].filter(e => e.checked).map(e => e.value)
    const selectedCategory = document.querySelector("select").selectedOptions[0].value
    const selectedPrice = [...document.querySelectorAll(".default--container input[type=number]")].map(e => e.value)
    const query = "sizes=" + checkedSize.join(",") + "&type=" + selectedCategory + "&min=" + selectedPrice[0] + "&max=" + selectedPrice[1]

    fetch(`/filter-index?${query}`)
    .then(response => response.text())
    .then(html => {
        // Append items to items-wrap
        const $products = $itemsContainer.querySelectorAll(".item--link.product")
        
        $products.forEach(e => e.remove())
        $link.insertAdjacentHTML("beforebegin", html)
    })

    // Toggle filter
    const $filter = document.querySelector(".filter--div")
    $filter.classList.toggle("filter--active")    
}

function resetFilterElements(event) {
    event.preventDefault()
    enableLoadMore = true
    document.querySelector("#filter--form").reset()

    const $products = $itemsContainer.querySelectorAll(".item--link.product")
    $products.forEach(e => e.remove())

    itemCount = 0
    loadMoreItems()
}

async function loadMoreItems() {
    if (!enableLoadMore) return

    console.log("Loading items...")
    // Fetch items
    const response = await fetch(`/get-items?from=${itemCount}&to=${itemCount + INTERVAL}`)
    const html = await response.text()

    // Update item counter
    itemCount += INTERVAL

    // Append items to items-wrap
    $link.insertAdjacentHTML("beforebegin", html)

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