define({ "api": [
  {
    "type": "get",
    "url": "/meteo/data",
    "title": "Renvoie toutes les donnéees",
    "name": "Alldata",
    "group": "GET",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": "<p>Id du champ.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "temp",
            "description": "<p>Température.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "hum",
            "description": "<p>Humidité.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "time_",
            "description": "<p>La date.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"temp\": \"25\",\n  \"hum\": 20,\n  \"time_\": \"2017-04-10T15:46:51.778Z\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "test/server.js",
    "groupTitle": "GET"
  },
  {
    "type": "get",
    "url": "/meteo/data/jour/:jour",
    "title": "Obtenir les données du jour",
    "name": "Jour",
    "group": "GET",
    "description": "<p>Renvoie toutes les données du jour passées en paramètre au format anglais</p>",
    "examples": [
      {
        "title": "Recevoir les données de mardu 11 avril",
        "content": "/meteo/data/jour/2017-04-11",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "test/server.js",
    "groupTitle": "GET"
  },
  {
    "type": "get",
    "url": "/meteo/data/lastrecords/:lastrecord",
    "title": "Obtenir les dernières données jusqu'aujourd'hui",
    "name": "Lastrecords",
    "group": "GET",
    "description": "<p>Renvoie les n dernières données</p>",
    "examples": [
      {
        "title": "Recevoir les 15 dernières données:",
        "content": "/meteo/data/lastrecords/15",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "test/server.js",
    "groupTitle": "GET"
  },
  {
    "type": "get",
    "url": "/meteo/data/mois/:mois",
    "title": "Obtenir les données du mois",
    "name": "Mois",
    "group": "GET",
    "description": "<p>Renvoie toutes les données du mois passées en paramètre</p>",
    "examples": [
      {
        "title": "Recevoir les données du mois d'avril:",
        "content": "/data/meteo/mois/avril",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "test/server.js",
    "groupTitle": "GET"
  },
  {
    "type": "get",
    "url": "/meteo/data/range/:debut/:fin",
    "title": "Obtenir une fourchette",
    "name": "Range",
    "group": "GET",
    "description": "<p>Renvoie toutes les données entre la date de début et fin</p>",
    "examples": [
      {
        "title": "Recevoir les données du 2017-04-08 au 2017-04-12:",
        "content": "/meteo/data/2017-04-08/2017-04-11",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "test/server.js",
    "groupTitle": "GET"
  },
  {
    "type": "post",
    "url": "/node/",
    "title": "NodeMCU vers API",
    "name": "Node_MCU",
    "group": "POST",
    "description": "<p>Envoie les données capturées par le node MCU</p>",
    "version": "0.0.0",
    "filename": "test/server.js",
    "groupTitle": "POST"
  }
] });
