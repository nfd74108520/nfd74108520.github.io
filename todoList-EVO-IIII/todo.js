let displayYear = document.getElementById("display-year");

let displayMonth = document.getElementById("display-month");
let addBtn = document.getElementById("addBtn");
let deleBtn = document.getElementById("deleBtn");
let displayDate = document.getElementById("display-date");
let modalTitle = document.querySelector(".modal-title");
let todoShow = document.getElementById("todoShow");
let hrLine = document.getElementById("hrLine");
let textArea = document.getElementById("textArea");
let inputText = document.getElementById("inputText");
let submitBtn = document.getElementById("submit");

let todoLIstStorage = {};

let yearCount = 2021;
let monthCount = 4;
let dayCount;
let monthArray = [
  "一 月",
  "二 月",
  "三 月",
  "四 月",
  "五 月",
  "六 月",
  "七 月",
  "八 月",
  "九 月",
  "十 月",
  "十一 月",
  "十二 月",
];

window.onload = changeMonth();

function changeYear(select) {
  if (select) {
    displayYear.textContent = yearCount += 1;
  } else {
    displayYear.textContent = yearCount -= 1;
  }
  monthCount = 0;
  changeMonth(false);
}

function changeMonth(select) {
  if (select) {
    if (monthCount < monthArray.length - 1) {
      monthCount++;
    }
    displayMonth.textContent = monthArray[monthCount];
  } else {
    if (monthCount > 0) {
      monthCount--;
    }
    displayMonth.textContent = monthArray[monthCount];
  }
  let date = new Date(yearCount, monthCount + 1, 0).getDate();
  createDate(date);
}

function createDate(date) {
  displayDate.innerHTML = "";
  todoLIstStorage = {};
  let data = JSON.parse(localStorage.getItem(yearCount));
  if (data != null) {
    if (data[monthCount + 1] != undefined) {
      todoLIstStorage = data[monthCount + 1];
    }
  }

  let firstTime = new Date(yearCount, monthCount, 1);
  let firstDay = firstTime.getDay();

  let lastTime = new Date(yearCount, monthCount, date);
  let lastDay = lastTime.getDay();

  let row = document.createElement("div");
  row.setAttribute("class", "row");

  for (let j = 0; j < firstDay; j++) {
    let div = document.createElement("div");
    div.setAttribute("class", "col_7 py-3 border");
    row.appendChild(div);
  }

  for (let i = 0; i < date; i++) {
    let div = document.createElement("div");
    div.addEventListener("click", todoList);

    let nowTime = new Date(yearCount, monthCount, i + 1);
    let nowDay = nowTime.getDay();
    div.setAttribute(
      "class",
      "col_7 text-start border btn btn-outline-secondary day-box fs-4 d-flex justify-content-between align-items-start"
    );

    if (
      todoLIstStorage[i + 1] != undefined &&
      todoLIstStorage[i + 1].length != 0
    ) {
      div.classList.add("border-primary");
      div.innerText = i + 1;

      let span = document.createElement("span");
      if (todoLIstStorage[i + 1].length > 14) {
        span.setAttribute("class", "badge bg-danger rounded-pill fs-6 my-1");
      } else if (todoLIstStorage[i + 1].length > 9) {
        span.setAttribute("class", "badge bg-warning rounded-pill fs-6 my-1");
      } else if (todoLIstStorage[i + 1].length > 4) {
        span.setAttribute("class", "badge bg-success rounded-pill fs-6 my-1");
      } else {
        span.setAttribute("class", "badge bg-primary rounded-pill fs-6 my-1");
      }
      span.setAttribute("value", `${i + 1}`);
      span.innerText = todoLIstStorage[i + 1].length;

      div.appendChild(span);
    } else {
      div.innerText = i + 1;
    }

    div.setAttribute("value", `${i + 1}`);
    div.setAttribute("data-bs-toggle", "modal");
    div.setAttribute("data-bs-target", "#exampleModal");

    if (nowDay == 0) {
      div.classList.add("text-danger");
    } else if (nowDay == 6) {
      div.classList.add("text-success");
    }
    row.appendChild(div);
  }

  for (let k = 0; k < 6 - lastDay; k++) {
    let div = document.createElement("div");
    div.setAttribute("class", "col_7 py-3 border");
    row.appendChild(div);
  }

  displayDate.appendChild(row);
}

function todoList() {
  let todo = JSON.parse(localStorage.getItem(yearCount + 1));
  dayCount = event.target.attributes.value.value;
  modalTitle.innerText =
    "行事曆 - " + yearCount + "/" + (monthCount + 1) + "/" + dayCount;

  changeList();
}

