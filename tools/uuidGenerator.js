import { favorites } from "../service.js"

export function uuidGenerator() {
    const template = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxx'
    const result = template.replace(/x/g, function() {
      return String.fromCharCode('a'.charCodeAt(0) + Math.random() * 26 | 0)
    })

    return result
}

// Generate uuid cookie if not exists or return existing uuid
export default function getUUID(req, res) {
  // Get uuid from cookie
  let uuid = req.cookies.uuid
  // If user does not have an uuid, create one and set create favorites list
  if (!uuid) {
    uuid = uuidGenerator()
    res.cookie("uuid", uuid)  
    favorites[uuid] = new Set()
  }
  // If user has an uuid but does not have a favorites list, create one
  else if (!favorites[uuid]) {
    favorites[uuid] = new Set()
  }

  return uuid
}