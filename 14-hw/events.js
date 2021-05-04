window.onload = function () {
  let h1 = document.createElement("h1");
  h1.innerHTML = "Dom - George";

//   debugger;

  document.body.appendChild(h1);
};

//Ex1 - 在HTML attribute指定事件處理器
function Event1(event, element) {
  alert(`${event.constructor.name}事件類型的 ${event.type}事件`);
  alert(element.innerHTML);
}

//Ex2 - ⽤JS在HTML元素屬性設定事件
var btn2 = document.getElementById("button2");
btn2.onclick = function (event) {
  alert(`${event.constructor.name}事件類型的 ${event.type}事件`);
  alert(this.innerHTML);
};

//EventTarget.addEventListener
var btn3 = document.getElementById("button3");
btn3.addEventListener("click", function (event) {
  alert(`${event.constructor.name}事件類型的 ${event.type}事件`);
  alert(this.innerHTML);
});

btn3.addEventListener("mouseup", display);

function display() {
  alert("mouseup");
}

btn3.addEventListener("mouseup");