function changeList() {
  todoShow.innerHTML = "";
  let ul = document.createElement("ul");
  ul.classList.add("list-group");
  todoShow.appendChild(ul);
  todoLIstStorage = {};
  let data = JSON.parse(localStorage.getItem(yearCount));
  if (data != null) {
    if (data[monthCount + 1] != undefined) {
      todoLIstStorage = data[monthCount + 1];
    }
  }

  if (
    todoLIstStorage[dayCount] != undefined &&
    todoLIstStorage[dayCount].length != 0
  ) {
    todoLIstStorage[dayCount].forEach((item, index) => {
      let li = document.createElement("li");
      li.setAttribute("class", "fw-bold");
      li.classList.add("list-group-item");
      li.classList.add("list-group-item-action");
      li.classList.add("check");
      li.addEventListener("click", todoClick);

      li.innerText = item;
      ul.appendChild(li);
    });
  } else {
    let li = document.createElement("li");
    li.setAttribute("class", "fs-6 fw-light");
    li.classList.add("list-group-item");
    li.classList.add("list-group-item-action");
    li.classList.add("check");
    li.addEventListener("click", todoClick);

    li.innerText = "點擊 - 新增代辦事項";
    ul.appendChild(li);
  }
}

function fixList(type) {
  let target = event.target;
  if (type == "create") {
    submitBtn.textContent = "增加";
    submitBtn.setAttribute("class", "btn btn-primary");
    deleBtn.textContent = "取消";
    deleBtn.setAttribute("class", "btn btn-secondary");
  } else {
    if (target.innerText != "點擊 - 新增代辦事項") {
      submitBtn.textContent = "修改";
      submitBtn.setAttribute("class", "btn btn-danger");
      deleBtn.textContent = "刪除";
      deleBtn.setAttribute("class", "btn btn-secondary");
    } else {
      submitBtn.textContent = "增加";
      submitBtn.setAttribute("class", "btn btn-primary");
      deleBtn.textContent = "取消";
      deleBtn.setAttribute("class", "btn btn-secondary");
    }
  }
  inputText.value = "";
  hrLine.setAttribute("class", "");
  textArea.setAttribute("class", "input-group");
  addBtn.setAttribute("class", "btn btn-success invisible");

  if (target != undefined && target.innerText != "點擊 - 新增代辦事項") {
    inputText.value = target.innerText;
  } else {
    inputText.value = "";
  }
}

function leaveList() {
  hrLine.setAttribute("class", "d-none");
  textArea.setAttribute("class", "input-group d-none");
  addBtn.setAttribute("class", "btn btn-success visible");

  let date = new Date(yearCount, monthCount + 1, 0).getDate();
  createDate(date);
}

function todoClick() {
  let liArray = document.querySelectorAll(".check");
  let target = event.target;

  target.classList.toggle("active");
  fixList(target);

  if (!target.classList.contains("active")) {
    leaveList();
  }

  liArray.forEach((item) => {
    if (target.innerText != item.innerText) {
      item.classList.remove("active");
    }
  });
}

function addTodo() {
  let data = JSON.parse(localStorage.getItem(yearCount));
  if (data != null) {
    todoLIstStorage = data;
  }
  console.dir(todoLIstStorage);

  let liArray = document.querySelectorAll(".check");
  let targetIndex = -1;

  liArray.forEach((item, index) => {
    if (item.classList.contains("active")) {
      targetIndex = index;
      item.classList.toggle("active");
    }
  });

  if (todoLIstStorage[monthCount + 1] == null) {
    todoLIstStorage[monthCount + 1] = {};
  }

  if (todoLIstStorage[monthCount + 1][dayCount] == null) {
    todoLIstStorage[monthCount + 1][dayCount] = [];
  }

  if (inputText.value != "") {
    if (targetIndex != -1) {
      todoLIstStorage[monthCount + 1][dayCount][targetIndex] = inputText.value;
    } else {
      todoLIstStorage[monthCount + 1][dayCount].push(inputText.value);
    }
  }

  localStorage.setItem(yearCount, JSON.stringify(todoLIstStorage));

  changeList();
  leaveList();
}

function deleteList() {
  let content = event.target.innerText;
  if (content == "刪除") {
    let data = JSON.parse(localStorage.getItem(yearCount));
    if (data != null) {
      todoLIstStorage = data;
    }

    let liArray = document.querySelectorAll(".check");
    let targetIndex = -1;

    liArray.forEach((item, index) => {
      if (item.classList.contains("active")) {
        targetIndex = index;
      }
    });
    todoLIstStorage[monthCount + 1][dayCount].splice(targetIndex, 1);

    localStorage.setItem(yearCount, JSON.stringify(todoLIstStorage));
  }
  changeList();
  leaveList();
}
