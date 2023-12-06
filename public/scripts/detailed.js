
function toggleFav(id){
  fetch("/toggle-fav?id=" + id)
  .then(res => res.json())
  .then(data => data.success && location.reload())
}

document.querySelector("label[for='favorite-checkbox']").addEventListener("click", ()=>toggleFav(new URL(location).pathname.split("/").slice(-1)[0]))