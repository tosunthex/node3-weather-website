const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require("./unit/forecast");
const geocode = require("./unit/geocode");


const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather App',
    name:'Levent Saatci'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Me',
    name:'Levent Saatci'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
    name:'Levent Saatci'
  })
})

app.get('/help/*',(req,res) => {
  res.render('404',{
    title:'Page Not Found',
    error:'Article Not Found !',
    name:'Levent Saatci'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:"Please provide a Address"
    })
  }

  geocode(req.query.address,(error,geoCodeParams = {}) => {
    
    if(error){
      return res.send({
        error:error}
        )
    }
    
    forecast(geoCodeParams.longitude,geoCodeParams.latitude,(message,forecastData ={}) => {
      if(typeof forecastData === "undefined"){
        return res.send({
          error:message}
          )
      }
      res.send({
        Location:geoCodeParams.place,     
        forecastData:forecastData,
        address:req.query.address
      })
        
    })
  })

})

app.get('/products',(req,res)=>{
  if(!req.query.search){
   return res.send({
      error:"Please provide a search term"
    })
  }
  res.send({
    products:[req.query]
  })
})

app.get('*',(req,res) => {
  res.render('404',{
    title:'Page Not Found',
    error:'404 Page Not Found',
    name:'Levent Saatci'
  })
})

app.listen(3000,()=> {
    console.log('Server is up on port 3000')
})