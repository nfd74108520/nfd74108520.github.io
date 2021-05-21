let star = document.querySelectorAll('.star-display')

star.forEach((item, index)=>{
    if(index > 2){
        item.classList.add('d-none')
    }
})

let couseTime = document.querySelectorAll('.course-time')