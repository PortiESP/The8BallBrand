export const data = {
    "0001": {
        id: "0001",
        name: "Oversized Fit Hoodie",
        description: "Stay warm and stylish with this cozy oversized hoodie.",
        image: "../assets/clothes/hoodie1.png",
        price: 29.99,
        type: "Hoodie",
        size: "XL",
        finishingDate: "11/12/2023",
        bids: [
            {
                name: "Diego Sanchez",
                email: "diego@sanchez.com",
                bid: 38,
                date: "11/12/2023",
                picture: "https://www.gravatar.com/avatar/diego@sanchez.com?s=256&d=identicon"
                
            },
            {
                name: "Dani Santos",
                email: "dani@santos.com",
                bid: 35,
                date: "11/12/2023",
                picture: "https://www.gravatar.com/avatar/dani@santos.com?s=256&d=identicon"
            },
        ],
    },
    "0002": {
        id: "0002",
        name: "Top Hoodie",
        description: "Comfort and style combined in this top-tier hoodie for a relaxed day or night out.",
        image: "../assets/clothes/hoodie2.png",
        price: 34.99,
        type: "Hoodie",
        size: "M",
        finishingDate: "13/12/2023",
        bids: [],
    },
    "0003": {
        id: "0003",
        name: "Benetton Hoodie",
        description: "Stylish comfort with this Benetton hoodie. Perfect for a fashionable look.",
        image: "../assets/clothes/hoodie3.png",
        price: 19.99,
        type: "Hoodie",
        size: "L",
        finishingDate: "04/01/2024",
        bids: [],
    },
    "0004": {
        id: "0004",
        name: "Jordan Hoodie",
        description: "Iconic Jordan hoodie for sports enthusiasts and streetwear lovers.",
        image: "../assets/clothes/hoodie4.png",
        price: 59.99,
        type: "Hoodie",
        size: "L",
        finishingDate: "09/02/2024",
        bids: [],
    },
    "0005": {
        id: "0005",
        name: "Top Jeans",
        description: "Template description",
        image: "../assets/clothes/jeans.png",
        price: 44.99,
        type: "Jeans",
        size: "L",
        finishingDate: "09/01/2024",
        bids: [],
    },
    "0006": {
        id: "0006",
        name: "Stylish Shirt",
        description: "A trendy shirt for any occasion.",
        image: "../assets/clothes/shirt.png",
        price: 29.99,
        type: "Shirt",
        size: "M",
        finishingDate: "09/01/2024",
        bids: []
    },
    "0007": {
        id: "0007",
        name: "Classic Jeans",
        description: "Timeless denim jeans for a casual look.",
        image: "../assets/clothes/jeans2.png",
        price: 39.99,
        type: "Jeans",
        size: "L",
        finishingDate: "05/12/2023",
        bids: []
    },
    "0008": {
        id: "0008",
        name: "Elegant Dress",
        description: "An elegant dress for special occasions.",
        image: "../assets/clothes/dress.png",
        price: 79.99,
        type: "Dress",
        size: "S",
        finishingDate: "10/03/2024",
        bids: []
    },
    "0009": {
        id: "0009",
        name: "Casual T-Shirt",
        description: "Comfortable t-shirt for everyday wear.",
        image: "../assets/clothes/shirt1.png",
        price: 19.99,
        type: "T-Shirt",
        size: "XL",
        finishingDate: "15/12/2023",
        bids: []
    },
    "0010": {
        id: "0010",
        name: "Sporty Jacket",
        description: "A sporty jacket for an active lifestyle.",
        image: "../assets/clothes/jacket.png",
        price: 59.99,
        type: "Jacket",
        size: "M",
        finishingDate: "20/12/2023",
        bids: []
    },
    "0011": {
        id: "0011",
        name: "Cozy Sweater",
        description: "A cozy sweater for chilly days.",
        image: "../assets/clothes/sweater.png",
        price: 49.99,
        type: "Sweater",
        size: "L",
        finishingDate: "25/12/2023",
        bids: []
    },
    "0012": {
        id: "0012",
        name: "Formal Blouse",
        description: "A formal blouse for professional settings.",
        image: "../assets/clothes/blouse.png",
        price: 34.99,
        type: "Blouse",
        size: "S",
        finishingDate: "30/12/2023",
        bids: []
    },
    "0013": {
        id: "0013",
        name: "Chic Skirt",
        description: "A chic skirt for a stylish look.",
        image: "../assets/clothes/skirt.png",
        price: 44.99,
        type: "Skirt",
        size: "M",
        finishingDate: "01/01/2024",
        bids: []
    },
    "0014": {
        id: "0014",
        name: "Active Leggings",
        description: "Leggings for a comfortable workout.",
        image: "../assets/clothes/leggins.png",
        price: 24.99,
        type: "Leggings",
        size: "L",
        finishingDate: "05/01/2024",
        bids: []
    },
    "0015": {
        id: "0015",
        name: "Causal Shorts",
        description: "Casual shorts for a relaxed day.",
        image: "../assets/clothes/shorts.png",
        price: 14.99,
        type: "Shorts",
        size: "XL",
        finishingDate: "10/01/2024",
        bids: []
    }
}

export const featured = new Set(["0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008"])

export const sizes = [
    { "size": "XS" },
    { "size": "S" },
    { "size": "M" },
    { "size": "L" },
    { "size": "XL" },
    { "size": "XXL" },
]

export const types = [
    { "type": "Hoodie" },
    { "type": "Jeans" },
    { "type": "T-Shirt" },
    { "type": "Shirt" },
    { "type": "Sweater" },
    { "type": "Jacket" },
    { "type": "Coat" },
    { "type": "Dress" },
    { "type": "Skirt" },
    { "type": "Shorts" },
    { "type": "Underwear" },
    { "type": "Socks" },
    { "type": "Shoes" },
    { "type": "Other" },
]

export const favorites = {
    // Template value
    "uuidxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx": new Set(["0001", "0002", "0003", "0004"]),
    // Values
    "mxzbwdhy-xmrt-lvap-arcs-popy": new Set(["0001", "0002", "0003", "0004"]),
}