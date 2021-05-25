let starCover = document.querySelectorAll(".star-show");

starCover.forEach((cover) => {
  let star = cover.querySelectorAll(".star-display");
  star.forEach((item, index) => {
    if (index > 2) {
      item.classList.add("d-none");
    }
  });
});