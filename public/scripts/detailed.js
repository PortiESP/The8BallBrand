import { toggleFav } from "./nav.js"

const $favsCheckbox = document.querySelector("label[for='favorite-checkbox']")
const $bidContainer = document.querySelector(".comment-background")
const $bidName = document.querySelector("input[name='name']")
const $bidEmail = document.querySelector("input[name='email']")
const $bidValue = document.querySelector("input[name='bid']")
const $bidButton = document.querySelector("#bid--button")

$favsCheckbox.addEventListener("click", () => toggleFav(new URL(location).pathname.split("/").slice(-1)[0]))
$bidButton.addEventListener("click", addBid)

// Load bids
async function loadBids() {
    const id = new URL(location).pathname.split("/").slice(-1)[0]
    const response = await fetch(`/get-bids?id=${id}`)
    const html = await response.text()
    $bidContainer.innerHTML = html
}

// Add new bids
function addBid(event) {
    event.preventDefault()
    const id = new URL(location).pathname.split("/").slice(-1)[0]
    const bid = { name: $bidName.value, email: $bidEmail.value, bid: $bidValue.value }
    fetch(`/add-bid?id=${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bid)
    })
    .then(res => ({data: res.text(), code: res.status}))
    .then(res => { 
        if (res.code === 200) {
            $bidContainer.innerHTML = res.data + $bidContainer.innerHTML
            $bidName.value = ""
            $bidEmail.value = ""
            $bidValue.value = ""
        } else if (res.code === 204) {
            alert(res.data)
        }

    })
}

// INIT 
loadBids()