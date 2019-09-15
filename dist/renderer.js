class Renderer{

   
// emptyAll(){
//     $("#login-container").empty() 
//     $("#weatherContainer").empty() 
// }

// emptyCities()

    renderData(data) {

            $("#login-container").empty() 
            $("#results").empty() 
       

        let user = localStorage.user
        let change = JSON.parse(localStorage.farenheit)
        let finaldata = {data: data, user: user, change: change}
        
        const source = $('#container-template').html();
        const template = Handlebars.compile(source)
        let somehtml = template(finaldata)
        $("#results").append(somehtml)

        
       
    }

renderApp(data){

    let user = localStorage.user
    let change = JSON.parse(localStorage.farenheit)
    let finaldata = {data: data, user: user, change: change}
    

    const source = $('#app-template').html();
    const template = Handlebars.compile(source)
    let content = template(finaldata)
    $("#headerCont").append(content)

    $("#h2").hide()
}
}