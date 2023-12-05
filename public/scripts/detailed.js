
function toggleFav(id){
  fetch("/toggle-fav?id=" + id, {
    method: "POST"
  })
  .then(res => res.json())
  .then(data => {
    document.querySelector("span.favs--bubble").innerText = data.numFavs
  })
}



document.querySelector("label[for='favorite-checkbox']").addEventListener("click", ()=>toggleFav(new URL(location).pathname.split("/").slice(-1)[0]))