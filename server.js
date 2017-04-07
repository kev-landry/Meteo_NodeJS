//---- On appelle nos dépendances -------

var express = require('express') //express la base
var url = require('url') // osef atm
var bodyparser = require('body-parser') //Pour extraire le body de la requête
var app = express()

app.set('view engine', 'ejs'),

    console.log("Initialisation serveur 8080 :");

app.use(bodyparser.json()) //Parser du json !

// --- Route racine ---
app.get('/', (request, response) => {
    response.status(200)
    //response.render('app/views/pages/interface', {test: 'Salut'})  //On y mettra ici les render pages
    response.send("Hello Mothafucka")
})

// --- Routes libre service de notre API ---


app.get('/meteo/data/', (request, response) => {
    response.status(200)
    var Donnees = require('./app/models/donnees')
    Donnees.alldata(function(data) {
        return response.json(data) //Le callback check
    })
})

app.get('/meteo/data/lastrecord', (request, response) => {
    response.status(200)
    var Donnees = require('./app/models/donnees')
    Donnees.lastRecord(function(data) {
        return response.json(data) //Le callback check
    })
})

//Les routes dynamiques
app.get('/meteo/data/mois/:mois_variable', (request, response) => {
    response.status(200)
    var Donnees = require('./app/models/donnees')
    var mois = request.params.mois_variable
    Donnees.monthRecord(mois, function(data) {
        console.log(data)
        return response.json(data) //Le callback check
    })
    //response.end('Vous êtes à la route du moi : ' + mois);

})

app.get('/meteo/data/jour/:jour_variable', (request, response) => {
    response.status(200)
    var Donnees = require('./app/models/donnees')
    Donnees.dayRecord(function() {
        return response.json(data) //Le callback check
    })
    //response.setHeader('Content-Type', 'text/plain');
    response.end('Vous êtes à la route jour : ' + request.params.variable);

})

// --- Route data reçoit JSON du nodeMCU---
app.post('/node', (request, response) => {
    console.log(request.body)
    response.status(200) //Check status by nodeMCU

    //Interaction avec la BDD on envoit les donnes du node --

    var Donnees = require('./app/models/donnees')
    Donnees.create(request.body['temp'], request.body['hum'], function() { // Appel de la class Donnees
        console.log("envoie de donnees => DB") //Le callback check
    })
})
app.listen(8080)
