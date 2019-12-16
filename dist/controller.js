class Controller {

    constructor() {
        this.page = 0
    }

    // updates the render of the pagination bar
    updatePaginator(previous) {
        //render white square on actual page
        let pagNum = document.getElementById(`pag-num-${this.page}`)

        if (previous) {
            this.page > 0 && this.page < 9 ? pagNum.innerHTML = this.page : pagNum.innerHTML = "&ensp;"
            pagNum.className = "pag-num"
        }
        else {
            document.getElementById("paginator-detail-number").innerHTML = this.page
            pagNum.className = "pag-sq"
            pagNum.innerHTML = ""
        }

        //hide arrows when on first or last page
        if (this.page > 0 && this.page < 9) {
            document.getElementById(`right`).className = "fas fa-chevron-right"
            document.getElementById(`left`).className = "fas fa-chevron-left"
            document.getElementById(`paginator-detail`).className = ""
        }
        else {
            let arrow = ""
            this.page == 0 ? arrow = "left" : arrow = "right"
            document.getElementById(`${arrow}`).className = "hide"
            document.getElementById(`paginator-detail`).className = "hide"
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

        //take out text displayed
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

        //render the text
        this.page < 9 ? this.showText(true) : null
        this.updatePaginator()

        //recursion for scrolling multiple pages
        if (destinationPage !== undefined && destinationPage !== this.page) {
            return this.scroll(forward, destinationPage)
        }
        else {
            return
        }


    }
}




