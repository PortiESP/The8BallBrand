const $favsList = document.querySelector(".liked--list")
const $favsBubble = document.querySelector(".favs--bubble")

// Send a request to the server to toggle the fav status of the element, then reload the page
export function toggleFav(id) {
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