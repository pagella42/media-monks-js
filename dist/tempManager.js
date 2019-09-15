class TempManager{

    constructor(){
        this.cityData = []
    }

    async getDataFromDB(){
      
       let data = await $.get('/cities')

        if(data[0]){

            data[0].name ? this.cityData = data : null
            
        }
        else{
            this.cityData = []
           
        }
 
        
    }

  async getCityData(cityName){    //async?
        
        let data = await $.get(`/city/${cityName}`)
         this.cityData.push(data)
       
    }

    async saveCity(cityName){
        let data
       

        this.cityData.forEach(c =>
            c.name == cityName ? 
            data = c 
            : null)

         await $.ajax({
            type: 'POST',
            url: `/city`,
            data: data,
            success: {}
        })
    }
 
    async removeCity(cityName){
        
        await $.ajax({
            type: 'DELETE',
            url: `/city/${cityName}`
        })
    }


}


   

