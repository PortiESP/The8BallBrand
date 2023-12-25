const $searchInput = document.querySelector('#search--input')

$searchInput.addEventListener('keydown', searchElements)

async function searchElements(event) {
    if (event.key !== "Enter") return

    if (location.pathname === "/" && $searchInput.value !== "") {
        const response = await fetch(`/search?searched=${$searchInput.value}`)
        const html = await response.text()

        // Get DOM elements
        const $itemsContainer = document.querySelector(".items--wrap")
        const $loadMoreButton = document.querySelector("#load-more")
        const $checkBox = document.querySelector("#toggle--search")

        // Reset values, load content and hide load more button
        $searchInput.value = ""
        $checkBox.checked = false
        $loadMoreButton.style.display = "none"
        $itemsContainer.innerHTML = html
        
    } else if ($searchInput.value !== "")
        location.href = `/search/${$searchInput.value}`

    else location.href = "/"
}