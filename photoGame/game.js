let container = document.getElementById("container");
let mycanvas = document.getElementById("mycanvas");
let mycxt = mycanvas.getContext("2d");
let photoAni = document.getElementById("photoAni");
let ani = document.querySelectorAll(".ani");
let checkBtn = document.getElementById("checkBtn");
let img = new Image();
img.src = "./img/dog.jpg";

let photoRest;
let photoRule;
let photoChoose;

let randomStep = [];
let autoStep = [];

window.onload = () => {
  //預設難度
  startRender(`middle`);
  changeBox(photoRule);
  checkBtn.style.visibility = "hidden";
};

function photoAniChange(val) {
  img.src = `./img/${val}.jpg`;
  checkBtn.style.visibility = "visible";
  ani.forEach((item) => {
    item.style.visibility = "hidden";
  });
}

function checkChange(val) {
  startRender(`middle`);
  changeBox(photoRule);
  checkBtn.style.visibility = "hidden";
  ani.forEach((item) => {
    item.style.visibility = "visible";
  });
}

//渲染畫面
function startRender(level) {
  let choose = photoTotal[level].rest.length;

  mycanvas.setAttribute("width", `${choose * 100}`);
  mycanvas.setAttribute("height", `${choose * 100}`);

  mycxt.drawImage(img, 0, 0, choose * 100, choose * 100);
  photoChoose = photoTotal[level].rule.length;
  splitPhoto(photoChoose);
}

document.getElementsByClassName("newpohoto")[0].onclick = splitPhoto;

//分割圖片
function splitPhoto(level) {
  photoRule = [];
  photoRest = [];
  let id = 0;
  for (let i = 0; i < level; i++) {
    let rowArr1 = [];
    let rowArr2 = [];
    for (let j = 0; j < level; j++) {
      let data;
      if ((i + 1) * (j + 1) != level ** 2) {
        data = mycxt.getImageData(j * 100, i * 100, 100, 100);
      } else {
        data = mycxt.getImageData(j * 100, i * 100, 1, 1);
      }
      if (id == level ** 2 - 1) {
        id = "";
      } else {
        id++;
      }
      rowArr1.push({ id: id, photo: data });
      rowArr2.push({ id: id, photo: data });
    }
    photoRule.push(rowArr1);
    photoRest.push(rowArr2);
  }
}

//渲染方塊
function changeBox(rule) {
  container.innerHTML = "";
  rule.forEach((row, rowIndex) => {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "row justify-content-center");

    row.forEach((col, colIndex) => {
      let colDiv = document.createElement("div");
      colDiv.setAttribute(
        "class",
        "col-4 m-1 d-flex justify-content-center align-items-center text-white"
      );

      let canvas = document.createElement("canvas");
      canvas.setAttribute("width", "100");
      canvas.setAttribute("height", "100");
      canvas.setAttribute("id", `${col.id}`);
      canvas.getContext("2d").putImageData(col.photo, 0, 0);
      canvas.addEventListener("click", boxCheck);
      canvas.addEventListener("click", () => {
        changeBox(photoRule);
      });

      let input = document.createElement("input");
      input.value = rule[rowIndex][colIndex];
      input.setAttribute("class", "btn btn-primary border fs-1 w-100 h-100");
      if (col == "") {
        input.setAttribute("class", "btn btn-light fs-1 w-100 h-100");
      }

      colDiv.appendChild(canvas);
      rowDiv.appendChild(colDiv);
    });
    container.appendChild(rowDiv);
  });
}

let address = {
  x: 0,
  y: 0,
  dir: "",
};

//事件方塊
function boxCheck() {
  let text = event.target;
  randomStep.push(text.id);
  boxMove(text.id);
}

//方塊移動
function boxMove(target) {
  photoRule.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col.id == target) {
        address.x = rowIndex;
        address.y = colIndex;
        address.dir = boxDire();
        function boxDire() {
          if (rowIndex + 1 < photoRule.length) {
            if (photoRule[rowIndex + 1][colIndex].id == "") {
              return 1;
            }
          }
          if (rowIndex - 1 > -1) {
            if (photoRule[rowIndex - 1][colIndex].id == "") {
              return 2;
            }
          }
          if (colIndex + 1 < row.length) {
            if (photoRule[rowIndex][colIndex + 1].id == "") {
              return 3;
            }
          }
          if (colIndex - 1 > -1) {
            if (photoRule[rowIndex][colIndex - 1].id == "") {
              return 4;
            }
          }
        }
      }
    });
  });

  switch (address.dir) {
    case 1:
      autoStep.push(photoRule[address.x][address.y]);
      emptyBox = photoRule[address.x][address.y];
      photoRule[address.x][address.y] = photoRule[address.x + 1][address.y];
      photoRule[address.x + 1][address.y] = emptyBox;
      break;
    case 2:
      autoStep.push(photoRule[address.x][address.y]);
      emptyBox = photoRule[address.x][address.y];
      photoRule[address.x][address.y] = photoRule[address.x - 1][address.y];
      photoRule[address.x - 1][address.y] = emptyBox;
      break;
    case 3:
      autoStep.push(photoRule[address.x][address.y]);
      emptyBox = photoRule[address.x][address.y];
      photoRule[address.x][address.y] = photoRule[address.x][address.y + 1];
      photoRule[address.x][address.y + 1] = emptyBox;
      break;
    case 4:
      autoStep.push(photoRule[address.x][address.y]);
      emptyBox = photoRule[address.x][address.y];
      photoRule[address.x][address.y] = photoRule[address.x][address.y - 1];
      photoRule[address.x][address.y - 1] = emptyBox;
      break;
  }
}

//贏 條件
function winRule() {}

//開始遊戲(打亂數字)
function boxRandom() {
  let length = 0;
  photoRule.forEach((item) => {
    length += item.length;
  });
  let mathArr = [];
  for (let i = 0; i < 600; i++) {
    let random = Math.floor(Math.random() * (length - 1)) + 1;
    mathArr.push(random);
    randomStep.push(random);
  }
  mathArr.forEach((num) => {
    boxMove(num);
  });
  changeBox(photoRule);
}

//重新開始
function gameReStart() {
  randomStep = [];
  autoStep = [];
  changeBox(photoRest);
  splitPhoto(photoChoose);
}

//返回上一步
function gameReTurn() {}

//難易度
function chooceGame(chooce) {
  randomStep = [];
  autoStep = [];
  startRender(chooce);
  changeBox(photoRest);
}

//自動完成
function autoRun() {
  let time = 1;
  for (let i = autoStep.length - 1; i > -1; i--) {
    setTimeout(() => {
      boxMove(autoStep[i].id);
      changeBox(photoRule);
      if (i == 0) {
        autoStep = [];
      }
    }, 60 * time);
    time++;
  }
  randomStep = [];
}

//逆序數

const cal = (num) => {
  let arr;
  if (typeof num === "number") {
    let strs = String(num);
    arr = Array.from(strs, (str) => Number(str) || 0); // 安全处理，转换错误给0
  } else arr = num;
  let length = arr.length;
  let reverse = 0;

  for (let i = 0; i < length - 1; i++) {
    let n = arr[i];
    for (let j = i + 1; j < length; j++) {
      let m = arr[j];
      if (n > m) reverse += 1;
    }
  }

  console.log(reverse);
};
