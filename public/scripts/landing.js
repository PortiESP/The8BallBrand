// Getting dom elements
const $layoutButton = document.querySelector(".items--layout")
const $layoutButtonIcon = document.querySelector(".items--layout i")
const $itemsWrap = document.querySelector(".items--wrap")


// Adding listeners
$layoutButton.addEventListener("click", toggleLayout)

// =========================================================================================================================[ Functions ]>>>
function toggleLayout() {     
    // Toggle layout icon
    $layoutButtonIcon.classList.toggle("bi-view-list")
    $layoutButtonIcon.classList.toggle("bi-grid")

    // Toggle items-wrap layout
    $itemsWrap.classList.toggle("items-wrap--grid")
    $itemsWrap.classList.toggle("items-wrap--list")
}

