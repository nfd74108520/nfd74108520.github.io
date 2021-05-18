function moveY(id, y) {
  let box = document.getElementById(id);
  let target = parseInt(box.style.left, 10) + y;
  let time = 100;
  let perMove = y / time;
}
