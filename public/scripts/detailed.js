function toggleFav(id){
  fetch("/toggle-fav?id=" + id, {
    method: "POST"
  })
}