const $layoutButton = document.querySelector(".items--layout")
const $layoutButtonIcon = document.querySelector(".items--layout i")

$layoutButton.addEventListener("click", toggleLayout)

function toggleLayout() {
    // TODO
    // 1.- Change layout icon
    // 2.- Change items-wrap layout
    // 3.- Change items card class

    // <i class="bi bi-view-list"></i> --> List Icon
    // <i class="bi bi-grid-fill"></i> --> Grid Icon

    $layoutButtonIcon.classList.toggle("bi-view-list")
    $layoutButtonIcon.classList.toggle("bi-grid")
}
