const imageContainer = document.getElementById("image-container");
const imagesPerPage = 20; // Adjust depending on image size/layout
let page = 0;
let isLoading = false;

function loadImages(pageNum) {
  if (isLoading) return;
  isLoading = true;

  // Simulated image URLs (replace with real source or API call)
  const urls = Array.from({ length: imagesPerPage }, (_, i) =>
    `https://picsum.photos/300/200?random=${pageNum * imagesPerPage + i}`
  );

  urls.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.loading = "lazy";
    img.style = "margin: 4px; width: 300px; height: 200px;";
    imageContainer.appendChild(img);
  });

  isLoading = false;
}

// Set up observer for triggering load when nearing bottom
const sentinel = document.createElement("div");
sentinel.id = "sentinel";
imageContainer.appendChild(sentinel);

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !isLoading) {
    page++;
    loadImages(page);
  }
}, {
  rootMargin: "100px" // Start loading slightly before reaching the bottom
});

observer.observe(sentinel);

// Initial load: just enough to fill viewport + one more page
function preloadInitial() {
  const viewportHeight = window.innerHeight;
  let imagesLoaded = 0;

  const tempImg = document.createElement("img");
  tempImg.src = "https://picsum.photos/300/200";
  tempImg.style.display = "none";
  document.body.appendChild(tempImg);

  tempImg.onload = () => {
    const imgHeight = tempImg.naturalHeight;
    const imagesPerViewport = Math.ceil(viewportHeight / imgHeight) * 2;

    for (let i = 0; i < imagesPerViewport; i++) {
      const url = `https://picsum.photos/300/200?random=${i}`;
      const img = document.createElement("img");
      img.src = url;
      img.loading = "lazy";
      img.style = "margin: 4px; width: 300px; height: 200px;";
      imageContainer.insertBefore(img, sentinel);
    }

    document.body.removeChild(tempImg);
  };
}

preloadInitial();


