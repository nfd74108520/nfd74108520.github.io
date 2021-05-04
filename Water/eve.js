window.onload = function () {
  let tbody, data;

  tbody = document.querySelector("table>tbody");

  data = document.getElementsByClassName("reservoir");

  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");

    let item = data[i];

    for (let j = 0; j < 5; j++) {
      let th = document.createElement("th");

      if (j == 0) {
        th.innerText = i + 1;
      } else if (j == 1) {
        th.innerText = item.children[0].innerText;
      } else if (j == 2) {
        th.innerHTML = `<svg>${item.children[1].innerHTML}</svg>`;
      } else if (j == 3) {
        th.innerText = item.children[2].innerText;
      } else if (j == 4) {
        th.innerText = item.children[4].innerText;
      }
      tr.appendChild(th);
    }
    tbody.appendChild(tr);
  }
};