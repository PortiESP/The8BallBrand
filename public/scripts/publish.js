// Form validation constants
const NAME_MIN_CHARS = 3
const NAME_MAX_CHARS = 20

const DESCRIPTION_MIN_CHARS = 50
const DESCRIPTION_MAX_CHARS = 500

const URL_REGEX = /^(https?):\/\/[^ "]+\.[a-z]{0,3}\/[^ "]+\.(jpg|png|svg|jpeg|gif)$/
const LOCAL_URL_REGEX = /^\/assets\/clothes\/[^ "]+\.(jpg|png|svg|jpeg|gif)$/

// Get elements
const $productName = document.querySelector('input[name="name"]')
const $productDescription = document.querySelector('input[name="description"]')
const $productPrice = document.querySelector('input[name="price"]')
const $productImage = document.querySelector('input[name="image"]')
const $productDate = document.querySelector('input[name="finishingDate"]')
const $termsCheckbox = document.querySelector("#terms-checkbox")
const $form = document.querySelector("form.form-container")

// Setup listeners
$productName.addEventListener("input", validateProductName)
$productDescription.addEventListener("input", validateProductDescription)
$productPrice.addEventListener("input", validateProductPrice)
$productImage.addEventListener("input", validateProductImage)
$form.addEventListener("submit", validateForm)

// Callbacks for listeners
function validateProductName() {
    const element = $productName
    const valueLength = element.value.trim().length

    if (valueLength < NAME_MIN_CHARS || valueLength > NAME_MAX_CHARS || element.value[0] < "A" || element.value[0] > "Z") {
        document.querySelector("input[name=\"name\"] + .invalid-feedback").innerHTML = "Capitalize the first letter and use 3-20 characters"
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        return false
    } else {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true
    }
}

function validateProductDescription() {
    const element = $productDescription
    const valueLength = element.value.trim().length

    if (valueLength < DESCRIPTION_MIN_CHARS || valueLength > DESCRIPTION_MAX_CHARS) {
        document.querySelector("input[name=\"description\"] + .invalid-feedback").innerHTML = "Use 50-500 characters"
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        return false
    } else {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true
    }
}

function validateProductPrice() {
    const element = $productPrice

    if (element.value <= 0) {
        document.querySelector("input[name=\"price\"] + .invalid-feedback").innerHTML = "Price can't be 0 or negative"
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        return false
    } else {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true
    }
}

function validateProductImage() {
    const element = $productImage

    if (!element.value.match(URL_REGEX) && !element.value.match(LOCAL_URL_REGEX)) {
        document.querySelector("input[name=\"image\"] + .invalid-feedback").innerHTML = "Invalid image URL"
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        return false
    } else {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true
    }
}

// Form validation
function validateForm(event) {
    if (!validateProductName($productName) || !validateProductDescription() || !validateProductPrice() || !validateProductImage() || !$termsCheckbox.checked) {
        $termsCheckbox.checked = false
        event.preventDefault()
    }
}
