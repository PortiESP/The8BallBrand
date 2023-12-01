
// Form validation constants
const nameMinChars = 3
const nameMaxChars = 20

const descriptionMinChars = 10
const descriptionMaxChars = 50

const priceMin = 0

const imageValidURL = "https://"
const imageValidExtensions = [".jpg", ".jpeg", ".png", ".svg"]

// Errors messages
const errorMessages = {
    1: "Bid too low",
    2: "Gargment name must be between " + nameMinChars + " and " + nameMaxChars + " characters",
    3: "Description must be between " + descriptionMinChars + " and " + descriptionMaxChars + " characters",
    4: "Price must be greater than " + priceMin,
    5: "Invalid image URL",
    6: "Invalid image format"
}

// Check if publish form contains errors
function publishErrorManager(obj) {
    let errors = {}
    let { name, description, price, image } = obj

    // Check name
    if (name.length < nameMinChars || name.length > nameMaxChars)
        errors[2] = errorMessages[2]

    // Check description
    if (description.length < descriptionMinChars || description.length > descriptionMaxChars)
        errors[3] = errorMessages[3]

    // Check price
    if (price < priceMin)
        errors[4] = errorMessages[4]

    // Check image URL
    if (!image.startsWith(imageValidURL))
        errors[5] = errorMessages[5]

    // Check image extension
    let extension = image.slice(image.lastIndexOf("."))

    if (!extension in imageValidExtensions)
        errors[6] = errorMessages[6]

    return errors
}