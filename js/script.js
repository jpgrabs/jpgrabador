// Lightbox functionality (unchanged)
const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});

// Scroll sync
const leftPanel = document.querySelector(".left-panel");
const rightPanel = document.querySelector(".right-panel");

let isSyncingLeftScroll = false;
let isSyncingRightScroll = false;

leftPanel.addEventListener("scroll", function () {
  if (!isSyncingLeftScroll) {
    isSyncingRightScroll = true;
    rightPanel.scrollTop = leftPanel.scrollTop;
  }
  isSyncingLeftScroll = false;
});

rightPanel.addEventListener("scroll", function () {
  if (!isSyncingRightScroll) {
    isSyncingLeftScroll = true;
    leftPanel.scrollTop = rightPanel.scrollTop;
  }
  isSyncingRightScroll = false;
});
