

const manager = new TempManager()
const renderer = new Renderer()



//                              //render app? // reload results? //render loc
const loadPage = async function (renderapp, reloadresults, renderloc) {
    await manager.getDataFromDB()
    let data = manager.cityData

    if(renderloc){
        manager.location()
    }
    if(reloadresults){

        $("#results").fadeOut(400)
        setTimeout(() => {
            renderer.renderData(data)
        }, 400);
        $("#results").fadeIn(400)
    }
    else{
        renderer.renderData(data)
    }

    

    if (renderapp) {
        renderer.renderApp(data)
        $("#weatherContainer").fadeOut(0)
        $("#weatherContainer").fadeIn(400)

    }



}

const hideLogin = function () {

    $("#loginContainer").fadeOut(-5)
    setTimeout(async () => {
        await loadPage(true, true, true)
        $("#weatherContainer").css('width', '100%')
        $("#weatherContainer").css('height', '100%')
    }, 400);

    if (!localStorage.user) {
        let user = $('#loginInput').val().replace(/(^.)/, c => c.toUpperCase())
        localStorage.setItem('user', `${user}`)
        localStorage.setItem('farenheit', false)
        
    }

}

if (localStorage.user) {
    hideLogin()

}



// loadPage()//quitar  



const handleSearch = async function () {

    let data = $("#cityInput").val().toLowerCase()

    let exists = false


    let newdata = manager.cityData

    newdata.forEach(n => n.name.toLowerCase() == data ? exists = true : null)

    if (!exists) {
        await manager.getCityData(data)
        newdata = manager.cityData
        renderer.renderData(newdata)

    }

    $("#cityInput").val("")

}

//press enter key at input bar, searches for cty
$("body").on("keypress", function (e) {
    let data = $("#cityInput").val()

    if (e.which == 13) {
        data ? handleSearch() : null
        $("#h2").slideUp(500)

        e.preventDefault()
        return false;

    }

})



$("body").on("click", ".start", function () {
    $("#h2").slideDown(500)
    $("#cityInput").focus()
    $("#cityInput").select()
})

//click on save
$("body").on("click", ".save", async function () {
    let city = $(this).closest('.cityContainer').find(".name").html()

    await manager.saveCity(city)
    await loadPage(false, true, false)



})


//click on delete
$("body").on("click", ".remove", async function () {
    let city = $(this).closest('.cityContainer').find(".name").html()



    await manager.removeCity(city)

    $(this).closest('.cityContainer').fadeOut(500)
    setTimeout(async () => {
        await loadPage()

    }, 700);
})

$("body").on("click", ".temp", async function () {
    let data = JSON.parse(localStorage.farenheit)
    localStorage.farenheit = !data

    await loadPage(false, false, true)
})

$("body").on("click", "#logout", function () {

    localStorage.user = ""
    location.reload()
    manager.cityData = []

})

// login screen
$("#loginButton").click(function () {

    let value = $("#loginInput").val()
    if(value){
        
     hideLogin()
         
    }
})

