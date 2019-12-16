class Controller {

    constructor() {
        this.page = 0
    }

    // updates the render of the pagination bar
    updatePaginator(previous) {
        if (previous) {
           this.page > 0 && this.page < 9 ? document.getElementById(`pag-num-${this.page}`).innerHTML = this.page : document.getElementById(`pag-num-${this.page}`).innerHTML = "&ensp;"
            document.getElementById(`pag-num-${this.page}`).className = "pag-num"
        }
        else {
            document.getElementById("paginator-detail-number").innerHTML = this.page
            document.getElementById(`pag-num-${this.page}`).className = "pag-sq"
            document.getElementById(`pag-num-${this.page}`).innerHTML = ""
        }

          
        if(this.page == 0){
            document.getElementById(`left`).className = "hide"
            document.getElementById(`paginator-detail`).className = "hide"
            
        }
        else if(this.page == 9){
            document.getElementById(`right`).className = "hide"
            document.getElementById(`paginator-detail`).className = "hide"
        }
        else{
            document.getElementById(`right`).className = "fas fa-chevron-right"
            document.getElementById(`left`).className = "fas fa-chevron-left"
            document.getElementById(`paginator-detail`).className = ""
        }
    }


    showText(show) {
        let texts = document.getElementById(`text-page-${this.page}`).children
        if (show) {
            Array.prototype.forEach.call(texts, t => t.className = "show-text")
        }
        else {
            Array.prototype.forEach.call(texts, t => t.className = "hide-text")
        }
        this.page == 0 ? document.getElementById("small-text-page-0").className = "" : document.getElementById("small-text-page-0").className = "hide"
    }

    scroll(forward, destinationPage) {

        this.updatePaginator(true)

        //change text displayed
        this.page < 9 ? this.showText(false) : null

        //calculate width
        let width = document.getElementById('background').offsetWidth
        let calc = width - window.screen.width
        calc = calc / 7

        //scroll by pixels
        if (forward) {
            this.page == 7 ? calc = 0 : null

            this.page += 1
            event.preventDefault();
            document.getElementById('background-cont').scrollLeft += calc
        }
        else {
            this.page == 8 ? calc = 0 : null
            this.page == 9 ? calc = document.getElementById('background-info').offsetWidth : null
            this.page -= 1
            event.preventDefault();
            document.getElementById('background-cont').scrollLeft -= calc
        }

        this.page < 9 ? this.showText(true) : null
        this.updatePaginator()

        //recursion
       if(destinationPage !== undefined && destinationPage !== this.page ){
           return this.scroll(forward, destinationPage)
       }
       else{
           return
       }


    }
}




