export function uuidGenerator() {
    const template = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxx'
    const result = template.replace(/x/g, function() {
      return String.fromCharCode('a'.charCodeAt(0) + Math.random() * 26 | 0)
    })

    return result
}