import { sizes, types } from "../service.js"

// Form validation constants
const NAME_MIN_CHARS = 3
const NAME_MAX_CHARS = 20

const DESCRIPTION_MIN_CHARS = 50
const DESCRIPTION_MAX_CHARS = 500

const MIN_PRICE = 0

const IMAGE_VALID_URL = ["http://", "https://", "/assets"]
const IMAGE_VALID_EXTENSIONS = [".jpg", ".jpeg", ".png", ".svg", ".gif", ".webp"]
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Errors messages
const errorMessages = {
    100: "Bid too low",
    200: `Name must have (${NAME_MIN_CHARS}-${NAME_MAX_CHARS}) chars`,
    210: `Description must have (${DESCRIPTION_MIN_CHARS}-${DESCRIPTION_MAX_CHARS}) chars`,
    300: `Price must be greater than ${MIN_PRICE}"`,
    410: "Invalid image URL",
    420: "Invalid image format",
    430: "Invalid email",
    440: "Invalid description",
    450: "Invalid name",
    460: "Invalid type",
    470: "Invalid size",
}

// Check if publish form contains errors
export function publishErrorManager(obj) {
    let errors = []
    let { name, description, price, image, type, size } = obj

    // Check name
    if (name.length < NAME_MIN_CHARS || name.length > NAME_MAX_CHARS)
        errors.push(errorMessages[200])

    else if (!name.trim()) 
        errors.push(errorMessages[450])

    // Check description
    if (description.length < DESCRIPTION_MIN_CHARS || description.length > DESCRIPTION_MAX_CHARS)
        errors.push(errorMessages[210])

    else if (!description.trim())
        errors.push(errorMessages[440])

    // Check price
    if (price < MIN_PRICE)
        errors.push(errorMessages[300])

    // Check image URL match with at least one of the valid patterns
    if (IMAGE_VALID_URL.every(pattern => !image.startsWith(pattern)))
        errors.push(errorMessages[410])

    else {
        // Check image extension
        let extension = image.slice(image.lastIndexOf("."))

        if (!IMAGE_VALID_EXTENSIONS.includes(extension))
            errors.push(errorMessages[420])
    }

    // Check type
    if (types.every(item => item.type !== type))
        errors.push(errorMessages[460])

    // Check size
    if (sizes.every(item => item.size !== size))
        errors.push(errorMessages[470])

    return errors.length ? "&errorMsg=" + encodeURIComponent(errors.join(",")) : false
}

// Check if bid form contains errors
export function bidErrorManager(obj) {
    let errors = []
    let { bid, name, email, price } = obj

    // Check name
    if (name.length < NAME_MIN_CHARS || name.length > NAME_MAX_CHARS)
        errors.push(errorMessages[200])

    else if (!name.trim())
        errors.push(errorMessages[450])

    // Check email
    if (!email.match(EMAIL_REGEX))
        errors.push(errorMessages[430])

    // Check bid
    if (bid <= price)
        errors.push(errorMessages[100])

    return errors.length ? "&errorMsg=" + encodeURIComponent(errors.join(",")) : false
}