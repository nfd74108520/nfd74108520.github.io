let changeBtn = document.querySelectorAll(".change-btn");

changeBtn.forEach((item) => {
    item.addEventListener("click", changeIndex)
});

function changeIndex(){
    console.log(event.target)
}