const ORIGIN_ROUTE = "https://www.gravatar.com/avatar/"
const QUERY = "?s=256&d=identicon"

function avatarGenerator(email) {
    return ORIGIN_ROUTE + email + QUERY
}

export default avatarGenerator