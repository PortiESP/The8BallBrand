export function uuidGenerator() {
    const template = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxx'
    const result = template.replace(/x/g, function() {
      return String.fromCharCode('a'.charCodeAt(0) + Math.random() * 26 | 0)
    })

    return result
}

// Generate uuid cookie if not exists or return existing uuid
export default function getUUID(req, res) {
  let uuid = req.cookies.uuid
  if (!uuid) {
    uuid = uuidGenerator()
    res.cookie("uuid", uuid)  // Generate uuid cookie if not exists
    favorites[uuid] = new Set()
  }

  return uuid
}