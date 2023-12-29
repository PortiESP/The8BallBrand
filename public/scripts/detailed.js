import { toggleFav } from "./nav.js"

// Favs checkbox element
const $favsCheckbox = document.querySelector("label[for='favorite-checkbox']")

// Bid elements
const $bidContainer = document.querySelector(".comment-background")
const $bidName = document.querySelector("input[name='name']")
const $bidEmail = document.querySelector("input[name='email']")
const $bidValue = document.querySelector("input[name='bid']")
const $bidButton = document.querySelector("#bid--button")

// Error toast elements
const $errorToast = document.querySelector(".error-msg-wrapper")
const $errorToastText = document.querySelector(".error-msg-wrapper .error-msg")
const $errorToastClose = document.querySelector(".error-msg-wrapper .icon-times")

$favsCheckbox.addEventListener("click", () => toggleFav(new URL(location).pathname.split("/").slice(-1)[0]))
$bidButton.addEventListener("click", addBid)
$errorToastClose.addEventListener("click", closeErrorToast)

// Load bids
async function loadBids() {
    const id = new URL(location).pathname.split("/").slice(-1)[0]
    const response = await fetch(`/get-bids?id=${id}`)
    const html = await response.text()
    $bidContainer.innerHTML = html
}

// Add new bids
async function addBid(event) {
    event.preventDefault()
    const id = new URL(location).pathname.split("/").slice(-1)[0]
    const bid = { name: $bidName.value, email: $bidEmail.value, bid: $bidValue.value }

    const response = await fetch(`/add-bid?id=${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bid)
    })

    const textResponse = await response.text()

    if (response.status === 200) {
        $bidName.value = ""
        $bidEmail.value = ""
        $bidValue.value = ""
        $bidContainer.innerHTML = textResponse + $bidContainer.innerHTML
        $errorToast.classList.remove("show")
    } else {
        const errorMsgs = decodeURIComponent(textResponse).split("=")[1].split(",")
        $errorToastText.innerHTML = errorMsgs.map(msg => `<li>${msg}</li>`).join("")
        $errorToast.classList.add("show")
    }
}

// Close error toast
function closeErrorToast() {
    $errorToast.classList.remove("show")
}

// INIT 
loadBids()