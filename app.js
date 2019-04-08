const express = require('express')
const app = express()
const met = require('./met.js')

const port = process.env.PORT || 3000;

app.get('/',function(req, res){
    res.send('<h1> I work! </h1>')
})

app.get('/students/:id',function(req, res){
    /*if(!req.params.id){
        return res.send({
            error: 'Por favor pon una matrícula'
        })
    }*/
   if(req.params.id !=="A01196463"){
        return res.send({
            error: 'Esa matrícula no existe :c'
        })
    }
    res.send({
        id: "A01196463",
        fullname: "Lizzie Montserrat Cañamar Carrillo",
        nickname: "Lizzie C",
        age: 22
    })
})

app.get('/met',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    if(!req.query.search){
        return res.send({
            error: 'Please give a term to search'
        })
    }
    met.metSearch(req.query.search, function(error,response){
        if(error){
            return res.send({
                error: error
            })
        }
        met.searchObject(response.object,function(error,response){
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                searchTerm: req.query.search,
                artist: response.artist,
                title: response.title,
                year: response.year,
                technique: response.technique,
                metUrl: response.metUrl
            })
        })
    })
})
app.get('*', function(req,res){
    res.send({
        error: 'Esta ruta no existe, pero aqui va un chiste:  '
    })
})

app.listen(port,function(){
    console.log('It runs!')
})