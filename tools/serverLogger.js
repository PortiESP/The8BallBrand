export default function log(req){
  console.log(`[+] Connection from ${req.ip} to ${req.url} at ${new Date().toLocaleString()}`)
}