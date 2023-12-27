import { toggleFav } from "./nav.js"

const $favsCheckbox = document.querySelector("label[for='favorite-checkbox']")

$favsCheckbox.addEventListener("click", () => toggleFav(new URL(location).pathname.split("/").slice(-1)[0]))