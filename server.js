
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
    response.render('app/views/pages/interface', {test: 'Salut'})  //On y mettra ici les render pages
})

// --- Route data reçoit JSON ---
app.get('/data/', (request, response) => { //Notre route qui désigne la racine
    response.status(200)

    response.send(request.body)  //On y mettra ici les render plus tard ?

})

app.get('/data/:variable/', (request, response) => {

  //response.setHeader('Content-Type', 'text/plain');
  response.end('Vous êtes à la chambre de l\'étage n°' + request.params.variable);

})

// --- Route data reçoit JSON ---
app.post('/data/', (request, response) => {


    console.log(request.body)
    response.status(200) //Check status by nodeMCU

    //Interaction avec la BDD on envoit les donnes du node --

    var Donnees = require('./models/donnees')
    Donnees.create(request.body['temp'],request.body['hum'], function() { // Appel de la class Donnees
        console.log("envoie de donnees")  //Le callback check
    })
})

app.listen(8080)
