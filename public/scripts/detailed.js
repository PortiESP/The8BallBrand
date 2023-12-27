import { toggleFav } from "./nav.js"

const $favsCheckbox = document.querySelector("label[for='favorite-checkbox']")
const $bidContainer = document.querySelector(".comment-background")

$favsCheckbox.addEventListener("click", () => toggleFav(new URL(location).pathname.split("/").slice(-1)[0]))

// Load bids with ajax
async function loadBids() {
    const id = new URL(location).pathname.split("/").slice(-1)[0]
    const response = await fetch(`/get-bids?id=${id}`)
    const html = await response.text()
    $bidContainer.innerHTML = html
}

// INIT 
loadBids()