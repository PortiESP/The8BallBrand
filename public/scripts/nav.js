const $searchInput = document.querySelector('#search--input')

const $favsList = document.querySelector(".liked--list")
const $favsBubble = document.querySelector(".favs--bubble")
const $favsCheckbox = document.querySelector("label[for='favorite-checkbox']")

$searchInput.addEventListener('keydown', searchElements)
$favsCheckbox.addEventListener("click", () => toggleFav(new URL(location).pathname.split("/").slice(-1)[0]))

// Search elements by name
async function searchElements(event) {
    if (event.key !== "Enter") return

    if (location.pathname === "/" && $searchInput.value !== "") {
        const response = await fetch(`/search?searched=${$searchInput.value}`)
        const html = await response.text()

        // Get DOM elements
        const $sectionsTitle = document.getElementsByClassName("section--title")
        const $title = $sectionsTitle[$sectionsTitle.length - 1]
        const $addMoreButton = document.querySelector("#load-more")
        const $itemsContainer = document.querySelector(".items--wrap")
        const $checkBox = document.querySelector("#toggle--search")

        // Reset values, load content and hide load more button
        $title.innerHTML = `Search results for "${$searchInput.value}"`
        $itemsContainer.innerHTML = html
        $addMoreButton.style.display = "none"
        $checkBox.checked = false
        $searchInput.value = ""
        
    } else if ($searchInput.value !== "")
        location.href = `/search/${$searchInput.value}`

    else location.href = "/"
}

// Send a request to the server to toggle the fav status of the element, then reload the page
function toggleFav(id) {
    fetch(`/toggle-fav${id ? "?id=" + id : ""}`)
        .then((res) => res.text())
        .then((data) => {
            console.log("Data" + data)
            $favsList.innerHTML = data
            console.log("Inner" + $favsList.innerHTML)
            const favsNum = $favsList.querySelectorAll(".item--liked").length
            if ($favsBubble) {
                $favsBubble.innerHTML = favsNum
                $favsBubble.style.display = favsNum ? "inline-block" : "none"
                document.querySelector("a[href='/clear-favs-list']").innerHTML = `Clear list (${favsNum})`
            }
        })
}

// INIT
toggleFav()