const $favsList = document.querySelector(".liked--list")
const $favsBubble = document.querySelector(".favs--bubble")

// Get initial favs number
toggleFav()

// Set the event listener on the fav button
document.querySelector("label[for='favorite-checkbox']").addEventListener("click", () => toggleFav(new URL(location).pathname.split("/").slice(-1)[0]))

// Send a request to the server to toggle the fav status of the element, then reload the page
function toggleFav(id) {
    fetch(`/toggle-fav${id ? "?id="+id: ""}`)
        .then((res) => res.text())
        .then((data) => {
            $favsList.innerHTML = data
            const favsNum = $favsList.querySelectorAll(".item--liked").length
            if ($favsBubble) {
                $favsBubble.innerHTML = favsNum
                $favsBubble.style.display = favsNum ? "inline-block" : "none"
                document.querySelector("a[href='/clear-favs-list']").innerHTML = `Clear list (${favsNum})`
            }
        })
}
