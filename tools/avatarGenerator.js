let originRoute = "https://www.gravatar.com/avatar/"
let params = "?s=256&d=identicon"

function avatarGenerator(email) {
    return originRoute + email + params
}

export default avatarGenerator