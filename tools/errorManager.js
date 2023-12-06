// Form validation constants
const nameMinChars = 3
const nameMaxChars = 20

const descriptionMinChars = 10
const descriptionMaxChars = 100

const priceMin = 0

const imageValidURL = ["https://", "../assets/clothes/"]
const imageValidExtensions = [".jpg", ".jpeg", ".png", ".svg"]
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Errors messages
const errorMessages = {
    100: "Bid too low",
    200: `Name must have (${nameMinChars}-${nameMaxChars}) chars`,
    210: `Description must have (${nameMinChars}-${nameMaxChars}) chars`,
    300: `Price must be greater than ${priceMin}"`,
    410: "Invalid image URL",
    420: "Invalid image format",
    430: "Invalid email",
    440: "Invalid description",
    450: "Invalid name",
}

// Check if publish form contains errors
export function publishErrorManager(obj) {
    let errors = []
    let { name, description, price, image } = obj

    // Check name
    if (name.length < nameMinChars || name.length > nameMaxChars)
        errors.push(errorMessages[200])

    else if (!name.trim()) 
        errors.push(errorMessages[450])

    // Check description
    if (description.length < descriptionMinChars || description.length > descriptionMaxChars)
        errors.push(errorMessages[210])

    else if (!description.trim())
        errors.push(errorMessages[440])

    // Check price
    if (price < priceMin)
        errors.push(errorMessages[300])

    // Check image URL
    if (!image.startsWith(imageValidURL[0]) && !image.startsWith(imageValidURL[1]))
        errors.push(errorMessages[410])

    else {
        // Check image extension
        let extension = image.slice(image.lastIndexOf("."))

        if (!imageValidExtensions.includes(extension))
            errors.push(errorMessages[420])
    }

    return errors ? "&errorMsg=" + encodeURIComponent(errors.join(",")) : false
}

// Check if bid form contains errors
export function bidErrorManager(obj) {
    let errors = []
    let { bid, name, email, price } = obj

    // Check name
    if (name.length < nameMinChars || name.length > nameMaxChars)
        errors.push(errorMessages[200])

    else if (!name.trim())
        errors.push(errorMessages[450])

    // Check email
    if (!email.match(EMAIL_REGEX))
        errors.push(errorMessages[430])

    // Check bid
    if (bid <= price)
        errors.push(errorMessages[100])

    return errors ? "&errorMsg=" + encodeURIComponent(errors.join(",")) : false
}