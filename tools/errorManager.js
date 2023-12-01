// Form validation constants
const nameMinChars = 3
const nameMaxChars = 20

const descriptionMinChars = 10
const descriptionMaxChars = 50

const priceMin = 0

const imageValidURL = "https://"
const imageValidExtensions = [".jpg", ".jpeg", ".png", ".svg"]
const emailValidExtensions = ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com"]

// Errors messages
const errorMessages = {
    1: "Bid too low",
    2: "Name must be between " + nameMinChars + " and " + nameMaxChars + " characters",
    3: "Invalid name",
    4: "Description must be between " + descriptionMinChars + " and " + descriptionMaxChars + " characters",
    5: "Invalid description",
    6: "Price must be greater than " + priceMin,
    7: "Invalid image URL",
    8: "Invalid image format",
    9: "Invalid email"
}

// Check if publish form contains errors
export function publishErrorManager(obj) {
    let errors = []
    let { name, description, price, image } = obj

    // Check name
    if (name.length < nameMinChars || name.length > nameMaxChars)
        errors.push(errorMessages[2])

    else if (!name.trim()) 
        errors.push(errorMessages[3])

    // Check description
    if (description.length < descriptionMinChars || description.length > descriptionMaxChars)
        errors.push(errorMessages[4])

    else if (!description.trim())
        errors.push(errorMessages[5])

    // Check price
    if (price < priceMin)
        errors.push(errorMessages[6])

    // Check image URL
    if (!image.startsWith(imageValidURL))
        errors.push(errorMessages[7])

    else {
        // Check image extension
        let extension = image.slice(image.lastIndexOf("."))

        if (!imageValidExtensions.includes(extension))
            errors.push(errorMessages[8])
    }

    return errors
}

// Check if bid form contains errors
export function bidErrorManager(obj) {
    let errors = []
    let { bid, name, email, price } = obj

    // Check name
    if (name.length < nameMinChars || name.length > nameMaxChars)
        errors.push(errorMessages[2])

    else if (!name.trim())
        errors.push(errorMessages[3])

    // Ceck email
    if (email.startsWith("@"))
        errors.push(errorMessages[9])
    else {
        // Check email extension
        let extension = email.slice(email.lastIndexOf("@"))

        if (!emailValidExtensions.includes(extension))
            errors.push(errorMessages[9])
    }

    // Check bid
    if (bid <= price)
        errors.push(errorMessages[1])

    return errors
}