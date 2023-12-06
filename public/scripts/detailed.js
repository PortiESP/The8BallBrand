/* 
 * The fav button needs to be handled this way since an anchor tag breaks the animation 
 */
// Send a request to the server to toggle the fav status of the element, then reload the page
function toggleFav(id){
  fetch("/toggle-fav?id=" + id)
  .then(res => res.json())
  .then(data => data.success && location.reload())
}
// Set the event listener on the fav button
document.querySelector("label[for='favorite-checkbox']").addEventListener("click", ()=>toggleFav(new URL(location).pathname.split("/").slice(-1)[0]))