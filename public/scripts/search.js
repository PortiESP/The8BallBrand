const $searchInput = document.querySelector('#search--input')
$searchInput.addEventListener('keydown', searchElements)

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