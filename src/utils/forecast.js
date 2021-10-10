const request= require('request')



const forecast= (latitude,longitude,callback) =>{

      const url = 'http://api.weatherapi.com/v1/current.json?key=4eec2b6ecd354ed695520514212109&q=' + latitude + ',' + longitude + '&lang=es'
     
      request ({url,json:true},(error,{body})=>{

     if (error) {
        callback('No es posible establecer conexión con el servicio del clima',undefined)

     }   
     else if (body.error) {
              if (body.error.code===1006) {
                  callback('Ubicación invalida. Intente otras coordenadas',undefined)
               } 
               else {
                   callback(body.error.message,undefined)
                }
     }
     else {

     callback(undefined,{location_name: body.location.name ,
                         current_temp:  body.current.temp_c + '°C',
                         humidity:      body.current.humidity + '%',
                         condition:     body.current.condition.text})
    
}})

}

module.exports = forecast