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
    1: "Bid too low\n",
    2: `Name must have (${nameMinChars}-${nameMaxChars}) characters\n`,
    3: "Invalid name\n",
    4: `Description must have (${nameMinChars}-${nameMaxChars}) characters\n`,
    5: "Invalid description\n",
    6: `Price must be greater than ${priceMin}"\n`,
    7: "Invalid image URL\n",
    8: "Invalid image format\n",
    9: "Invalid email\n"
}

// Check if publish form contains errors
export function publishErrorManager(obj) {
    let errors = []
    let { name, description, price, image } = obj

    // Check name
    if (name.length < nameMinChars || name.length > nameMaxChars)
        errors.push({ errorMsg: errorMessages[2] })

    else if (!name.trim()) 
        errors.push({ errorMsg: errorMessages[3] })

    // Check description
    if (description.length < descriptionMinChars || description.length > descriptionMaxChars)
        errors.push({ errorMsg: errorMessages[4] })

    else if (!description.trim())
        errors.push({ errorMsg: errorMessages[5] })

    // Check price
    if (price < priceMin)
        errors.push({ errorMsg: errorMessages[6] })

    // Check image URL
    if (!image.startsWith(imageValidURL))
        errors.push({ errorMsg: errorMessages[7] })

    else {
        // Check image extension
        let extension = image.slice(image.lastIndexOf("."))

        if (!imageValidExtensions.includes(extension))
            errors.push({ errorMsg: errorMessages[8] })
    }

    return errors
}

// Check if bid form contains errors
export function bidErrorManager(obj) {
    let errors = []
    let { bid, name, email, price } = obj

    // Check name
    if (name.length < nameMinChars || name.length > nameMaxChars)
        errors.push({ errorMsg: errorMessages[2] })

    else if (!name.trim())
        errors.push({ errorMsg: errorMessages[3] })

    // Ceck email
    if (email.startsWith("@"))
        errors.push({ errorMsg: errorMessages[9] })
    else {
        // Check email extension
        let extension = email.slice(email.lastIndexOf("@"))

        if (!emailValidExtensions.includes(extension))
            errors.push({ errorMsg: errorMessages[9] })
    }

    // Check bid
    if (bid <= price)
        errors.push({ errorMsg: errorMessages[1] })

    return errors
}