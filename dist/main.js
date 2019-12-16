const controller = new Controller()


window.onload = function () {
    controller.showText(true)
    controller.updatePaginator()

    setTimeout(() => {
        document.getElementById("loader-container").className = "hide"
    }, 1000);
};

//arrow buttons 
document.getElementById("right").onclick = function () { controller.scroll(true) }
document.getElementById("left").onclick = function () { controller.scroll(false) }

//paginator buttons
let pages = [0, 1 , 2, 3, 4, 5, 6, 7, 8 ,9]

pages.forEach(p=>{
    let paginator = document.getElementById(`pag-num-${p}`)
    

    paginator.onclick = function () {
        if (controller.page < p) {
            controller.scroll(true, p)
        }
        else if (controller.page > p) {
            controller.scroll(false, p)
    
        }
    }
})


