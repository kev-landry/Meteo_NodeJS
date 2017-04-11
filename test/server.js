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

    response.render('index', {
        test: 'Salut'
    })

})

//Chemin de la doc officiel (huehue)
app.get('/doc', (request, response) => {

    response.render('pages/doc_api', {
        test: 'Salut' //variable locale
    })
})
                      // --------- Routes libre service de notre API ------------

/**
 * @api {get} /meteo/data Renvoie toutes les donnéees
 * @apiName Alldata
 * @apiGroup GET
 *
 *
 * @apiSuccess {int} id Id du champ.
 * @apiSuccess {int} temp Température.
 * @apiSuccess {int} hum Humidité.
 * @apiSuccess {date} time_ La date.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "temp": "25",
 *      "hum": 20,
 *      "time_": "2017-04-10T15:46:51.778Z",
 *    }
 */
app.get('/meteo/data/', (request, response) => {
    response.status(200)
    var Donnees = require('./app/models/donnees')
    Donnees.alldata(function(data) {
        return response.json(data)
    })
})

//------------------- Les routes dynamiques ----------------


/**
 * @api {get} /meteo/data/lastrecords/:lastrecord Obtenir les dernières données jusqu'aujourd'hui
 * @apiName Lastrecords
 * @apiGroup GET
 * @apiDescription Renvoie les n dernières données
 *
 * @apiExample Recevoir les 15 dernières données:
 *     http://localhost/user/15
 */


//Choisir les derniers records en date:
app.get('/meteo/data/lastrecords/:lastrecords', (request, response) => {
    response.status(200)

    var lastrecords = request.params.lastrecords
    var Donnees = require('./app/models/donnees')
    Donnees.lastRecord(lastrecords, function(data) {
        return response.json(data)
    })
})

/**
 * @api {get} /meteo/data/mois/:mois Obtenir les données du mois
 * @apiName Mois
 * @apiGroup GET
 * @apiDescription Renvoie toutes les données du mois passées en paramètre
 *
 * @apiExample Recevoir les données du mois d'avril:
 *     http://localhost/data/meteo/mois/avril
 */

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

/**
 * @api {get} /meteo/data/jour/:jour Obtenir les données du jour
 * @apiName Jour
 * @apiGroup GET
 * @apiDescription Renvoie toutes les données du jour passées en paramètre au format anglais
 *
 * @apiExample Recevoir les données de mardu 11 avril
 *     http://localhost/meteo/data/jour/2017-04-11
 */

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

/**
 * @api {get} /meteo/data/range/:debut/:fin Obtenir une fourchette
 * @apiName Range
 * @apiGroup GET
 * @apiDescription Renvoie toutes les données entre la date de début et fin
 *
 * @apiExample Recevoir les données du 2017-04-08 au 2017-04-12:
 *     http://localhost/meteo/data/2017-04-08/2017-04-11
 */

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

/**
 * @api {post} /node/ NodeMCU vers API
 * @apiName Node MCU
 * @apiGroup POST
 * @apiDescription Envoie les données capturées par le node MCU
 */

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
/**
 * @api {get} /user/:id
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost/user/4711
 */

app.listen(8000)
