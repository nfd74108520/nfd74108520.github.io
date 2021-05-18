$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

let titleContent = [
  {
    h1: "歡迎加入 Tachey 好老師的行列",
    h4: "跟著 Tachey 一步一步完成募資提案吧！",
  },
  {
    h1: "好的標題和敘述很重要！",
    h4: "提供的資訊越詳細，越能提高學生上課的意願！",
  },
  {
    h1: "哪些學生適合這堂課？",
    h4: "課程提供越多資訊，越會提高學生上課的意願喔！",
  },
  {
    h1: "預計的單元架構與作業",
    h4: "安排單元架構，讓學生清楚看見學習過程的每一步，並設計作業練習",
  },
  {
    h1: "來定個吸引人的價格吧！",
    h4: "價格低一點，學生多一點！",
  },
  {
    h1: "加上更詳細的課程內容！",
    h4: "圖片加上文字，發揮你的創意！",
  },
  {
    h1: "用募資影片簡介課程內容！",
    h4: "影片包含主題、適合族群和課程目標",
  },
  {
    h1: "自訂專屬的行銷網址",
    h4: "以此網址行銷宣傳可獲得較高的分潤喔！",
  },
  {
    h1: "老師開課身份確認",
    h4: "",
  },
  {
    h1: "恭喜你成功地完成了提案編輯囉！",
    h4: "在送出審核前做最後的檢查與預覽吧",
  },
];

let stepProgress = document
  .getElementById("step-progress")
  .getElementsByTagName("button");

let progressBar = document.getElementById("progress-bar");

let stepProgressArray = Array.from(stepProgress);

let xhr = new XMLHttpRequest();
xhr.onload = function () {
  if (xhr.status === 200) {
    let contentHTML = document.getElementById("contentHTML");
    contentHTML.innerHTML = xhr.responseText;
  }
};
xhr.open("GET", `./contentHTML/index9.html`, true);
xhr.send(null);

stepProgressArray.forEach((item) => {
  item.addEventListener("click", changeStep);
});

function changeStep() {
  let titleContentH1 = document.getElementById("titleContentH1");
  let titleContentH4 = document.getElementById("titleContentH4");
  let num = event.target.outerText;
  progressBar.setAttribute("style", `width: ${11 * num}%`);
  progressBar.setAttribute("class", "progress-bar bg-hahow-green");

  stepProgressArray.forEach((item) => {
    item.setAttribute("class", "btn bg-hahow-orange btn-circle");
  });

  for (let i = 0; i <= num; i++) {
    stepProgressArray[i].setAttribute("class", "btn bg-hahow-green btn-circle");
  }

  titleContentH1.innerText = titleContent[num].h1;
  titleContentH4.innerText = titleContent[num].h4;

  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      let contentHTML = document.getElementById("contentHTML");
      contentHTML.innerHTML = xhr.responseText;
    }
  };
  xhr.open("GET", `./contentHTML/index${num}.html`, true);
  xhr.send(null);
}
