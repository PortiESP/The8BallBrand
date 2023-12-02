// Form validation constants
const nameMinChars = 3
const nameMaxChars = 20

const descriptionMinChars = 10
const descriptionMaxChars = 100

const priceMin = 0

const imageValidURL = ["https://", "../assets/clothes/"]
const imageValidExtensions = [".jpg", ".jpeg", ".png", ".svg"]
const emailValidExtensions = ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com"]

// Errors messages
const errorMessages = {
    1: "Bid too low",
    2: `Name must have (${nameMinChars}-${nameMaxChars}) chars`,
    3: "Invalid name",
    4: `Description must have (${nameMinChars}-${nameMaxChars}) chars`,
    5: "Invalid description",
    6: `Price must be greater than ${priceMin}"`,
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
    if (!image.startsWith(imageValidURL[0]) && !image.startsWith(imageValidURL[1]))
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

// TEST
const errors = publishErrorManager({ name: "Top Hoodie",
                                     description: "Comfort and style combined in this top-tier hoodie for a relaxed day or night out.",
                                     price: 34.99,
                                     image: "../assets/clothes/hoodie2.png"
                                    })
console.log(errors)