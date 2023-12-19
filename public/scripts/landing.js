// Getting dom elements
const $layoutButton = document.querySelector(".items--layout")
const $layoutButtonIcon = document.querySelector(".items--layout i")
const $itemsWrap = document.querySelector(".items--wrap")


// Adding listeners
$layoutButton.addEventListener("click", toggleLayout)

// =========================================================================================================================[ Functions ]>>>
function toggleLayout() { 
    // TODO
    // 1.- Change layout icon
    // 2.- Change items-wrap layout
    // 3.- Change items card class

    // <i class="bi bi-view-list"></i> --> List Icon
    // <i class="bi bi-grid-fill"></i> --> Grid Icon
    
    // Toggle layout icon
    $layoutButtonIcon.classList.toggle("bi-view-list")
    $layoutButtonIcon.classList.toggle("bi-grid")

    // Toggle items-wrap layout
    $itemsWrap.classList.toggle("items-wrap--grid")
    $itemsWrap.classList.toggle("items-wrap--list")
}

