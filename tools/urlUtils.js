export function getURLLastPath(url){
  return new URL(url).pathname.split("/").slice(-1)[0]
}