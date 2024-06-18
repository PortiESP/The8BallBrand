export function logger(req){
  console.log(`[+] Connection from ${req.ip} to ${req.url} at ${new Date().toLocaleString()}`)
}


export default function loggerMiddleware(req, _, next){
  // Exclude static files from logs
  if (!["css", "js", "png", "svg", "jpg"].includes(req.url.split(".")[1]))
    logger(req)
  
  next()
}