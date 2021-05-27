const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req,res)=>{
    res.render('index', {
        title: "Weather",
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: "About",
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: "Help",
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address) {
        return res.send({
            error:"Please provide a location to search for."
        })
    }
    const location = req.query.address
    geocode(location, (error,{location, longitude, latitude}={})=>{  
        if(error) {
            return res.send({error})
        }
        forecast({longitude, latitude}, (error, {forecast}={})=>{
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                longitude,
                latitude,
                address: req.query.address,
                forecast
            })
        })
    })

    
})

app.get('/products', (req,res)=>{
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }
    
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: "404: Help",
        message: "Help article not found"
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: "404: Page not found!",
        message: "The requested page could not be found."
    })
})


app.listen(port, ()=>{
    console.log("The server is up and running on "+port+"!")
})