
export default function lazyImgLoading(section) {
  console.log("Loading section ", section)
  // Get all images
  const $products = document.querySelectorAll(section + " .item")
  const $images = document.querySelectorAll(section + " .item .item--image-front")

  console.log($products)

  // For each image
  $images.forEach((e, i) => {
      // ------- While loading -------
      if (e.getAttribute("data-loaded")) return
      console.log("Item loading", e, $products[i])
      e.style.opacity = 0.5

      // ------- When loaded -------
      e.onload = () => {
          console.log("Item loaded", e, $products[i])
          e.style.opacity = 1
          $products[i].querySelector(".item--loading").style.display = "none"

          // Prevent setting the animation again on loaded images
          e.setAttribute("data-loaded", true)
      }
  })
}