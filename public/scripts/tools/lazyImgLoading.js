
export default function lazyImgLoading(section) {
  console.log("Loading section ", section)
  // Get all images
  const $products = document.querySelectorAll(section + " .item")
  const $images = document.querySelectorAll(section + " .item .item--image-front")


  // For each image
  $images.forEach((e, i) => {
      // ------- While loading -------
      if (e.getAttribute("data-loaded")) return
      e.style.opacity = 0.5

      // ------- When loaded -------
      e.onload = () => {
          e.style.opacity = 1
          $products[i].querySelector(".item--loading").style.display = "none"

          // Prevent setting the animation again on loaded images
          e.setAttribute("data-loaded", true)
      }
  })
}