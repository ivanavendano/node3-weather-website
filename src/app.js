const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000;

//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials/')

// setup handlebars engne and vies location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{title: 'Weather App', name: 'Iván Avendaño'})
})
app.get('/about',(req,res) =>{
    res.render('about',{title: 'About Me', name: 'Iván Avendaño'})
})

app.get('/help',(req,res) =>{
    res.render('help',{title: 'Help page', name: 'Iván Avendaño', helptext: 'This is my Help Text'})
})
/* app.get('/help',(req,res)=>{

    res.send([{name:'Ivan',
             age: 44},{name:'Francisco',age:44}])
})
app.get('/about',(req,res)=>{

    res.send('<h1>About page</h1>')
}) */
app.get('/weather',(req,res)=>{
    if(!req.query.address) {

        return res.send("error: Se requiere la localidad sobre la cual recuperar información del clima ")
 
     }
     
     geocode(req.query.address,(error,{ latitude, longitude, location}={}) =>{
        if (error) { 
            return res.send({error}) 
        } 

        forecast(latitude,longitude,(error,forecastData)=>{
            if (error) { 
                return res.send({error})
            } 

            res.send ({
                   forecast : forecastData,
                              location,
                   address  : req.query.address           

            })
        })
      
    
    
    })

     
   
})

app.get('/products', (req,res)=>{

    if(!req.query.search) {

       return res.send("error: Se requiere al menos el parámetro de búsqueda ")

    }
    
    console.log(req.query.search)
    res.send({

    products : []    
    })


})
app.get('/help/*',(req,res)=>{

    res.render('Generic404Page',{title:'404', name:'Iván Avendaño', message:'Help Article not found'})
})
app.get('*',(req,res)=>{

    res.render('Generic404Page',{title:'404', name:'Iván Avendaño', message:'Page Not Found'})
})
app.listen(port,()=>{
    console.log('Server is up in port ' + port)

})