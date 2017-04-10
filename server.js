//---- On appelle nos dépendances -------

var express = require('express') //express la base
var url = require('url') // osef atm
var bodyparser = require('body-parser') //Pour extraire le body de la requête
var app = express()
var path = require('path')

app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs'),

    console.log("Initialisation serveur 8000 :");

app.use(bodyparser.json()) //Parser du json !

app.use('/static', express.static('app/public')); //Les fichiers css/js qui bougent pas

//Racine
app.get('/', (request, response) => {

    response.render('index', {test: 'Salut zemilzel k ezl zeo,fs fjz jfezl'})

    //console.log(request)
})
// --- Routes libre service de notre API ---


app.get('/meteo/data/', (request, response) => {
    response.status(200)
    var Donnees = require('./app/models/donnees')
    Donnees.alldata(function(data) {
        return response.json(data)
    })
})

//------------------- Les routes dynamiques ----------------

//Choisir les derniers records en date:
app.get('/meteo/data/lastrecords/:lastrecords', (request, response) => {
    response.status(200)

    var lastrecords = request.params.lastrecords
    var Donnees = require('./app/models/donnees')
    Donnees.lastRecord(lastrecords, function(data) {
        return response.json(data)
    })
})


//Choisir un mois :
app.get('/meteo/data/mois/:mois_variable', (request, response) => {
    response.status(200)
    var Donnees = require('./app/models/donnees')
    var mois = request.params.mois_variable
    Donnees.monthRecord(mois, function(data) {
        console.log(data)
        return response.json(data)
    })
})

//Choisir un jour:
app.get('/meteo/data/jour/:jour_variable', (request, response) => {
    response.status(200)
    var Donnees = require('./app/models/donnees')
    var jour = request.params.jour_variable
    console.log(jour)
    Donnees.dayRecord(jour, function(data) {
        return response.json(data)
    })
})

//Choisir range
app.get('/meteo/data/range/:debut/:fin', (request, response) => {
    response.status(200)
    var Donnees = require('./app/models/donnees')
    var debut = request.params.debut
    var fin = request.params.fin
    Donnees.range(debut, fin, function(data) {
        console.log(data)
        return response.json(data)
    })
})
//astree softwares
// --- Route data reçoit JSON du nodeMCU---
app.post('/node/', (request, response) => {
    console.log(request.body)
    response.status(200) //Check status by nodeMCU

    //Interaction avec la BDD on envoit les donnees du node --
    var Donnees = require('./app/models/donnees')
    Donnees.insert(request.body['temp'], request.body['hum'], function() { // Appel de la la méthode insert dans la class Donnes
        console.log("envoie de donnees => DB") //checking logs
    })
})


app.listen(8000)
