const DEBOUNCE_TIMEOUT = 500  // Debounce timeout in ms

const $favsList = document.querySelector(".liked--list")
const $favsBubble = document.querySelector(".favs--bubble")
const $clearFavsButton = document.querySelector("#clear-favs--list")
const $searchDeleteButton = document.querySelector("#search--button")
const $searchInput = document.querySelector("#search--input")
const debounce = getDebouncer(parseSearchResults, DEBOUNCE_TIMEOUT)

// EVENTS ==============================================================================

// Clear the favs list
$clearFavsButton.addEventListener("click", clearFavsList)

// Clear the search input
$searchDeleteButton.addEventListener("click", resetInput)

// Input event on the search input
$searchInput.addEventListener("input", debounce)

// FUNCTIONS ==============================================================================

// Clear the search input event
function resetInput() {
    $searchInput.value = ""
    $searchInput.classList.remove("results--filled")
    document.querySelector("search .div--search-results").innerHTML = ""
}

// Toggle the fav status of an item
export function toggleFav(id) {
    fetch(`/toggle-fav${id ? "?id=" + id : ""}`)
        .then((res) => res.text())
        .then((data) => {
            $favsList.innerHTML = data
            const favsNum = $favsList.querySelectorAll(".item--liked").length
            if ($favsBubble) {
                $favsBubble.innerHTML = favsNum
                $favsBubble.style.display = favsNum ? "inline-block" : "none"
                $clearFavsButton.innerHTML = `Clear List (${favsNum})`
            }
        })
}

// Clear the favs list
function clearFavsList() {
    fetch("/clear-favs-list")
        .then(() => {
            $favsList.innerHTML = ""
            $favsBubble.innerHTML = 0
            $favsBubble.style.display = "none"
            $clearFavsButton.innerHTML = "Clear List (0)"

            if (location.pathname.includes("detailed/")) {
                const $favCheckbox = document.querySelector("#favorite-checkbox")
                $favCheckbox.checked = false
            }
        })
}

// Debounce function
export function getDebouncer(func, wait = 20) {
    let timeout  // Timeout ID (available in the closure)
    const context = this  // Save the context

    // Return a function that will be called only after the wait time
    return function (...args) {
        // Function to be called after the wait time
        const later = function () {
            timeout = null
            func.apply(context, args)
        }

        // Reset the timer
        clearTimeout(timeout)  // Clear the timer
        timeout = setTimeout(later, wait)  // Set the timer again
    }
}


// Parse the search results
function parseSearchResults() {

    if (!$searchInput.value) {
        resetInput()
        return
    }

    fetch(`/search?q=${$searchInput.value}`)
    .then((res) => res.text())
    .then((data) => {
        const $itemsContainer = document.querySelector("search .div--search-results")
        
        const noResults = !data.includes("detailed/")
        
        if (noResults) $itemsContainer.innerHTML = `<div class="item--no-results">No results found</div>`
        else $itemsContainer.innerHTML = data
        
        $searchInput.classList.add("results--filled")
    })       
}

export function loadUserIcon() {
    const email = localStorage.getItem("email")
    const $userIcon = document.querySelector("#user-icon")
    if (email) $userIcon.innerHTML = `<img id="user-icon" src="https://www.gravatar.com/avatar/${email}?s=256&d=identicon" alt="User icon">`
}

// INIT
toggleFav()
loadUserIcon()
window.onload = function() {
    scroll(0,0);
};