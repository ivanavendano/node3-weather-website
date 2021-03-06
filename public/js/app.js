


const weatherForm = document.querySelector('form')
const searchElement = weatherForm.querySelector('input')

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault()

    const location = searchElement.value
    
    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''
   // fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    fetch('/weather?address=' + location).then((response)=>{

      response.json().then((data)=>{ 
            if(data.error) {


               // console.log(data.error)
               messageOne.textContent = data.error

            } else {
            //console.log(data.location)
            console.log(data.forecast) 
            messageOne.textContent = data.location
            messageTwo.textContent = "Localidad = " + data.forecast.location_name + " Temperatura Actual = " + data.forecast.current_temp + " Humedad = " + data.forecast.humidity + " Condición = "  + data.forecast.condition
            
        }
      })

})
    
})