const request= require('request')


const geocode= (address,callback) =>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiaXZhbmF2ZW5kYW5vIiwiYSI6ImNrdG5wMXBtOTA1MGMycHAzamd5YW1ocmUifQ.3GqBEu6OKQ_ds9Jr7ji26Q&limit=1'
    
    request({ url , json: true},(error,{body})=>{
          if (error) {
              callback('No es posible establecer conexión con el servicio del clima',undefined)
          }
          else if(body.features.length===0) {
              callback('Ubicación no hallada, pruebe con otra',undefined)
          }   
          else {
              callback(undefined,{
                  latitude: body.features[0].center[1],
                  longitude: body.features[0].center[0],
                  location: body.features[0].place_name
              })
          }

    })

}

module.exports = geocode