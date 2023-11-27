let originRoute = "https://www.gravatar.com/avatar/"
let params = "?s=256&d=identicon"

function avatarGenerator(email) {
    let name = email.split('@')[0]
    return originRoute + name + params
}

export default avatarGenerator